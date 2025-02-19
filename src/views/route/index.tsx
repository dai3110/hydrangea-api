import React from 'react';
import RootLayout from '~/views/components/layout/root';


const Page = (props: {
  now: number
  count: string
}) => (
  <RootLayout>
    <div>Hi!</div>
    <div>now: {props.now}</div>
  </RootLayout>
);

export default Page;