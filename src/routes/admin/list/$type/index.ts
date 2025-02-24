import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { dbtable } from '~/const/env'
import { role } from '~/const/role'
import { articleData } from '~/repository/articles'
import { PageRouting, RequestHandler } from '~/types/app'
import { loginPath } from '~/utils/app'
import { auth, authRequestHandler } from '~/utils/auth'
import { dynamodb } from '~/utils/database'
import pageModule from '~/routes/admin/list/$type/$num'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response, next: NextFunction) => {
      (pageModule?.get as RequestHandler)?.(req, res, next)
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath(`/admin/list/${req.params['type'] ?? 'all'}/`))
    }
  )
} as PageRouting
