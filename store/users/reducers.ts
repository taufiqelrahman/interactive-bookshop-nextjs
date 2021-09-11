import * as types from './types';

const initState: types.UsersState = {
  isFetching: false,
  isLoggedIn: false,
  isExpired: false,
  user: null,
};

const reducer = (state = initState, action: types.UsersActionTypes): types.UsersState => {
  switch (action.type) {
    case types.LOAD_USER:
    case types.UPDATE_USER:
      return {
        ...state,
        user: action.payload || state.user,
        isFetching: action.isFetching,
      };
    case types.SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case types.SET_EXPIRED:
      return {
        ...state,
        isExpired: action.payload,
      };
    case types.LOGIN:
    case types.LOGIN_FACEBOOK:
    case types.LOGIN_GOOGLE:
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: action.payload,
        isFetching: action.isFetching,
      };
    case types.FORGOT_PASSWORD:
    case types.REGISTER:
    case types.RESET_PASSWORD:
    case types.SEND_OTP:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};
export default reducer;
