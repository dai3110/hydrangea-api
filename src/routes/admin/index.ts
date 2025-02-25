import { NextFunction, Request, Response } from 'express'
import { role } from '~/const/role'
import pageModule from '~/routes/admin/list/$type/$num'
import { PageRouting, RequestHandler } from '~/types/app'
import { loginPath } from '~/utils/app'
import { authRequestHandler } from '~/utils/auth'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response, next: NextFunction) => {
      void (pageModule?.get as RequestHandler)?.(req, res, next)
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath('/admin/'))
    }
  )
} as PageRouting
