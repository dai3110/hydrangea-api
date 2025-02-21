import React, { Fragment } from 'react';
import { bucket } from '~/const/env';
import { pathResolved } from '~/utils/app';
import RootLayout from '~/views/components/layout/root';

const Page = (props: {
  user: string
  article: {
    id: number
    image: string
  }[]
}) => (
  <RootLayout>
    <div>
      <a href={pathResolved('/admin/logout')}>logout</a>
    </div>
    <div>{props.user}</div>
    <div>
      <a href={pathResolved('/admin/add/photo')}>add article</a>
    </div>
    {props.article && (
      <dl>
        {props.article.map((d, i) => (
          <Fragment key={i}>
            <dt>{d.id}: {d.image}</dt>
            <dd>
              <img src={`${bucket.photoURL}/${d.image}`} style={{maxWidth: '240px'}} />
            </dd>
          </Fragment>
        ))}
      </dl>
    )}
  </RootLayout>
);

export default Page;