import { appPaths, appExt, pathOmits } from '~/const/app'
import { PageRouteMethodType, PageRouting } from '~/types/app'
import express from 'express'

export const applyRouteMethod = (
  app: ReturnType<typeof express>,
  methodType: PageRouteMethodType,
  path: string
): boolean => {
  const dir = [appPaths.routes].find((dir) => path.startsWith(dir)) ?? appPaths.app
  const requestPath = path.slice(dir.length, -appExt.express.length)
  const pageModule = require(path)?.default
  if (!pageModule) {
    return false
  }
  const routes = pageModule as PageRouting
  if (!routes[methodType]) {
    return true
  }

  app[methodType](requestPath, routes[methodType])

  pathOmits.forEach((pathOmit) => {
    if (requestPath.endsWith(pathOmit)) {
      app[methodType](requestPath.slice(0, -pathOmit.length), routes[methodType]!)
    }
  })
  return true
}
