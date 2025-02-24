import React, { Fragment } from 'react'
import { bucket } from '~/const/env'
import { pathResolved, viewPath } from '~/utils/app'
import AdminLayout from '~/views/components/layout/admin'
import ArticleCard from '~/views/components/article/card'
import ArticlePagenation from '~/views/components/article/pagenation'
import { postsPerPage } from '~/const/app'
import { extractText } from '~/utils/html'

const types = ['all', 'draft', 'private', 'public'] as const

const Page = (props: {
  user: string | null | undefined
  type: 'open' | 'close'
  article: {
    id: number
    image?: string
    date?: Date
    title?: string
    explain?: string
    lat?: number
    lng?: number
    public: boolean
  }
}) => {
  const status = !props.article.title ? 'draft' : !props.article.public ? 'private' : 'public'
  const content = extractText(props.article.explain ?? '')

  return (
    <AdminLayout script="general, admin" user={props.user}>
      <div className="article-lead">
        {props.type === 'open' ? 'Would you like to publish the following article?' : 'Would you like to change the following article private?'}
      </div>
      <ul className="article-list">
        <ArticleCard is="li" article={props.article}>
          <div data-status-badge={status}></div>
          {status === 'draft' && <div className="post-info">This article has no content. Click the edit button to complete the article.</div>}
          {status !== 'draft' && (
            <div className="post-info">
              <ul className="_contents">
                <li><strong>{ props.article.title }</strong></li>
                <li>{ content.length > 256 ? `${content.slice(0, 256)}...` : content }</li>
              </ul>
            </div>
          )}
        </ArticleCard>
      </ul>
      <form action={`/admin/publish/${props.type}/${props.article.id}`} className="article-submit" method="POST" encType="application/x-www-form-urlencoded">
        <button type="submit">{props.type === 'open' ? 'Publish Article' : 'Set to Set to Private'}</button>
      </form>
    </AdminLayout>
  )
}

export default Page
