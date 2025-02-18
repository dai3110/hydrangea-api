import React from 'react'
import RootLayout from '~/views/components/layout/root'
import ImageForm from '~/views/components/form/image'

const Page = (props: { user: string, files: string[] }) => (
  <RootLayout>
    <div>
      <a href="/admin/logout">logout</a>
    </div>
    <ImageForm
      action="/admin/photo/"
      name="image"
      caption="Select an image file to upload and submit"
      accept=".jpg,.png"
    />
    {props.user && <div>{props.user}</div>}
    {props.files && (
      <div>
        {props.files.map((f, i) => (
          <div key={i}>
            <img src={`/transfer/image/${f}`} style={{maxWidth: '400px'}} />
          </div>
        ))}
      </div>
    )}
  </RootLayout>
)

export default Page
