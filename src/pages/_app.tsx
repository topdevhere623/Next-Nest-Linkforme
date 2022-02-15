import App from 'next/app';
import 'src/client/styles/global.css';
import '../client/styles/tooltip.css';
import wrapper from 'src/client/store';
import Head from 'next/head';
// import { AnimatePresence, motion } from 'framer-motion';
import PopupWrapper from 'src/client/components/popup/wrapper';
import Snackbar from '../client/components/popup/snackbar';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#9d5c82"
          />
          <meta name="msapplication-TileColor" content="#603cba" />
          <meta name="theme-color" content="#ffffff" />
          <title>Link for me</title>
        </Head>
        {/* <AnimatePresence initial={false} exitBeforeEnter> */}
        <PopupWrapper>
          <Component {...pageProps} key={router.route} />
          <Snackbar />
        </PopupWrapper>
        {/* </AnimatePresence> */}
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
