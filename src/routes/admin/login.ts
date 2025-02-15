import { Request, Response } from 'express'
import { PageRouting } from '~/types/app'
import { auth, sessionToken } from '~/utils/auth'

export default {
  async get(req: Request, res: Response) {
    const authUser = await auth.currentUser(req, res)
    if (authUser) {
      res.redirect('/admin')
      return
    }
    res.render('admin/login', { data: null })
  },
  async post(req: Request, res: Response) {
    const token = await auth.login(req.body.user, req.body.password)
    if (token) {
      sessionToken.set(res, token)
      res.redirect('/admin')
      return
    }
    res.render('admin/login', {
      data: {
        input: {
          user: req.body.user
        },
        error: 'ログインに失敗しました'
      }
    })
  }
} as PageRouting
