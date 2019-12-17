import React from 'react'
import { Provider } from 'react-redux'
import cookies from 'next-cookies'
import { NextPage } from 'next';
// import * as Sentry from '@sentry/browser'
import withReduxStore from '../lib/with-redux-store'
import actions from "../store/actions";
import '../styles/tailwind.css';
import 'reset-css';

// disable when development
// Sentry.init({
//   dsn: "https://b7bfe45fb4e74521a03bae1650ed525c@sentry.io/1810105",
//   beforeSend: (event, hint: any) => {
//     if (process.env.NODE_ENV === 'development') {
//       console.error(hint.originalException || hint.syntheticException);
//       console.error('Error Object:', hint.originalException && hint.originalException.toJSON());
//       return null; // this drops the event and nothing will be sent to sentry
//     }
//     return event;
//    }
// });

const App : NextPage<any> = (props) => {
  const { Component, pageProps, reduxStore } = props;
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          @apply font-sans;
        }

        .u-container {
          @apply flex items-center justify-between w-full m-auto;
          @screen lg {
            @apply w-11/12;
          }
        }
      `}</style>
    </Provider>
  )
};

App.getInitialProps = async ({ Component, ctx, router } : any) => {
  if (cookies(ctx).user) {
    ctx.reduxStore.dispatch(actions.setLogin(true))
  } else {
    ctx.reduxStore.dispatch(actions.setLogin(false))
  }

  return {
    pageProps: Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {},
  }
}

export default withReduxStore(App);
