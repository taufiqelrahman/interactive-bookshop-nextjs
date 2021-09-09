import { captureException } from '@sentry/core';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as types from './types';
import { setErrorMessage } from '../actions';
import api from '../../services/api';

export function loadTestimonials(isFetching: boolean, testimonials = []): types.MasterActionTypes {
  return {
    type: types.LOAD_TESTIMONIALS,
    payload: testimonials,
    isFetching,
  };
}
export const thunkLoadTestimonials = (): ThunkAction<void, types.MasterState, null, Action<string>> => dispatch => {
  dispatch(loadTestimonials(true));
  return api()
    .master.getTestimonials()
    .then(({ data }) => {
      dispatch(loadTestimonials(false, data.data));
    })
    .catch(err => {
      dispatch(loadTestimonials(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

export function loadOccupations(isFetching: boolean, occupations = []): types.MasterActionTypes {
  return {
    type: types.LOAD_OCCUPATIONS,
    payload: occupations,
    isFetching,
  };
}
export const thunkLoadOccupations = (): ThunkAction<void, types.MasterState, null, Action<string>> => dispatch => {
  dispatch(loadOccupations(true));
  return api()
    .master.getOccupations()
    .then(({ data }) => {
      dispatch(loadOccupations(false, data.data));
    })
    .catch(err => {
      dispatch(loadOccupations(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

export function loadBookPages(isFetching: boolean, bookPages = []): types.MasterActionTypes {
  return {
    type: types.LOAD_BOOK_PAGES,
    payload: bookPages,
    isFetching,
  };
}
// export const thunkLoadBookPages = (): ThunkAction<void, types.MasterState, null, Action<string>> => (dispatch) => {
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

export function loadProvinces(isFetching: boolean, provinces = []): types.MasterActionTypes {
  return {
    type: types.LOAD_PROVINCES,
    payload: provinces,
    isFetching,
  };
}
export const thunkLoadProvinces = (): ThunkAction<void, types.MasterState, null, Action<string>> => dispatch => {
  dispatch(loadProvinces(true));
  return api()
    .master.getProvinces()
    .then(({ data }) => {
      dispatch(loadProvinces(false, data.data));
    })
    .catch(err => {
      dispatch(loadProvinces(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};
