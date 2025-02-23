import React from 'react'

const Component = (props: {
  children: React.ReactNode
  is?: string
  group: 'input' | 'preview' | 'description'
}) => {
  return React.createElement(
    props.is ?? 'div',
    {
      className: '_field',
      'data-group': props.group
    },
    props.children
  )
}

export default Component
