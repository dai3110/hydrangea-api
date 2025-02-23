import React from 'react'

const Component = (props: {
  name: string
  value?: string
}) => {
  return (
    <>
      <input type="text" name={props.name} defaultValue={props.value} className="text-input" />
    </>
  )
}

export default Component
