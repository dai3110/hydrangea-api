import React from 'react'

const Component = (props: {
  children: React.ReactNode
  action: string
  className?: string
  lead?: string
  type?: 'image'
}) => {
  return (
    <form
      action={props.action}
      method="POST"
      encType={
        props.type === 'image' ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
      }
      className="article-form"
      data-type={props.type}
    >
      {props.lead && <div className="_lead">{props.lead}</div>}
      <div className="_editor">{props.children}</div>
      <div className="_submit">
        <div>
          <button type="submit">Create Article</button>
        </div>
      </div>
    </form>
  )
}

export default Component
