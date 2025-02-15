import { PageRouting, RequestHandler } from '~/types/app'
import { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import { db } from '~/utils/database'
import { dbtable } from '~/const/env'

export default {
  async get(req: Request, res: Response, next: NextFunction) {
    const data = await db.from(dbtable.app).get({
      name: 'article_count'
    })

    res.render('index', {
      now: Date.now(),
      count: data?.['value']
    })
  }
} as PageRouting
