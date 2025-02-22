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
      res.render('admin/login', {
        input: {
          returnpath: req.query['returnpath'] as string
        }
      })
    }
  ),
  async post(req: Request, res: Response) {
    const token = await auth.login(req.body.user, req.body.password)
    const returnPath = req.body.returnpath
    if (token) {
      sessionToken.set(res, token)
      res.redirect(returnPath || '/admin')
      return
    }
    res.render('admin/login', {
      input: {
        user: req.body.user,
        returnpath: returnPath
      },
      error: 'Login failed. Enter your login name and password correctly.'
    })
  }
} as PageRouting
