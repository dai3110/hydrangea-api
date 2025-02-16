import { Request, Response } from 'express'
import { role } from '~/const/role'
import { PageRouting } from '~/types/app'
import { auth, authRequestHandler } from '~/utils/auth'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const authUser = await auth.currentUser(req, res)
      res.render('admin/photo/index', {
        user: authUser?.Username
      })
    },
    (req: Request, res: Response) => {
      res.redirect('/admin/login')
    }
  )
} as PageRouting
