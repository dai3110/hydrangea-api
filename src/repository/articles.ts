import 'dotenv/config'
import { dbtable } from '~/const/env'
import { db } from '~/utils/database'

export const articleData = {
  async putArticle(article: {
    id: number
    image?: string
    date?: string
    title?: string
    explain?: string
  }) {
    await db.from(dbtable.article).put(article)
  }
}