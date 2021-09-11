import * as types from './types';

const initState: types.MasterState = {
  isFetching: false,
  testimonials: [],
  occupations: [],
  bookPages: [],
  provinces: [],
};

const reducer = (state: types.MasterState = initState, action: types.MasterActionTypes): types.MasterState => {
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
    case types.LOAD_BOOK_PAGES: {
      return {
        ...state,
        bookPages: action.payload,
        isFetching: action.isFetching,
      };
    }
    case types.LOAD_PROVINCES: {
      return {
        ...state,
        provinces: action.payload,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};
export default reducer;
