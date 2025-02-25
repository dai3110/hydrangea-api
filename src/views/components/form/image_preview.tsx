import React from 'react'
import { bucket } from '~/const/env'

const Component = (props: { caption: string; image: string }) => {
  return (
    <dl className="image_preview">
      <dt>{props.caption}</dt>
      <dd>
        <img src={`${bucket.photoURL}/${props.image}`} />
      </dd>
    </dl>
  )
}

export default Component
