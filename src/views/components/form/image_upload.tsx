import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react'

const Component = (props: {
  name: string
  lead?: string
  multiple?: boolean
}) => {
  return (
    <>
      <dt>{props.lead}</dt>
      <dd>
        <div className="_info"></div>
        <input
          type="file"
          name={props.name}
          accept=".png, .jpg"
          {...(props.multiple ? { multiple: true } : {})}
        />
      </dd>
    </>
  )
}

export default Component
