import * as types from './types';

const initState: types.State = {
  isSideNavOpen: false,
  errorMessage: '',
};

const reducer = (state: types.State = initState, action: types.ActionTypes): any => {
  switch (action.type) {
    case types.SET_SIDE_NAV: {
      return {
        ...state,
        isSideNavOpen: action.payload,
      };
    }
    case types.SET_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
