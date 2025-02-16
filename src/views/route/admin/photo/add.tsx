import React from 'react'
import RootLayout from '~/views/components/layout/root'
import ImageForm from '~/views/components/form/image'

const Page = (props: { user: string }) => (
  <RootLayout>
    <div>
      <a href="/admin/logout">logout</a>
    </div>
    <ImageForm action="/admin/photo/add" name="photo" />
  </RootLayout>
)

export default Page
