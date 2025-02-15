import { Request, Response, NextFunction } from 'express'
import { pagesRouteMethods } from '~/const/app';

export type PageRouteMethodType = (typeof pagesRouteMethods)[number]

export type RequestHandler =
  | ((req: Request, res: Response) => void | Promise<void>)
  | ((req: Request, res: Response, next: NextFunction) => void | Promise<void>)

export type PageRouting = {
  [method in PageRouteMethodType]?: RequestHandler
}

