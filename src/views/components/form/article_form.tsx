import React from 'react'

const Component = (props: {
  children: React.ReactNode
  action: string
  className?: string
  lead?: string
  update?: boolean
}) => {
  return (
    <form
      action={props.action}
      method="POST"
      encType="application/x-www-form-urlencoded"
      className="article-form"
    >
      {props.lead && <div className="_lead">{props.lead}</div>}
      <div className="_editor">{props.children}</div>
      <div className="_submit">
        <button type="submit">{props.update ? 'Update Article' : 'Create Article'}</button>
      </div>
    </form>
  )
}

export default Component
