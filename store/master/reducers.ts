import * as types from './types';

const initState: types.MasterState = {
  isFetching: false,
  testimonials: [],
  occupations: [],
};

const reducer = (state: types.MasterState = initState, action: types.MasterActionTypes): any => {
  switch (action.type) {
    case types.LOAD_TESTIMONIALS: {
      return {
        ...state,
        testimonials: action.payload,
        isFetching: action.isFetching,
      };
    }
    case types.LOAD_OCCUPATIONS: {
      return {
        ...state,
        occupations: action.payload,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};
export default reducer;
