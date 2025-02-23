import React from 'react'

const Component = (props: {
  name: string
  value?: string
}) => {
  return (
    <>
      <textarea name={props.name} defaultValue={props.value}></textarea>
    </>
  )
}

export default Component
