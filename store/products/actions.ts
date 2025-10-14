import { captureException } from '@sentry/browser';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../../services/api';

import { loadProducts, showProduct } from './reducers';
import * as types from './types';

export const thunkLoadProducts =
  (): ThunkAction<void, types.ProductsState, null, Action<string>> =>
  (dispatch): any => {
    dispatch(loadProducts({ isFetching: true, payload: [] }));
    return api()
      .products.get()
      .then(({ data }) => {
        dispatch(loadProducts({ isFetching: false, payload: data.data }));
      })
      .catch((err) => {
        dispatch(loadProducts({ isFetching: false, payload: null }));
        captureException(err);
        throw err;
      });
  };

export const thunkShowProduct =
  (slug, req = null): ThunkAction<void, types.ProductsState, null, Action<string>> =>
  (dispatch): any => {
    dispatch(showProduct({ isFetching: true, payload: null }));
    return api(req)
      .products.show(slug)
      .then(({ data }) => {
        dispatch(showProduct({ isFetching: false, payload: data.data }));
      })
      .catch((err) => {
        dispatch(showProduct({ isFetching: false, payload: null }));
        captureException(err);
        throw err;
      });
  };
