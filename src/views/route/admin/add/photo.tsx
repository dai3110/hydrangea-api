import React from 'react'
import AdminLayout from '~/views/components/layout/admin'
import ImageForm from '~/views/components/form/image'
import { bucket } from '~/const/env'
import { pathResolved, viewPath } from '~/utils/app'

const Page = (props: { user: string | null | undefined, result: boolean, files: string[] }) => (
  <AdminLayout script="general, admin" user={props.user}>
    <ImageForm
      action={pathResolved('/admin/add/photo')}
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
  </AdminLayout>
)

export default Page
