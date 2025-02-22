import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { dbtable } from '~/const/env'
import { role } from '~/const/role'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'
import { loginPath } from '~/utils/app'
import { auth, authRequestHandler } from '~/utils/auth'
import { dynamodb } from '~/utils/database'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
  
      res.render('admin/index', {
        user: req.session.user,
        article: await articleData.getArticle()
      })
      
    },
    (req: Request, res: Response) => {
      res.redirect(loginPath('/admin/login'))
    }
  )
} as PageRouting
