import React from 'react'

const Component = (props: {
  action: string
  name: string
}) => {
  return (
    <form action={props.action} method="POST" encType="multipart/form-data">
      <input type="file" name={props.name} />
    </form>
  )
}

export default Component
