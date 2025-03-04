import 'dotenv/config'
import { dbtable } from '~/const/env'
import { dynamodb } from '~/utils/database'

export const appData = {
  async incrementPublishVersion() {
    const current = Number(
      (
        await dynamodb.from(dbtable.view).get({
          name: 'ver'
        })
      )?.['value'] ?? 0
    )
    await dynamodb.from(dbtable.view).put({
      name: 'ver',
      value: String(current + 1)
    })
    return current + 1
  },
  async currentPublishVersion() {
    const current = Number(
      (
        await dynamodb.from(dbtable.view).get({
          name: 'ver'
        })
      )?.['value'] ?? 0
    )
    return current
  }
}
