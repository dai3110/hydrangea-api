import { Request, Response } from 'express'
import { postsPerPage } from '~/const/app'
import { role } from '~/const/role'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'
import { loginPath } from '~/utils/app'
import { authRequestHandler } from '~/utils/auth'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const types = ['all', 'draft', 'private', 'public'] as const
      const type = (req.params['type'] ?? 'all') as (typeof types)[number]
      const num = Number(req.params['num'] ?? 1)
      const searchParam = {
        all: {},
        draft: { draft: true },
        public: { draft: false, pub: true },
        private: { draft: false, pub: false }
      }

      const articles = await articleData.getArticles({
        ...(searchParam[type] ?? {}),
        page: isNaN(num) ? 1 : num
      })

      if (num > 1 && num > Math.ceil(articles.count / postsPerPage)) {
        res.redirect(`/admin/list/${type}/1`)
        return
      }

      res.render('admin/list/index', {
        user: req.session.user,
        articles,
        type,
        page: num
      })
    },
    (req: Request, res: Response) => {
      res.redirect(
        loginPath(`/admin/list/${req.params['type'] ?? 'all'}/${req.params['num'] ?? 1}`)
      )
    }
  )
} as PageRouting
