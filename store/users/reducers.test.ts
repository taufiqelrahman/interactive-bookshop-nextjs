import reducer, {
  loadUser,
  setLogin,
  setExpired,
  login,
  loginFacebook,
  loginGoogle,
  logout,
  forgotPassword,
  register,
  resetPassword,
  sendOtp,
} from './reducers';
import * as types from './types';

describe('store/users/reducers', () => {
  const initialState: types.UsersState = {
    isFetching: false,
    isLoggedIn: false,
    isExpired: false,
    user: null,
  };

  const mockUser: types.User = {
    email: 'test@example.com',
    name: 'Test User',
    cart: {} as any,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('loadUser', () => {
    it('should load user data', () => {
      const action = loadUser({ isFetching: false, payload: mockUser });
      const state = reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching to true', () => {
      const action = loadUser({ isFetching: true, payload: null });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });

    it('should keep existing user if payload is null', () => {
      const stateWithUser = { ...initialState, user: mockUser };
      const action = loadUser({ isFetching: false, payload: null });
      const state = reducer(stateWithUser, action);
      expect(state.user).toEqual(mockUser);
    });

    it('should keep existing user if payload is undefined', () => {
      const stateWithUser = { ...initialState, user: mockUser };
      const action = loadUser({ isFetching: false, payload: undefined });
      const state = reducer(stateWithUser, action);
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('setLogin', () => {
    it('should set login to true', () => {
      const action = setLogin(true);
      const state = reducer(initialState, action);
      expect(state.isLoggedIn).toBe(true);
    });

    it('should set login to false', () => {
      const stateLoggedIn = { ...initialState, isLoggedIn: true };
      const action = setLogin(false);
      const state = reducer(stateLoggedIn, action);
      expect(state.isLoggedIn).toBe(false);
    });
  });

  describe('setExpired', () => {
    it('should set expired to true', () => {
      const action = setExpired(true);
      const state = reducer(initialState, action);
      expect(state.isExpired).toBe(true);
    });

    it('should set expired to false', () => {
      const stateExpired = { ...initialState, isExpired: true };
      const action = setExpired(false);
      const state = reducer(stateExpired, action);
      expect(state.isExpired).toBe(false);
    });
  });

  describe('login', () => {
    it('should login successfully', () => {
      const action = login({ isFetching: false, payload: true });
      const state = reducer(initialState, action);
      expect(state.isLoggedIn).toBe(true);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching during login', () => {
      const action = login({ isFetching: true, payload: undefined });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
      expect(state.isLoggedIn).toBe(false);
    });

    it('should handle login failure', () => {
      const action = login({ isFetching: false, payload: false });
      const state = reducer(initialState, action);
      expect(state.isLoggedIn).toBe(false);
    });
  });

  describe('loginFacebook', () => {
    it('should login with Facebook successfully', () => {
      const action = loginFacebook({ isFetching: false, payload: true });
      const state = reducer(initialState, action);
      expect(state.isLoggedIn).toBe(true);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching during Facebook login', () => {
      const action = loginFacebook({ isFetching: true, payload: undefined });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });
  });

  describe('loginGoogle', () => {
    it('should login with Google successfully', () => {
      const action = loginGoogle({ isFetching: false, payload: true });
      const state = reducer(initialState, action);
      expect(state.isLoggedIn).toBe(true);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching during Google login', () => {
      const action = loginGoogle({ isFetching: true, payload: undefined });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });
  });

  describe('logout', () => {
    it('should logout successfully', () => {
      const stateLoggedIn = { ...initialState, isLoggedIn: true };
      const action = logout({ isFetching: false, payload: false });
      const state = reducer(stateLoggedIn, action);
      expect(state.isLoggedIn).toBe(false);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching during logout', () => {
      const action = logout({ isFetching: true, payload: undefined });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });
  });

  describe('forgotPassword', () => {
    it('should set isFetching during forgot password', () => {
      const action = forgotPassword({ isFetching: true });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });

    it('should complete forgot password request', () => {
      const action = forgotPassword({ isFetching: false });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(false);
    });
  });

  describe('register', () => {
    it('should set isFetching during registration', () => {
      const action = register({ isFetching: true });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });

    it('should complete registration', () => {
      const action = register({ isFetching: false });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(false);
    });
  });

  describe('resetPassword', () => {
    it('should set isFetching during password reset', () => {
      const action = resetPassword({ isFetching: true });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });

    it('should complete password reset', () => {
      const action = resetPassword({ isFetching: false });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(false);
    });
  });

  describe('sendOtp', () => {
    it('should set isFetching during OTP send', () => {
      const action = sendOtp({ isFetching: true });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });

    it('should complete OTP send', () => {
      const action = sendOtp({ isFetching: false });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(false);
    });
  });

  describe('state immutability', () => {
    it('should not mutate original state', () => {
      const state = { ...initialState };
      const action = loadUser({ isFetching: true, payload: mockUser });
      reducer(state, action);
      expect(state).toEqual(initialState);
    });
  });
});
