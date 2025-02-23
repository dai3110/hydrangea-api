import { Request, Response } from 'express'
import fs from 'fs'
import { bucket } from '~/const/env'
import { role } from '~/const/role'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'
import { loginPath } from '~/utils/app'
import { auth, authRequestHandler } from '~/utils/auth'
import { handleBucket } from '~/utils/bucket'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const authUser = await auth.currentUser(req, res)
      res.render('admin/article/update', {
        user: req.session.user,
        image: req.params['name']
      })
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath(`/admin/article/${req.params['name']}`))
    }
  )
} as PageRouting
