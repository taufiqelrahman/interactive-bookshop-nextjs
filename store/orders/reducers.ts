import * as types from './types';

const initialState: types.OrdersState = {
  isFetching: false,
  orders: [],
  currentOrder: null,
};

const reducer = (state = initialState, action: types.OrdersActionTypes): types.OrdersState => {
  switch (action.type) {
    case types.CHECKOUT: {
      return {
        ...state,
        currentOrder: action.payload,
        isFetching: action.isFetching,
      };
    }
    case types.LOAD_ORDER: {
      return {
        ...state,
        currentOrder: action.payload,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};
export default reducer;
