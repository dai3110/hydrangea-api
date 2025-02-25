import { Request, Response } from 'express'
import { PageRouting } from '~/types/app'
import { auth } from '~/utils/auth'

export default {
  async get(req: Request, res: Response) {
    auth.logout(res)
    res.redirect('/admin/login')
  }
} as PageRouting
