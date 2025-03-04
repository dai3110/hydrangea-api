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
      res.render('admin/add/photo', {
        user: req.session.user
      })
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath('/admin/add/photo'))
    }
  ),
  post: {
    upload: 'image',
    handler: authRequestHandler(
      role.admin.read,
      async (req: Request, res: Response) => {
        // lambda-apigatewayへの負荷を考慮して
        // 実際にはview側の入力はmultipleではなくする
        const user = await auth.currentUser(req, res)
        const userAttr = user?.UserAttributes?.find((attr) => attr.Name === role.admin.write.key)?.Value ?? -1
        if (Number(userAttr) > 1) {
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
                .catch((e) => (console.log(e), false))
              fs.unlink(file.path, () => null)
              return result ? file.filename : null
            })
          )
          const articles = files.reduce(
            (acc, file) => (file && acc.push({ image: file }), acc),
            [] as { image: string }[]
          )
       
          const result = await articleData.addArticle(articles[0])
          result ? res.redirect(`/admin/article/${result.id}`) : res.render('admin/add/photo')
        } else {
          res.redirect(`/admin/list/draft`)
        }
      },
      (req: Request, res: Response) => {
        res.redirect(loginPath('/admin/add/photo'))
      }
    )
  }
} as PageRouting
