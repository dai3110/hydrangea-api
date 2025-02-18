import { Request, Response } from 'express'
import { dbtable } from '~/const/env'
import { role } from '~/const/role'
import { PageRouting } from '~/types/app'
import { auth, authRequestHandler } from '~/utils/auth'
import { db } from '~/utils/database'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const authUser = await auth.currentUser(req, res)

      const data = await db.from(dbtable.article).select()

      res.render('admin/index', {
        user: authUser?.Username,
        data
      })
    },
    (req: Request, res: Response) => {
      res.redirect('/admin/login')
    }
  )
} as PageRouting
