import { Request, Response } from 'express'
import { role } from '~/const/role'
import { appData } from '~/repository/app'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'
import { loginPath } from '~/utils/app'
import { auth, authRequestHandler } from '~/utils/auth'

const types = ['open', 'close', 'delete'] as const

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const id = Number(req.params['id'] ?? 0)
      const type = req.params['type'] as (typeof types)[number]

      const article = await articleData.getArticle(isNaN(id) ? 0 : id)
      if (type === 'delete' && !article) {
        res.redirect('/admin/list/all/')
        return
      }
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

      const user = await auth.currentUser(req, res)
      const userAttr =
        user?.UserAttributes?.find((attr) => attr.Name === role.admin.write.key)?.Value ?? -1

      if (type === 'delete') {
        if (Number(userAttr) > 1) {
          await articleData.removeArticle(id)
        }
        res.redirect(`/admin/list/all/`)
        return
      }

      if (Number(userAttr) > 1) {
        const result = await articleData.updateArticle({
          id,
          public: type === 'open'
        })

        appData.incrementPublishVersion()

        if (result) {
          res.redirect(`/admin/list/${type === 'open' ? 'public' : 'private'}/`)
          return
        }
        res.redirect(`/admin/list/${type === 'open' ? 'private' : 'public'}/`)
      } else {
        res.redirect(`/admin/list/${type === 'open' ? 'private' : 'public'}/`)
      }
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath(`/admin/publish/${req.params['type']}/${req.params['id'] ?? 0}`))
    }
  )
} as PageRouting
