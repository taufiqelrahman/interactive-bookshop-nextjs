import { NextPage } from 'next';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { initializeStore } from '../store';
import actions from '../store/actions';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState?) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export type Store = ReturnType<typeof getOrCreateStore>;

type Props = { reduxStore: Store };

const withReduxStore = (App: NextPage<any>) => {
  return class Redux extends Component<Props> {
    private reduxStore;

    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore();

      // inject reduxStore to context
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        pageProps: (appProps as any).pageProps || {},
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;
export const mapStateToProps = (state) => ({ state });
export const mapDispatchToProps = (dispatch) => ({ ...bindActionCreators(actions, dispatch) });
// export type Dispatchable<P> = P & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>
