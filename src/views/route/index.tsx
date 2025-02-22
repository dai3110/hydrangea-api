import React from 'react'
import { viewPath } from '~/utils/app';
import RootLayout from '~/views/components/layout/root'

const Page = (props: { now: number; count: string }) => {
  return (
    <RootLayout script="general">
      <div>Hi!</div>
      <div>now: {props.now}</div>
    </RootLayout>
  )
}

export default Page
