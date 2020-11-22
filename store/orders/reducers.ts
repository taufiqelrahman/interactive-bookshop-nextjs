import * as types from './types';

const initialState: types.OrdersState = {
  isFetching: false,
  orders: [],
  currentOrder: null,
  paymentProblem: false,
};

const reducer = (state = initialState, action: types.OrdersActionTypes): types.OrdersState => {
  switch (action.type) {
    case types.LOAD_ORDER: {
      return {
        ...state,
        currentOrder: action.payload,
        isFetching: action.isFetching,
      };
    }
    case types.LOAD_ORDERS: {
      return {
        ...state,
        orders: action.payload,
        isFetching: action.isFetching,
      };
    }
    case types.SET_PAYMENT_PROBLEM: {
      return {
        ...state,
        paymentProblem: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
