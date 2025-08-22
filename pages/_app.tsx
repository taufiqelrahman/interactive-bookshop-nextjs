/* eslint-disable no-useless-escape */
import * as Sentry from '@sentry/browser';
import * as dayjs from 'dayjs';
import 'dayjs/locale/id';
import detectIt from 'detect-it';
import Cookies from 'js-cookie';
import debounce from 'lodash.debounce';
import { NextApiResponse, NextPage } from 'next';
import App from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import cookies from 'next-cookies';
import NProgress from 'nprogress';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider } from 'react-redux';

import { appWithTranslation, i18n, Router } from 'i18n';
import * as gtag from 'lib/gtag';
import withReduxStore, { getOrCreateStore } from 'lib/with-redux-store';
import api from 'services/api';
import actions from 'store/actions';
import 'styles/tailwind.css';
import 'styles/nprogress.css';
import 'styles/icomoon/style.min.css';
import 'reset-css';
import 'styles/fonts.min.css';

const Pixel = dynamic(() => import('components/atoms/Pixel'));

// disable when development
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  beforeSend: (event, hint: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(hint);
      // console.error(hint.originalException || hint.syntheticException);
      // console.error('Error Object:', hint.originalException);
      return null; // this drops the event and nothing will be sent to sentry
    }
    return event;
  },
});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const WiguApp: NextPage<any> = (props: any) => {
  const { Component, pageProps = {}, reduxStore } = props;
  const [width, setWidth] = useState(0);

  const debouncedFunctionRef = useRef<any>(() => setWidth(window.innerWidth));
  const debouncedSetup = useCallback(
    debounce(() => debouncedFunctionRef.current(), 200),
    [],
  );
  const handleRouteChange = (url: string) => {
    gtag.pageview(url);
  };
  useEffect(() => {
    if (reduxStore.getState().users.isExpired) Cookies.remove('user', { domain: process.env.DOMAIN });
    dayjs.locale(i18n.language);
    setWidth(window.innerWidth);
    // google analytics
    Router.events.on('routeChangeComplete', handleRouteChange);
    // windows resize
    window.addEventListener('resize', debouncedSetup, detectIt.passiveEvents ? { passive: true } : false);
    return () => {
      // google analytics
      Router.events.off('routeChangeComplete', handleRouteChange);
      // windows resize
      window.removeEventListener('resize', () => debouncedSetup);
    };
  }, []);

  // @todo uncomment
  const createCartForUser = () => {
    const { dispatch, getState } = reduxStore;
    const { user } = getState().users;
    if ((user && user.email && !user.cart) || (!user && !localStorage.getItem('cart'))) {
      dispatch(actions.thunkCreateCart());
    }
  };
  useEffect(() => {
    createCartForUser();
  }, [reduxStore.getState().users]);

  Router.events.on('routeChangeComplete', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  if (!Component) return null;
  return (
    <Provider store={reduxStore}>
      <Head>
        <meta key="robots" name="robots" content="noimageindex" />
        <meta key="theme-color" name="theme-color" content="#000000" />
        <meta key="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="When I Grow Up" />
        <meta key="apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes" />
        <meta
          key="apple-mobile-web-app-status-bar-style"
          name="apple-mobile-web-app-status-bar-style"
          content="white"
        />
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
        <meta
          key="msapplication-TileImage"
          name="msapplication-TileImage"
          content="/static/images/icons/icon-144x144.png"
        />
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
      </Head>
      <Pixel />
      {!!width && Component && <Component isMobile={width < 768} {...pageProps} />}
      <style jsx global>{`
        body {
          @apply font-poppins text-dark-grey;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }

        ::selection {
          @apply bg-brand text-white;
        }

        .u-container {
          padding-left: 16px;
          padding-right: 16px;
          @screen md {
            @apply mx-auto w-11/12;
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

        .icon-gift:before {
          content: '\e99f';
        }
        .icon-ico_book:before {
          content: '\e914';
        }
        .icon-ico_premium_account:before {
          content: '\e915';
        }
        .icon-ico_verified:before {
          content: '\e916';
        }
        .icon-whatsapp:before {
          content: '\ea93';
        }
        .icon-duplicate:before {
          content: '\e913';
        }
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

const redirectPrivateRoutes = ({ pathname, res }: { pathname: string; res: NextApiResponse }) => {
  const privateRoutes = ['/orders/success', '/account', '/orders'];
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

const redirectLoginRoutes = ({ pathname, res }: { pathname: string; res: NextApiResponse }) => {
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

WiguApp.getInitialProps = async (appContext: any) => {
  const { ctx } = appContext;
  const reduxStore = getOrCreateStore();
  ctx.reduxStore = reduxStore;
  const { dispatch, getState } = reduxStore;

  if (cookies(ctx).user) {
    if (!getState().users?.user) {
      try {
        const { data: me } = await api(ctx.req).users.getMe();
        dispatch(actions.setLogin(true));
        dispatch(actions.loadUser(false, me));
      } catch {
        dispatch(actions.setExpired(true));
      }
    }
    redirectLoginRoutes(ctx);
  } else {
    dispatch(actions.setLogin(false));
    redirectPrivateRoutes(ctx);
  }

  if (getState().default?.errorMessage) {
    dispatch(actions.setErrorMessage(''));
  }

  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, pageProps: appProps.pageProps || {}, initialReduxState: reduxStore.getState() };
};

export default appWithTranslation(withReduxStore(WiguApp));
