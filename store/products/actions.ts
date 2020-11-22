import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from '../../services/api';

function loadProducts(isFetching, products = null): types.ProductsActionTypes {
  return {
    type: types.LOAD_PRODUCTS,
    payload: products,
    isFetching,
  };
}
export const thunkLoadProducts = (): ThunkAction<void, types.ProductsState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(loadProducts(true));
  return api()
    .products.get()
    .then(({ data }) => {
      dispatch(loadProducts(false, data.data));
    })
    .catch(err => {
      dispatch(loadProducts(false));
      captureException(err);
      throw err;
    });
};

function showProduct(isFetching, currentProduct = null): types.ProductsActionTypes {
  return {
    type: types.SHOW_PRODUCT,
    payload: currentProduct,
    isFetching,
  };
}
export const thunkShowProduct = (slug, req = null): ThunkAction<void, types.ProductsState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(showProduct(true));
  return api(req)
    .products.show(slug)
    .then(({ data }) => {
      dispatch(showProduct(false, data.data));
    })
    .catch(err => {
      dispatch(showProduct(false));
      captureException(err);
      throw err;
    });
};
