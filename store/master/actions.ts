import { captureException } from '@sentry/core';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as types from './types';
import { setErrorMessage } from '../actions';
import api from '../../services/api';

function loadTestimonials(isFetching, testimonials = []): types.MasterActionTypes {
  return {
    type: types.LOAD_TESTIMONIALS,
    payload: testimonials,
    isFetching,
  };
}
export const thunkLoadTestimonials = (): ThunkAction<void, types.MasterState, null, Action<string>> => (
  dispatch,
): any => {
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

function loadOccupations(isFetching, occupations = []): types.MasterActionTypes {
  return {
    type: types.LOAD_OCCUPATIONS,
    payload: occupations,
    isFetching,
  };
}
export const thunkLoadOccupations = (): ThunkAction<void, types.MasterState, null, Action<string>> => (
  dispatch,
): any => {
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
