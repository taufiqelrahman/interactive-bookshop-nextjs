import { AdapterObject } from './index';

export default class Products {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter) {
    this.adapter = adapter;
  }

  register(data) {
    // return this.adapter.default.post('/register', data);
    return Promise.resolve({
      data: {
        id: 1,
        email: data.email,
        name: data.name || 'Mock User',
        registered: true,
      },
    });
  }

  checkEmail(data) {
    // return this.adapter.default.post('/check-email', data);
    return Promise.resolve({ data: { exists: data.email === 'existing@example.com' } });
  }

  checkEmailChange(data) {
    // return this.adapter.secure.post('/check-email-change', data);
    return Promise.resolve({ data: { exists: data.email === 'existing@example.com' } });
  }

  login(data) {
    // return this.adapter.default.post('/login', data);
    return Promise.resolve({
      data: {
        token: 'mock-token',
        user: { id: 1, email: data.email, name: 'Mock User' },
      },
    });
  }

  logout() {
    // return this.adapter.secure.get('/logout');
    return Promise.resolve({ data: { success: true } });
  }

  forgotPassword(data) {
    // return this.adapter.default.post('/forgot-password', data);
    return Promise.resolve({ data: { email: data.email, resetSent: true } });
  }

  resetPassword(data) {
    // return this.adapter.default.post('/reset-password', data);
    return Promise.resolve({ data: { reset: true } });
  }

  getMe() {
    // return this.adapter.secure.get('/me');
    return Promise.resolve({
      data: {
        id: 1,
        email: 'mockuser@example.com',
        name: 'Mock User',
        isLoggedIn: true,
        cart: {
          checkout_id: 'chk_123',
        },
      },
    });
  }

  updateMe(data) {
    // return this.adapter.secure.post('/me', data);
    return Promise.resolve({ data: { ...data, updated: true } });
  }

  sendOtp() {
    // return this.adapter.secure.post('/send-otp');
    return Promise.resolve({ data: { otpSent: true } });
  }

  loginFacebook(data) {
    // return this.adapter.default.post('/login-facebook', data);
    return Promise.resolve({
      data: {
        token: 'mock-fb-token',
        user: { id: 2, email: data.email || 'fbuser@example.com', name: 'FB User' },
      },
    });
  }

  loginGoogle(data) {
    // return this.adapter.default.post('/login-google', data);
    return Promise.resolve({
      data: {
        token: 'mock-google-token',
        user: { id: 3, email: data.email || 'googleuser@example.com', name: 'Google User' },
      },
    });
  }
}
