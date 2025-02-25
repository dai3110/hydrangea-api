import React from 'react'
import RootLayout from '~/views/components/layout/root'

const Page = (props: { now: number; count: string }) => {
  return (
    <RootLayout script="general">
      <div>Do not see me</div>
    </RootLayout>
  )
}

export default Page
