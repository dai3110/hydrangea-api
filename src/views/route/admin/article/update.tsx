import React from 'react'
import { pathResolved } from '~/utils/app'
import ArticleForm from '~/views/components/form/article_form'
import ArticleField from '~/views/components/form/article_field'
import ArticleItem from '~/views/components/form/article_item'
import TextInput from '~/views/components/form/text_input'
import MultipleTextInput from '~/views/components/form/multiple_text_input'
import DateInput from '~/views/components/form/date_input'
import ImagePreview from '~/views/components/form/image_preview'
import GeoInput from '~/views/components/form/geo_input'
import AdminLayout from '~/views/components/layout/admin'

const Page = (props: { user: string | null | undefined, image: string }) => (
  <AdminLayout script="general, admin, leaflet, map" css="map" user={props.user}>
    <ArticleForm action={pathResolved('/admin/article/')}>
      <ArticleField group="input" is="dl">
        <ArticleItem caption="Title">
          <TextInput name="title" />
        </ArticleItem>
        <ArticleItem caption="Shooting Date">
          <DateInput name="date" />
        </ArticleItem>
        <ArticleItem caption="Geographic Data" valign="top">
          <GeoInput name={{lat: 'lat', lng: 'lng'}} />
        </ArticleItem>
      </ArticleField>

      <ArticleField group="preview">
        <ImagePreview caption="Target Photo" image={props.image} />
      </ArticleField>

      <ArticleField group="description" is="dl">
        <ArticleItem caption="Description" valign="top">
          <MultipleTextInput name="explain" />
        </ArticleItem>
      </ArticleField>
    </ArticleForm>
  </AdminLayout>
)

export default Page
