import * as types from './types';

const initState: types.UsersState = {
  isFetching: false,
  isLoggedIn: false,
};

const reducer = (state: types.UsersState = initState, action: types.UsersActionTypes): any => {
  switch (action.type) {
    case types.SET_LOGIN: {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }
    case types.LOGIN: {
      return {
        ...state,
        isLoggedIn: action.payload,
        isFetching: action.isFetching,
      };
    }
    case types.LOGOUT: {
      return {
        ...state,
        isLoggedIn: action.payload,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};
export default reducer;
