import React from 'react';
import { Provider } from 'react-redux';
import cookies from 'next-cookies';
import { NextPage } from 'next';
// import * as Sentry from '@sentry/browser'
import withReduxStore from 'lib/with-redux-store';
import { appWithTranslation } from 'i18n';
import actions from 'store/actions';
import 'styles/tailwind.css';
import 'styles/icomoon/style.css';
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

const App: NextPage<any> = (props: any) => {
  const { Component, pageProps, reduxStore } = props;
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans|Poppins&display=swap');
        @import 'static/styles/ReactToastify.min.css';

        body {
          @apply font-poppins text-dark-grey;
        }

        .u-container {
          @apply w-11/12 mx-auto;
          &__spread {
            @apply flex items-center justify-between;
          }
          &__page {
            padding: 30px 0;
          }
          @screen lg {
            @apply w-9/12;
          }
        }

        .h-min-screen {
          min-height: calc(100vh - 239px);
        }

        /* icons */
        .icon-chevron_up:before {
          content: '\e90b';
        }
        .icon-chevron_down:before {
          content: '\e90c';
        }
        .icon-info:before {
          content: '\e90a';
        }
        .icon-edit:before {
          content: '\e908';
          color: #e1e1e1;
        }
        .icon-trash:before {
          content: '\e909';
          color: #e1e1e1;
        }
        .icon-arrow_left:before {
          content: '\e907';
        }
        .icon-facebook_white:before {
          content: '\e904';
          color: #fafafa;
        }
        .icon-instagram_white:before {
          content: '\e905';
          color: #fafafa;
        }
        .icon-twitter_white:before {
          content: '\e906';
          color: #fafafa;
        }
        .icon-chevron_right:before {
          content: '\e902';
        }
        .icon-chevron_left:before {
          content: '\e903';
        }
        .icon-cart:before {
          content: '\e900';
        }
        .icon-account:before {
          content: '\e901';
        }
      `}</style>
    </Provider>
  );
};

App.getInitialProps = async ({ Component, ctx, router }: any): Promise<any> => {
  if (cookies(ctx).user) {
    ctx.reduxStore.dispatch(actions.setLogin(true));
  } else {
    ctx.reduxStore.dispatch(actions.setLogin(false));
  }

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
  };
};

export default appWithTranslation(withReduxStore(App));
