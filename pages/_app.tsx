import React from 'react';
import 'antd/dist/reset.css';
import { GoogleAdSense } from "nextjs-google-adsense";
import { GoogleAnalytics } from '@eisberg-labs/next-google-analytics';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
    <GoogleAnalytics trackingId="G-XXXXXXX" />
    <GoogleAdSense publisherId="pub-XXXXXXXXXXXXXXXX" />
      <React.Fragment>
        {React.createElement(Component, {...pageProps})}
      </React.Fragment>
    </div>
  );
}

export default MyApp;
