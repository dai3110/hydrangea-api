import React from 'react'

const Component = (props: { name: string; value?: string | null }) => {
  return (
    <>
      <input
        type="text"
        name={props.name}
        defaultValue={props.value ?? undefined}
        className="text-input"
      />
    </>
  )
}

export default Component
