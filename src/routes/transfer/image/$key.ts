import 'dotenv/config'
import { Request, Response } from 'express'
import { Readable } from 'stream'
import { bucket } from '~/const/env'
import { PageRouting } from '~/types/app'
import { handleBucket } from '~/utils/bucket'

export default {
  async get(req: Request, res: Response) {
    const result = await handleBucket.get(req.params['key'], bucket.photo)
    const readableObj = result.Body as Readable
    result.ContentType && res.type(result.ContentType)
    res.setHeader('Content-Length', result.ContentLength as number)
    readableObj.pipe(res)
  }
} as PageRouting
