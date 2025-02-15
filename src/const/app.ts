import nodepath from 'path'

export const pagesRouteMethods = ['get', 'post', 'put', 'delete'] as const

export const pathOmits = ['index'] as const

const appRoot = nodepath.resolve(__dirname, '../')
export const appPaths = {
  app: appRoot,
  routes: nodepath.resolve(appRoot, 'routes'),
  views: nodepath.resolve(appRoot, 'views'),
} as const

export const appExt = {
  express: '.js',
} as const
