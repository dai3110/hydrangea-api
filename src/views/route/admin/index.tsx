import React, { Fragment } from 'react';
import RootLayout from '~/views/components/layout/root';

const Page = (props: {
  user: string
  data: {
    id: number
    image: string
  }[]
}) => (
  <RootLayout>
    <div>
      <a href="/admin/logout">logout</a>
    </div>
    <div>{props.user}</div>
    <div>
      <a href="/admin/photo/">add photo</a>
    </div>
    {props.data && (
      <dl>
        {props.data.map((d, i) => (
          <Fragment key={i}>
            <dt>{d.id}: {d.image}</dt>
            <dd>
              <img src={`/transfer/image/${d.image}`} style={{maxWidth: '240px'}} />
            </dd>
          </Fragment>
        ))}
      </dl>
    )}
  </RootLayout>
);

export default Page;