import React from 'react';
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <React.Fragment>
        {React.createElement(Component, {...pageProps})}
      </React.Fragment>
    </div>
  );
}

export default MyApp;
