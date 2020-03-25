import cookies from 'next-cookies';
import actions from 'store/actions';

export const checkUser = ctx => {
  const { dispatch, getState } = ctx.reduxStore;
  if (cookies(ctx).user) {
    dispatch(actions.setLogin(true));
    if (!getState().users.user) dispatch(actions.thunkLoadUser(ctx.req));
  } else {
    dispatch(actions.setLogin(false));
  }
};

export default { checkUser };
