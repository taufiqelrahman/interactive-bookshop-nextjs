import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta key="robots" name="robots" content="noimageindex" />
          <meta key="theme-color" name="theme-color" content="#000000" />
          <link key="icon" rel="icon" href="/static/favicon.ico" />
          <link key="apple-touch-icon" rel="apple-touch-icon" href="/static/images/icons/icon-144x144.png" />
          <meta key="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="Website Consultant" />
          <meta key="apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes" />
          <meta
            key="apple-mobile-web-app-status-bar-style"
            name="apple-mobile-web-app-status-bar-style"
            content="white"
          />
          <link key="manifest" rel="manifest" href="/static/manifest.json" />
          <meta
            key="description"
            name="description"
            content="children books, custom books, parenting books, parenting, children, baby, creativity, growing up"
          />
          {/* PWA */}
          <meta key="charSet" charSet="utf-8" />
          <meta key="httpEquiv" httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta
            key="keyword"
            name="keywords"
            content="children books, custom books, parenting books, parenting, children, baby, creativity, growing up"
          />
          {/* <!-- Android  --> */}
          <meta key="theme-color" name="theme-color" content="#de6236" />
          <meta key="mobile-web-app-capable" name="mobile-web-app-capable" content="yes" />

          {/* <!-- iOS --> */}
          <meta key="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="When I Grow Up" />
          <meta key="apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes" />
          <meta
            key="apple-mobile-web-app-status-bar-style"
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          {/* <!-- Windows  --> */}
          <meta key="msapplication-navbutton-color" name="msapplication-navbutton-color" content="#de6236" />
          <meta key="msapplication-TileColor" name="msapplication-TileColor" content="#de6236" />
          <meta key="msapplication-TileImage" name="msapplication-TileImage" content="icon-144x144.png" />
          <meta key="msapplication-config" name="msapplication-config" content="browserconfig.xml" />

          {/* <!-- Pinned Sites  --> */}
          <meta key="application-name" name="application-name" content="When I Grow Up" />
          <meta key="msapplication-tooltip" name="msapplication-tooltip" content="When I Grow Up" />
          <meta key="msapplication-starturl" name="msapplication-starturl" content="/" />

          {/* <!-- Tap highlighting  --> */}
          <meta key="msapplication-tap-highlight" name="msapplication-tap-highlight" content="no" />

          {/* <!-- UC Mobile Browser  --> */}
          <meta key="full-screen" name="full-screen" content="yes" />
          <meta key="browsermode" name="browsermode" content="application" />

          {/* <!-- Disable night mode for this page  --> */}
          <meta key="nightmode" name="nightmode" content="enable/disable" />

          {/* <!-- Fitscreen  --> */}
          {/* <meta key="viewport" name="viewport" content="uc-fitscreen=yes" /> */}

          {/* <!-- Layout mode --> */}
          <meta key="layoutmode" name="layoutmode" content="fitscreen/standard" />

          {/* <!-- imagemode - show image even in text only mode  --> */}
          <meta key="imagemode" name="imagemode" content="force" />

          {/* <!-- Orientation  --> */}
          {/* <meta key="screen-orientation" name="screen-orientation" content="portrait" /> */}

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
          <link
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
          />

          {/* <!-- Pinned Tab  --> */}
          {/* <link href="path/to/icon.svg" rel="mask-icon" size="any" color="red" /> */}
          <link href="/static/images/icons/icon-72x72.png" rel="mask-icon" color="red" />

          {/* <!-- Android  --> */}
          <link href="/static/images/icons/icon-192x192.png" rel="icon" sizes="192x192" />
          <link href="/static/images/icons/icon-128x128.png" rel="icon" sizes="128x128" />

          {/* <!-- Others --> */}
          <link href="/static/favicon.icon" rel="shortcut icon" type="image/x-icon" />

          {/* <!-- UC Browser  --> */}
          <link href="/static/images/icons/icon-52x52.png" rel="apple-touch-icon-precomposed" sizes="57x57" />
          <link href="/static/images/icons/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />

          {/* <!-- Manifest.json  --> */}
          <link href="/static/manifest.json" rel="manifest" />
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
