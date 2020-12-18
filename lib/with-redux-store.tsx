import React from 'react';

import { initializeStore } from '../store';
import actions from '../store/actions';
import { bindActionCreators } from 'redux';
import { NextPage } from 'next';
import { connect, ConnectedProps } from 'react-redux';
import { AppContext } from 'next/app';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState?: any) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Store in global variable if client
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return (window as any)[__NEXT_REDUX_STORE__];
}

export type Store = ReturnType<typeof getOrCreateStore>;

type Props = { reduxStore: Store };

const withReduxStore = (Component: NextPage<any>) => {
  return class Redux extends React.Component<Props> {
    private reduxStore;

    static async getInitialProps(appContext: AppContext) {
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      (appContext.ctx as any).reduxStore = reduxStore;

      let appProps = {};
      if ((Component as any).getInitialProps) {
        appProps = await (Component as any).getInitialProps(appContext);
      }

      return {
        ...appProps,
        pageProps: (appProps as any).pageProps || {},
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props: any) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <Component {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;
export const mapStateToProps = (state: any) => ({ state });
export const mapDispatchToProps = (dispatch: any) => ({ ...bindActionCreators(actions, dispatch) });
// export type Dispatchable<P> = P & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

export const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
