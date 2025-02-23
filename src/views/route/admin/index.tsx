import React, { Fragment } from 'react';
import { bucket } from '~/const/env';
import { pathResolved, viewPath } from '~/utils/app';
import AdminLayout from '~/views/components/layout/admin';

const Page = (props: {
  user: string | null | undefined
  article: {
    id: number
    image: string
  }[]
}) => (
  <AdminLayout script="general, admin" user={props.user}>
    {props.article && (
      <dl>
        {props.article.map((d, i) => (
          <Fragment key={i}>
            <dt>{d.id}: {d.image}</dt>
            <dd>
              <a href={`/admin/article/${d.image}`}><img src={`${bucket.photoURL}/${d.image}`} style={{maxWidth: '240px'}} /></a>
            </dd>
          </Fragment>
        ))}
      </dl>
    )}
  </AdminLayout>
);

export default Page;