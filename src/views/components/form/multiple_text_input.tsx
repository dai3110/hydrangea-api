import React from 'react'

const Component = (props: {
  name: string
  value?: string | null
}) => {
  return (
    <>
      <textarea name={props.name} defaultValue={props.value ?? undefined}></textarea>
    </>
  )
}

export default Component
