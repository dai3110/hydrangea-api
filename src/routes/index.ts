import { PageRouting, RequestHandler } from '~/types/app';
import { Request, Response, NextFunction } from "express";
import 'dotenv/config'

export default {
  get(req: Request, res: Response, next: NextFunction) {
    res.render('index', {
      now: Date.now()
    })
  }
} as PageRouting
