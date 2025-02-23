import React from 'react'

const Component = (props: {
  children: React.ReactNode
  action: string
  className?: string
  lead?: string
}) => {
  return (
    <form
      action={props.action}
      method="POST"
      encType="multipart/form-data"
      className="photo-form"
    >
      {props.lead && <div className="_lead">{props.lead}</div>}
      <dl>{props.children}</dl>
      <div className="_submit">
        <div>
          <button type="submit">Upload Photo</button>
        </div>
      </div>
    </form>
  )
}

export default Component
