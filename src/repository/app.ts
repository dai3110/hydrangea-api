import 'dotenv/config'
import { dbtable } from '~/const/env'
import { dynamodb } from '~/utils/database'

export const appData = {
  async countImageView(imageName: string) {
    const current = Number((await dynamodb.from(dbtable.view).get({
      name: imageName
    }))?.['value'] ?? 0)
    await dynamodb.from(dbtable.view).put({
      name: imageName,
      value: String(current + 1)
    })
    return current + 1
  }
}