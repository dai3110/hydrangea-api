import { Request, Response } from 'express'
import { PageRouting } from '~/types/app'
import { auth } from '~/utils/auth'

export default {
  async get(req: Request, res: Response) {
    const authUser = await auth.currentUser(req, res)
    if (!authUser) {
      res.redirect('/admin/login')
      return
    }
    res.render('admin/index', {
      user: authUser?.Username
    })
  }
} as PageRouting
