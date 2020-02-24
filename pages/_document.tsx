import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <meta key="robots" name="robots" content="noimageindex" />
          <meta key="httpEquiv" httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta key="theme-color" name="theme-color" content="#000000" />
          <link key="icon" rel="icon" href="/static/favicon.ico" />
          <link key="apple-touch-icon" rel="apple-touch-icon" href="/static/images/icons/pasfoto-icon.png" />
          <meta key="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="Website Consultant" />
          <meta key="apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes" />
          <meta
            key="apple-mobile-web-app-status-bar-style"
            name="apple-mobile-web-app-status-bar-style"
            content="white"
          />
          <link key="manifest" rel="manifest" href="/static/manifest.json" />
          <meta
            key="Description"
            name="Description"
            content="children books, custom books, parenting books, parenting, children, baby, creativity, growing up"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
