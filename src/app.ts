import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import { globSync } from 'glob'
import nodepath from 'path'
import { appExt, appPaths, pagesRouteMethods } from '~/const/app'
import { env } from '~/const/env'
import { applyRouteMethodFactory } from '~/utils/app'
import { createEngine } from '~/utils/engine'
import { uploadAcceptor } from '~/utils/upload'

declare module 'express-session' {
  interface SessionData {
    user: string | null | undefined
  }
}

export const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ limit: '10mb', extended: false }))
app.use(express.static(nodepath.resolve(__dirname, 'public')))
app.set('views', nodepath.resolve(__dirname, 'views', 'route'))
app.set('view engine', 'js')
app.engine('js', createEngine())
app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
  })
)

const applier = applyRouteMethodFactory({
  image: uploadAcceptor('image/png', 'image/jpeg').array('image')
})

const result = [globSync(`${appPaths.routes}/**/*${appExt.express}`)]
  .flat()
  .map((path) =>
    pagesRouteMethods
      .map((method) => applier(app, method, path, appPaths.routes))
      .every((r) => r)
  )

if (result.some((r) => !r)) {
  console.log('fail to apply route')
}
