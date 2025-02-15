import React from 'react';
import RootLayout from '~/components/layout/root';


const Page = (props: {
  now: number
  count: string
}) => (
  <RootLayout>
    <div>Hi!</div>
    <div>now: {props.now}</div>
    <div>count: {props.count}</div>
  </RootLayout>
);

export default Page;