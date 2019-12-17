import * as types from './types';

const initialState: types.ProductsState = {
  isFetching: false,
  products: [],
  currentProduct: null,
};

const reducer = (state = initialState, action: types.ProductsActionTypes): types.ProductsState => {
  switch (action.type) {
    case types.LOAD_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};
export default reducer;
