import React from 'react';
import RootLayout from '~/views/components/layout/root';

const Page = (props: {
  user: string
}) => (
  <RootLayout>
    <div>
      <a href="/admin/logout">logout</a>
    </div>
    <div>{props.user}</div>
  </RootLayout>
);

export default Page;