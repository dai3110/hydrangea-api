import cookieParser from 'cookie-parser'
import express from 'express'
import { globSync } from 'glob'
import nodepath from 'path'
import { appExt, appPaths, pagesRouteMethods } from '~/const/app'
import { applyRouteMethod } from '~/utils/app'
import { createEngine } from '~/utils/engin'

export const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(nodepath.resolve(__dirname, 'public')))
app.set('views', nodepath.resolve(__dirname, 'views', 'route'))
app.set('view engine', 'js')

app.engine('js', createEngine());

const applyResult = [globSync(`${appPaths.routes}/**/*${appExt.express}`)]
  .flat()
  .map((path) =>
    pagesRouteMethods.map((method) => applyRouteMethod(app, method, path)).every((r) => r)
  )
if (applyResult.some((r) => !r)) {
  console.log('fail to apply route')
}
