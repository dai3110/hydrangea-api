import cookieParser from 'cookie-parser'
import express from 'express'
import { globSync } from 'glob'
import nodepath from 'path'
import { appExt, appPaths, pagesRouteMethods } from '~/const/app'
import { applyRouteMethod } from '~/utils/app'

export const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(nodepath.resolve(__dirname, 'public')))
app.set('views', nodepath.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

const applyResult = [globSync(`${appPaths.routes}/**/*${appExt.express}`)]
  .flat()
  .map((path) =>
    pagesRouteMethods.map((method) => applyRouteMethod(app, method, path)).every((r) => r)
  )
if (applyResult.some((r) => !r)) {
  console.log('fail to apply route')
}
