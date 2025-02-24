import React from 'react'
import { bucket } from '~/const/env'

const Component = (props: {
  is?: string
  article: {
    id: number
    image?: string
    // date?: Date
    // title?: string
    // explain?: string
    // lat?: number
    // lng?: number
  }
  children: React.ReactNode
}) => {
  return React.createElement(
    props.is ?? 'div', {
      className: 'article-card'
    },
    <>
      <div className="_image">
        <img src={`${bucket.photoURL}/${props.article.image}`} />
      </div>
      <div className="_info">
        {props.children}
      </div>
    </>
  )
  
}

export default Component
