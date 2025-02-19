import React from 'react'
import RootLayout from '~/views/components/layout/root'
import ImageForm from '~/views/components/form/image'
import { bucket } from '~/const/env'

const Page = (props: { result: boolean, files: string[] }) => (
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
    {props.result !== undefined && <div>{props.result ? 'ok' : 'ng'}</div>}
    {props.files && (
      <div>
        {props.files.map((f, i) => (
          <div key={i}>
            <img src={`${bucket.photoURL}/${f}`} style={{maxWidth: '400px'}} />
          </div>
        ))}
      </div>
    )}
  </RootLayout>
)

export default Page
