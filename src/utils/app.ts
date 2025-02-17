import express from 'express'
import { appExt, pathOmits } from '~/const/app'
import {
  PageRouteMethodType,
  PageRouting,
  RequestHandler,
  RequestHandlerDefine
} from '~/types/app'

export const applyRouteMethodFactory =
  (uploadDefines: { [name: string]: RequestHandler }) =>
  (
    app: ReturnType<typeof express>,
    methodType: PageRouteMethodType,
    path: string,
    basePath: string
  ): boolean => {
    const requestPath = path
      .slice(basePath.length, -appExt.express.length)
      .split('/')
      .map((part) => (part.startsWith('$') ? `:${part.slice('$'.length)}` : part))
      .join('/')
    const pageModule = require(path)?.default
    if (!pageModule) {
      return false
    }
    const routes = pageModule as PageRouting
    if (!routes[methodType]) {
      return true
    }

    const uploadDefine =
      uploadDefines[(routes[methodType] as RequestHandlerDefine)?.upload ?? '']
    const handler =
      typeof routes[methodType] !== 'function'
        ? (routes[methodType] as RequestHandlerDefine)?.handler
        : routes[methodType]

    if (typeof routes[methodType] === 'function' || !uploadDefine) {
      app[methodType](requestPath, handler)
      pathOmits.forEach((pathOmit) => {
        if (requestPath.endsWith(pathOmit)) {
          app[methodType](requestPath.slice(0, -pathOmit.length), handler)
        }
      })
    } else {
      app[methodType](requestPath, uploadDefine, handler)
      pathOmits.forEach((pathOmit) => {
        if (requestPath.endsWith(pathOmit)) {
          app[methodType](requestPath.slice(0, -pathOmit.length), uploadDefine, handler)
        }
      })
    }

    return true
  }
