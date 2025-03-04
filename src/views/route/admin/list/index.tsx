import React from 'react'
import { postsPerPage } from '~/const/app'
import ArticleCard from '~/views/components/article/card'
import ArticleControl from '~/views/components/article/control_button'
import ArticlePagenation from '~/views/components/article/pagenation'
import AdminLayout from '~/views/components/layout/admin'

const types = ['all', 'draft', 'private', 'public'] as const

const Page = (props: {
  user: string | null | undefined
  articles: {
    posts: {
      id: number
      image?: string
      date?: Date
      title?: string
      explain?: string
      lat?: number
      lng?: number
      public: boolean
    }[]
    count: number
  }
  type: (typeof types)[number]
  page?: number
}) => {
  const articleTypePhrase: { [type in (typeof types)[number]]: string } = {
    all: 'All type of article list',
    draft: 'Draft article list',
    private: 'Private article list',
    public: 'Public article list'
  }
  const range = {
    from: ((props.page ?? 1) - 1) * postsPerPage + 1,
    to: Math.min(props.articles.count, (props.page ?? 1) * postsPerPage)
  }
  return (
    <AdminLayout script="general, admin" user={props.user}>
      <ul className="article-list">
        {props.articles.posts?.map((post, i) => {
          const status = !post.title ? 'draft' : !post.public ? 'private' : 'public'
          const content = post.explain ?? ''

          return (
            <ArticleCard key={i} is="li" article={post}>
              <div data-status-badge={status}></div>
              {status === 'draft' && (
                <div className="post-info">
                  This article has no content. Click the edit button to complete the article.
                </div>
              )}
              {status !== 'draft' && (
                <div className="post-info">
                  <ul className="_contents">
                    <li>
                      <strong>{post.title}</strong>
                    </li>
                    <li>{content.length > 256 ? `${content.slice(0, 256)}...` : content}</li>
                  </ul>
                </div>
              )}

              <div className="post-control">
                {status === 'draft' && (
                  <>
                    <ArticleControl id={post.id} type="delete" />
                    <ArticleControl id={post.id} type="edit" />
                  </>
                )}
                {status === 'private' && (
                  <>
                    <ArticleControl id={post.id} type="delete" />
                    <ArticleControl id={post.id} type="open" />
                    <ArticleControl id={post.id} type="edit" />
                  </>
                )}
                {status === 'public' && (
                  <>
                    <ArticleControl id={post.id} type="close" />
                    <ArticleControl id={post.id} type="edit" />
                  </>
                )}
              </div>
            </ArticleCard>
          )
        })}
      </ul>
      <div className="article-control">
        <div>
          <div>
            <h2>{articleTypePhrase[props.type ?? 'all']}</h2>
            <span className="_counts">
              :&nbsp;{range.from === range.to ? `${range.from}` : `${range.from}–${range.to}`}{' '}
              /&nbsp;
              {props.articles.count}article{props.articles.count > 1 && 's'}
            </span>
          </div>
          {props.articles.count && (
            <ArticlePagenation
              page={props.page ?? 1}
              total={props.articles.count}
              type={props.type}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default Page
