import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { bucket } from '~/const/env'

const Component = (props: {
  name: {
    lat: string
    lng: string
  }
  value?: {
    lat: string
    lng: string
  } | null
}) => {
  return (
    <div className="geo_input">
      <input type="hidden" name={props.name.lat} defaultValue={props.value?.lat} />
      <input type="hidden" name={props.name.lng} defaultValue={props.value?.lng} />
      <div data-map={`${props.name.lat},${props.name.lng}`}></div>
    </div>
  )
}

export default Component
