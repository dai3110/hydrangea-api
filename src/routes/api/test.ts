import { Request, Response } from 'express'
import { PageRouting } from '~/types/app'

export default {
  async get(req: Request, res: Response) {
    res.send({ image: '1739936140739-0jch80-imgp0959.jpg' })
  }
} as PageRouting
