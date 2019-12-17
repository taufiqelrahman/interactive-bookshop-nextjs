import * as types from './types';

const initState: types.State = {};

const reducer = (state: types.State = initState, action: types.ActionTypes): any => {
  switch (action.type) {
    default:
      return state;
  }
};
export default reducer;
