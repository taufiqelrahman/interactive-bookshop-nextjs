import { NextPage, NextPageContext } from 'next';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { initializeStore } from '../store';
import actions from '../store/actions';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

export function getOrCreateStore(initialState?: any) {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return (window as any)[__NEXT_REDUX_STORE__];
}

export interface NextPageContextWithStore extends NextPageContext {
  reduxStore: ReturnType<typeof getOrCreateStore>;
}

type WithReduxProps = {
  reduxStore: ReturnType<typeof getOrCreateStore>;
  initialReduxState?: any;
};

const withReduxStore = (AppComponent: NextPage<any>) => {
  return class ReduxWrapper extends Component<WithReduxProps> {
    reduxStore: ReturnType<typeof getOrCreateStore>;

    static async getInitialProps(appContext: any) {
      const reduxStore = getOrCreateStore();

      // inject reduxStore to context
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof AppComponent.getInitialProps === 'function') {
        appProps = await AppComponent.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props: WithReduxProps) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <AppComponent {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;
export const mapStateToProps = (state) => ({ state });
export const mapDispatchToProps = (dispatch) => ({ ...bindActionCreators(actions, dispatch) });
// export type Dispatchable<P> = P & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>
