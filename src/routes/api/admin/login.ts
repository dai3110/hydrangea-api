import { Request, Response } from 'express'
import { PageRouting } from '~/types/app'
import { auth, sessionToken } from '~/utils/auth'

export default {
  async get(req: Request, res: Response) {
    const authUser = await auth.currentUser(req, res)
    res.send({ authUser })
  }
} as PageRouting
