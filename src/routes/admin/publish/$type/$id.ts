import { NextFunction, Request, Response } from 'express'
import { role } from '~/const/role'
import { articleData } from '~/repository/articles'
import { PageRouting, RequestHandler } from '~/types/app'
import { loginPath } from '~/utils/app'
import { authRequestHandler } from '~/utils/auth'

const types = ['open', 'close'] as const

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const id = Number(req.params['id'] ?? 0)
      const type = req.params['type'] as (typeof types)[number] 

      const article = await articleData.getArticle(isNaN(id) ? 0 : id)
      if (type === 'open' && article?.public) {
        res.redirect('/admin/list/public/')
        return
      }
      if (type === 'close' && !article?.public) {
        res.redirect('/admin/list/private/')
        return
      }
      res.render('admin/publish/index', {
        user: req.session.user,
        type,
        article
      })
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath(`/admin/publish/${req.params['type']}/${req.params['id'] ?? 0}`))
    }
  ),
  post: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const id = Number(req.params['id'] ?? 0)
      const type = req.params['type'] as (typeof types)[number] 
      const result = await articleData.updateArticle({
        id,
        public: type === 'open'
      })

      if (result) {
        res.redirect(`/admin/list/${type === 'open' ? 'public' : 'private'}/`)
        return
      }
      res.redirect(`/admin/list/${type === 'open' ? 'private' : 'public'}/`)
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath(`/admin/publish/${req.params['type']}/${req.params['id'] ?? 0}`))
    }
  )
} as PageRouting
