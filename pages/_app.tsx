import React from 'react';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
// import * as Sentry from '@sentry/browser';
import { appWithTranslation, i18n, Router } from 'i18n';
import { useEffect, useState, useCallback, useRef } from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/id';
import debounce from 'lodash.debounce';
import withReduxStore from 'lib/with-redux-store';
import actions from 'store/actions';
import cookies from 'next-cookies';
import NProgress from 'nprogress';
import api from 'services/api';
import 'styles/tailwind.css';
import 'styles/nprogress.css';
import 'styles/icomoon/style.css';
import 'reset-css';

// disable when development
// Sentry.init({
//   dsn: 'https://b7bfe45fb4e74521a03bae1650ed525c@sentry.io/1810105',
//   beforeSend: (event, hint: any) => {
//     if (process.env.NODE_ENV === 'development') {
//       console.error(hint.originalException || hint.syntheticException);
//       console.error('Error Object:', hint.originalException && hint.originalException.toJSON());
//       return null; // this drops the event and nothing will be sent to sentry
//     }
//     return event;
//   },
// });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: NextPage<any> = (props: any) => {
  const { Component, pageProps, reduxStore } = props;
  const [width, setWidth] = useState(0);

  const debouncedFunctionRef = useRef();
  (debouncedFunctionRef.current as any) = () => {
    setWidth(window.innerWidth);
  };
  const debouncedSetup = useCallback(
    debounce(() => (debouncedFunctionRef.current as any)(), 200),
    [],
  );
  useEffect(() => {
    dayjs.locale(i18n.language);
    setWidth(window.innerWidth);
    window.addEventListener('resize', debouncedSetup);
    return () => {
      window.removeEventListener('resize', () => debouncedSetup);
    };
  }, []);
  const createCartForUser = () => {
    const { dispatch, getState } = reduxStore;
    const { user } = getState().users;
    if (user && !user.cart) dispatch(actions.thunkCreateCart());
  };
  useEffect(() => {
    createCartForUser();
  }, [reduxStore.getState().users]);
  Router.events.on('routeChangeComplete', () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
  return (
    <Provider store={reduxStore}>
      {!!width && <Component isMobile={width < 768} {...pageProps} />}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600|Poppins:400,600,700|Kameron|Gochi+Hand&display=swap');
        @import '/static/styles/ReactToastify.min.css';
        @import '/static/styles/picker.min.css';

        body {
          @apply font-poppins text-dark-grey;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }

        .u-container {
          padding-left: 16px;
          padding-right: 16px;
          @screen md {
            @apply w-11/12 mx-auto;
            padding-left: 0;
            padding-right: 0;
          }
          &__spread {
            @apply flex items-center justify-between;
          }
          &__page {
            padding-top: 24px;
            @screen md {
              padding-top: 30px;
              padding-bottom: 30px;
            }
            &--large {
              padding-top: 61px;
              padding-bottom: 61px;
            }
          }
          @screen lg {
            @apply w-9/12;
          }
        }

        .h-min-screen {
          @screen md {
            min-height: calc(100vh - 239px);
          }
        }

        /* icons */

        .icon-tag_label:before {
          content: '\e912';
        }
        .icon-ui_cross:before {
          content: '\e911';
        }
        .icon-eye-show:before {
          content: '\e90e';
          color: #484e5c;
        }
        .icon-eye_hide:before {
          content: '\e90f';
          color: #484e5c;
        }
        .icon-menu:before {
          content: '\e910';
        }
        .icon-cross_check:before {
          content: '\e90d';
        }
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
        }
        .icon-trash:before {
          content: '\e909';
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

const redirectPrivateRoutes = ({ pathname, res }) => {
  const privateRoutes = ['/orders/[id]', '/orders/success', '/account', '/orders'];
  if (privateRoutes.includes(pathname)) {
    const redirectTo = pathname.split('/')[1];
    const login = `/login?from=${redirectTo}`;
    if (res) {
      // server-side
      res.writeHead(302, {
        Location: login,
      });
      res.end();
    } else {
      // client-side
      Router.replace(login);
    }
  }
};

const redirectLoginRoutes = ({ pathname, res }) => {
  const loginRoutes = ['/login', '/register'];
  if (loginRoutes.includes(pathname)) {
    const home = '/';
    if (res) {
      // server-side
      res.writeHead(302, {
        Location: home,
      });
      res.end();
    } else {
      // client-side
      Router.replace(home);
    }
  }
};

App.getInitialProps = async ({ Component, ctx, router }: any): Promise<any> => {
  const { dispatch, getState } = ctx.reduxStore;
  if (cookies(ctx).user) {
    if (!getState().users.user) {
      try {
        const { data: me } = await api(ctx.req).users.getMe();
        dispatch(actions.setLogin(true));
        dispatch(actions.loadUser(false, me));
      } catch {}
    }
    redirectLoginRoutes(ctx);
  } else {
    dispatch(actions.setLogin(false));
    redirectPrivateRoutes(ctx);
  }

  if (getState().default.errorMessage) dispatch(actions.setErrorMessage(''));
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
  };
};

export default appWithTranslation(withReduxStore(App));
