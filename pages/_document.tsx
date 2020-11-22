import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from 'lib/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link key="icon" rel="icon" href="/static/favicon.ico" />
          <link key="apple-touch-icon" rel="apple-touch-icon" href="/static/images/icons/icon-144x144.png" />
          <link key="manifest" rel="manifest" href="/static/manifest.json" />

          {/* <!-- Main Link Tags  --> */}
          <link href="/static/favicon-16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/static/favicon-32.png" rel="icon" type="image/png" sizes="32x32" />
          <link href="/static/favicon-48.png" rel="icon" type="image/png" sizes="48x48" />

          {/* <!-- iOS  --> */}
          <link href="/static/images/icons/icon-72x72.png" rel="apple-touch-icon" />
          <link href="/static/images/icons/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
          <link href="/static/images/icons/icon-128x128.png" rel="apple-touch-icon" sizes="128x128" />
          <link href="/static/images/icons/icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />

          {/* <!-- Startup Image  --> */}
          {/* <link
            rel="apple-touch-startup-image"
            href="/static/images/logo-bg-white.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/static/images/logo-bg-white.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/static/images/logo-bg-white.png"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/static/images/logo-bg-white.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/static/images/logo-bg-white.png"
            media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/static/images/logo-bg-white.png"
            media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/static/images/logo-bg-white.png"
            media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
          /> */}

          {/* <!-- Pinned Tab  --> */}
          {/* <link href="path/to/icon.svg" rel="mask-icon" size="any" color="red" /> */}
          <link href="/static/images/icons/icon-72x72.png" rel="mask-icon" color="red" />

          {/* <!-- Android  --> */}
          <link href="/static/images/icons/icon-192x192.png" rel="icon" sizes="192x192" />
          <link href="/static/images/icons/icon-128x128.png" rel="icon" sizes="128x128" />

          {/* <!-- Others --> */}
          <link href="/static/favicon.ico" rel="shortcut icon" type="image/x-icon" />

          {/* <!-- UC Browser  --> */}
          <link href="/static/images/icons/icon-52x52.png" rel="apple-touch-icon-precomposed" sizes="52x52" />
          <link href="/static/images/icons/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />

          {/* <!-- Manifest.json  --> */}
          <link href="/static/manifest.json" rel="manifest" />

          <link
            href="https://fonts.googleapis.com/css2?family=Jost:wght@300&family=Open+Sans:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://cdn.jsdelivr.net/npm/react-toastify@6.0.5/dist/ReactToastify.min.css"
            rel="stylesheet"
          ></link>
          {/* <link href="https://cdn.jsdelivr.net/npm/pickerjs@1.2.1/dist/picker.min.css" rel="stylesheet"></link> */}
          <link
            href="/static/fonts/icons/whenigrowup.ttf?z42pcr"
            rel="preload"
            as="font"
            crossOrigin="anonymous"
          ></link>

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
