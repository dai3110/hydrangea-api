import React from 'react';
import RootLayout from '~/components/layout/root';


const Page = (props: {
  now: number
}) => (
  <RootLayout>
    <div>hello</div>
    <div>now: {props.now}</div>
  </RootLayout>
);

export default Page;