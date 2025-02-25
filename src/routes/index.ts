import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { PageRouting } from '~/types/app'

export default {
  async get(req: Request, res: Response, next: NextFunction) {
    res.render('index', {
      now: Date.now()
    })
  }
} as PageRouting
