import { captureException } from '@sentry/core';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../../services/api';
import { setErrorMessage } from '../actions';

import { loadOccupations, loadProvinces, loadTestimonials } from './reducers';
import * as types from './types';

export const thunkLoadTestimonials =
  (): ThunkAction<void, types.MasterState, null, Action<string>> =>
  (dispatch): any => {
    dispatch(loadTestimonials({ isFetching: true, data: [] }));
    return api()
      .master.getTestimonials()
      .then(({ data }) => {
        dispatch(loadTestimonials({ isFetching: false, data: data.data }));
      })
      .catch((err) => {
        dispatch(loadTestimonials({ isFetching: false, data: [] }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

export const thunkLoadOccupations =
  (): ThunkAction<void, types.MasterState, null, Action<string>> =>
  (dispatch): any => {
    dispatch(loadOccupations({ isFetching: true, data: [] }));
    return api()
      .master.getOccupations()
      .then(({ data }) => {
        dispatch(loadOccupations({ isFetching: false, data: data.data }));
      })
      .catch((err) => {
        dispatch(loadOccupations({ isFetching: false, data: [] }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

// export const thunkLoadBookPages = (): ThunkAction<void, types.MasterState, null, Action<string>> => (dispatch): any => {
//   dispatch(loadBookPages(true));
//   return api()
//     .master.getBookPages()
//     .then(({ data }) => {
//       dispatch(loadBookPages(false, data.data));
//     })
//     .catch(err => {
//       dispatch(loadBookPages(false));
//       dispatch(setErrorMessage(err.message));
//       captureException(err);
//     });
// };

export const thunkLoadProvinces =
  (): ThunkAction<void, types.MasterState, null, Action<string>> =>
  (dispatch): any => {
    dispatch(loadProvinces({ isFetching: true, data: [] }));
    return api()
      .master.getProvinces()
      .then(({ data }) => {
        dispatch(loadProvinces({ isFetching: false, data: data.data }));
      })
      .catch((err) => {
        dispatch(loadProvinces({ isFetching: false, data: [] }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };
