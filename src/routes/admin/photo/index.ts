import { Request, Response } from 'express'
import fs from 'fs'
import { bucket } from '~/const/env'
import { role } from '~/const/role'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'
import { auth, authRequestHandler } from '~/utils/auth'
import { handleBucket } from '~/utils/bucket'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const authUser = await auth.currentUser(req, res)
      res.render('admin/photo/index')
    },
    (req: Request, res: Response) => {
      res.redirect('/admin/login')
    }
  ),
  post: {
    upload: 'image',
    handler: authRequestHandler(
      role.admin.read,
      async (req: Request, res: Response) => {
        // lambda-apigatewayへの負荷を考慮して
        // 実際にはview側の入力はmultipleではなくする
        const files = await Promise.all(
          (req.files as Express.Multer.File[]).map(async (file) => {
            const result = await handleBucket
              .push(
                {
                  name: file.filename,
                  buffer: await fs.promises.readFile(file.path),
                  mime: file.mimetype
                },
                bucket.photo
              )
              .then((res) => true)
              .catch((e) => (console.log(e),false))
            fs.unlink(file.path, () => null)
            return result ? file.filename : null
          })
        )
        const articles = files.reduce(
          (acc, file) => (file && acc.push({ image: file }), acc),
          [] as { image: string }[]
        )

        const result = await articleData.addArticles(articles)

        res.render('admin/photo/index', {
          result,
          files
        })
      },
      (req: Request, res: Response) => {
        res.redirect('/admin/login')
      }
    )
  }
} as PageRouting
