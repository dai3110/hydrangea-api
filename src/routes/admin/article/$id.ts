import { Request, Response } from 'express'
import { role } from '~/const/role'
import { appData } from '~/repository/app'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'
import { loginPath } from '~/utils/app'
import { auth, authRequestHandler } from '~/utils/auth'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const authUser = await auth.currentUser(req, res)
      const article = await articleData.getArticle(Number(req.params['id']))

      if (!article) {
        res.redirect('/admin/index')
      }

      res.render('admin/article/update', {
        user: req.session.user,
        article
      })
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath(`/admin/article/${req.params['id']}`))
    }
  ),
  post: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const updateContent = {
        id: Number(req.params['id']),
        image: req.body.image,
        title: req.body.title,
        date: new Date(req.body.date),
        explain: req.body.explain,
        lat: Number(req.body.lat),
        lng: Number(req.body.lng)
      }

      const user = await auth.currentUser(req, res)
      const userAttr = user?.UserAttributes?.find((attr) => attr.Name === role.admin.write.key)?.Value ?? -1
      if (Number(userAttr) > 1) {
        const result = await articleData.updateArticle(updateContent)
        
        if (result) {
          appData.incrementPublishVersion()
          res.redirect('/admin/index')
          return
        }

        res.render('admin/article/update', {
          user: req.session.user,
          article: updateContent
        })
      } else {
        res.redirect('/admin/index')
      }
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath(`/admin/article/${req.params['id']}`))
    }
  )
} as PageRouting
