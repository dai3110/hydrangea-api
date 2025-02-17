import { S3Client } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import fs from 'fs'
import { bucket } from '~/const/env'
import { role } from '~/const/role'
import { PageRouting } from '~/types/app'
import { auth, authRequestHandler } from '~/utils/auth'
import { handleBucket } from '~/utils/bucket'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
      const authUser = await auth.currentUser(req, res)
      res.render('admin/photo/add')
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
        const s3 = new S3Client({
          region: 'ap-northeast-1'
        })
        const files = await Promise.all(
          (req.files as Express.Multer.File[]).map(async (file) => {
            await handleBucket.push(
              {
                name: file.filename,
                buffer: await fs.promises.readFile(file.path),
                mime: file.mimetype
              },
              bucket.photo
            )

            fs.unlink(file.path, () => null)
            return file.filename
          })
        )

        res.render('admin/photo/add', {
          files
        })
      },
      (req: Request, res: Response) => {
        res.redirect('/admin/login')
      }
    )
  }
} as PageRouting
