import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { dbtable } from '~/const/env'
import { role } from '~/const/role'
import { articleData } from '~/repository/articles'
import { PageRouting } from '~/types/app'
import { auth, authRequestHandler } from '~/utils/auth'
import { dynamodb } from '~/utils/database'

export default {
  get: authRequestHandler(
    role.admin.read,
    async (req: Request, res: Response) => {
  
      res.render('admin/index', {
        now: Date.now(),
        article: await articleData.getArticle()
      })
      
    },
    (req: Request, res: Response) => {
      res.redirect('/admin/login')
    }
  )
} as PageRouting
