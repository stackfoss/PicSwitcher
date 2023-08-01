import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.16.13/antd.min.css"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

