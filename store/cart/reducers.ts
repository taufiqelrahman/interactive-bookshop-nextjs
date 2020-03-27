import * as types from './types';

const initialState: types.CartState = {
  isFetching: false,
  cart: null,
  selected: null,
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
    case types.UPDATE_CART: {
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
    case types.SAVE_SELECTED: {
      return {
        ...state,
        selected: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
