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

const Page = (props: {
  user: string | null | undefined
  article: {
    image: string
    title: string | null
    date: Date | null
    explain: string | null
    id: number
    lat: number | null
    lng: number | null
  }
}) => (
  <AdminLayout script="admin, date, leaflet, map" css="map" user={props.user}>
    <ArticleForm action={pathResolved(`/admin/article/${props.article.id}`)} update={!!props.article.title} lead="Edit the article and submit it when finished">
      <ArticleField group="input" is="dl">
        <ArticleItem caption="Title">
          <TextInput name="title" value={props.article.title} />
        </ArticleItem>
        <ArticleItem caption="Shooting Date">
          <DateInput name="date" value={props.article.date} />
        </ArticleItem>
        <ArticleItem caption="Geographic Data" valign="top">
          <GeoInput
            name={{ lat: 'lat', lng: 'lng' }}
            value={
              props.article.lat && props.article.lng
                ? { lat: String(props.article.lat), lng: String(props.article.lng) }
                : null
            }
          />
        </ArticleItem>
      </ArticleField>

      <ArticleField group="preview">
        <ImagePreview caption="Target Photo" image={props.article.image} />
      </ArticleField>

      <ArticleField group="description" is="dl">
        <ArticleItem caption="Description" valign="top">
          <MultipleTextInput name="explain" value={props.article.explain} />
        </ArticleItem>
      </ArticleField>

      <input type="hidden" name="image" value={props.article.image} />
    </ArticleForm>
  </AdminLayout>
)

export default Page
