import * as types from './types';

const initState: types.UsersState = {
  isFetching: false,
  isLoggedIn: false,
  user: null,
};

const reducer = (state: types.UsersState = initState, action: types.UsersActionTypes): any => {
  switch (action.type) {
    case types.LOAD_USER: {
      return {
        ...state,
        user: action.payload,
        isFetching: action.isFetching,
      };
    }
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
    case types.FORGOT_PASSWORD: {
      return {
        ...state,
        isFetching: action,
      };
    }
    case types.REGISTER: {
      return {
        ...state,
        isFetching: action,
      };
    }
    case types.RESET_PASSWORD: {
      return {
        ...state,
        isFetching: action,
      };
    }
    default:
      return state;
  }
};
export default reducer;
