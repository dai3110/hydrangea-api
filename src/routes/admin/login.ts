import { Request, Response } from 'express'
import { role } from '~/const/role'
import { PageRouting } from '~/types/app'
import { auth, authRequestHandler, sessionToken } from '~/utils/auth'

export default {
  get: authRequestHandler(
    role.admin.read,
    (req: Request, res: Response) => {
      res.redirect('/admin/index')
    },
    async (req: Request, res: Response) => {
      const authUser = await auth.currentUser(req, res)
      res.render('admin/login')
    }
  ),
  async post(req: Request, res: Response) {
    const token = await auth.login(req.body.user, req.body.password)
    if (token) {
      sessionToken.set(res, token)
      res.redirect('/admin')
      return
    }
    res.render('admin/login', {
      input: {
        user: req.body.user
      },
      error: 'ログインに失敗しました'
    })
  }
} as PageRouting
