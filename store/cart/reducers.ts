import * as types from './types';

const initialState: types.CartState = {
  isFetching: false,
  cart: null,
};

const reducer = (state = initialState, action: types.CartActionTypes): types.CartState => {
  switch (action.type) {
    case types.LOAD_CART: {
      return {
        ...state,
        isFetching: action.isFetching,
        cart: action.payload,
      };
    }
    case types.ADD_TO_CART: {
      return {
        ...state,
        isFetching: action.isFetching,
        cart: action.payload,
      };
    }
    case types.REMOVE_FROM_CART: {
      return {
        ...state,
        isFetching: action.isFetching,
        cart: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
