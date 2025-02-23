import React from 'react'
import { pathResolved } from '~/utils/app'
import PhotoForm from '~/views/components/form/photo_form'
import ImageUpload from '~/views/components/form/image_upload'
import AdminLayout from '~/views/components/layout/admin'

const Page = (props: { user: string | null | undefined; result: boolean; files: string[] }) => (
  <AdminLayout script="general, admin, upload" user={props.user}>
    <PhotoForm
      action={pathResolved('/admin/add/photo')}
      lead="Register your photo before creating your article"
    >
      <ImageUpload name="image" lead="Drag and drop or click to select image files here" multiple />
    </PhotoForm>
  </AdminLayout>
)

export default Page
