import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { csscat } from '~/utils/css'

type StockFile = {
  file: File
  content: string | null
} | null

const Component = (props: {
  action: string
  name: string
  className?: string
  caption?: string
  accept?: string
}) => {
  return (
    <form
      action={props.action}
      method="POST"
      encType="multipart/form-data"
      className={csscat(props.className, 'image-form')}
    >
      <input type="file" name={props.name}multiple />
      <button type="submit" data-submit-button>submit</button>
    </form>
  )
}

export default Component
