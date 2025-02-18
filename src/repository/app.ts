import 'dotenv/config'
import { dbtable } from '~/const/env'
import { db } from '~/utils/database'

export const appData = {
  async increaseArticleCount() {
    const current = Number((await db.from(dbtable.app).get({
      name: 'article_count'
    }))?.['value'])
    await db.from(dbtable.app).put({
      name: 'article_count',
      value: String(current + 1)
    })
    return current + 1
  }
}