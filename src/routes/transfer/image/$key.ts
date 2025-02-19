import 'dotenv/config'
import { Request, Response } from 'express'
import { Readable } from 'stream'
import { bucket } from '~/const/env'
import { appData } from '~/repository/app'
import { PageRouting } from '~/types/app'
import { handleBucket } from '~/utils/bucket'

export default {
  // apigateway-lambdaの負荷が高くなるので使用停止
  async get(req: Request, res: Response) {
    const key = req.params['key']
    appData.countImageView(key)
    
    const result = await handleBucket.get(key, bucket.photo)
    const readableObj = result.Body as Readable
    result.ContentType && res.type(result.ContentType)
    res.setHeader('Content-Length', result.ContentLength as number)
    readableObj.pipe(res)
  }
} as PageRouting
