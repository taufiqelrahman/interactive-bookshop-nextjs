import * as types from './types';

const initialState: types.CartState = {
  isFetching: false,
  cart: null,
  selected: null,
};

const reducer = (state = initialState, action: types.CartActionTypes): types.CartState => {
  switch (action.type) {
    // case types.ADD_DISCOUNT:
    // case types.REMOVE_DISCOUNT:
    case types.LOAD_CART:
    case types.ADD_TO_CART:
    case types.TRANSFER_CART:
    case types.UPDATE_CART:
    case types.REMOVE_FROM_CART:
    case types.UPDATE_ATTRIBUTES:
      return {
        ...state,
        isFetching: action.isFetching,
        cart: action.payload,
      };
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
