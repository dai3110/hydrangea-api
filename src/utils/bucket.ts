import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { env } from '~/const/env'
import { PushFileProperties } from '~/types/bucket'

const s3 = new S3Client({
  region: env.s3Region
})

export const handleBucket = {
  async push(file: PushFileProperties, bucket: string) {
    return await s3.send(
      new PutObjectCommand({
        Body: file.buffer,
        Bucket: bucket,
        Key: file.name,
        ContentType: file.mime
      })
    )
  },
  async get(name: string, bucket: string) {
    return await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: name
      })
    )
  }
}
