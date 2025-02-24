import { Request, Response } from 'express'
import fs from 'fs'
import { bucket } from '~/const/env'
import { role } from '~/const/role'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'
import { loginPath } from '~/utils/app'
import { auth, authRequestHandler } from '~/utils/auth'
import { handleBucket } from '~/utils/bucket'

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
      const result = await articleData.updateArticle(updateContent)

      if (result) {
        res.redirect('/admin/index')
        return
      }

      res.render('admin/article/update', {
        user: req.session.user,
        article: updateContent
      })
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath(`/admin/article/${req.params['id']}`))
    }
  )
} as PageRouting
