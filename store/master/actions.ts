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
      dispatch(loadTestimonials(false, data));
    })
    .catch(err => {
      throw err;
      dispatch(loadTestimonials(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};
