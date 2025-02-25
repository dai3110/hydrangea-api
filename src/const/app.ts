import nodepath from 'path'

export const pagesRouteMethods = ['get', 'post', 'put', 'delete'] as const

export const pathOmits = ['index'] as const

const appRoot = nodepath.resolve(__dirname, '../')
export const appPaths = {
  app: appRoot,
  routes: nodepath.resolve(appRoot, 'routes'),
  views: nodepath.resolve(appRoot, 'views')
} as const

export const requestAppRootPath = '/'
export const appLoginPath = '/admin/login'

export const appExt = {
  express: '.js'
} as const

export const htmlDocType = '<!doctype html>'

export const postsPerPage = 5
