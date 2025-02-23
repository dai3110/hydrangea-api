import React from 'react'

const Component = (props: {
  caption: string
  valign?: 'top' | 'middle' | 'bottom'
  children: React.ReactNode
}) => {
  const alignMapping = {
    top: 'start',
    middle: 'center',
    bottom: 'end'
  }
  return (
    <>
      <dt style={{ alignSelf: alignMapping[props.valign ?? 'middle'] }}>
        {props.caption}
      </dt>
      <dd>
        {props.children}
      </dd>
    </>
  )
}

export default Component
