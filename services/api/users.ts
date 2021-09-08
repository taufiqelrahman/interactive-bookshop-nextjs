import { AdapterObject } from './index';

export default class Products {
  adapter: AdapterObject;
  // basePath: string;

  constructor(adapter: AdapterObject) {
    this.adapter = adapter;
  }

  register(data: any) {
    return this.adapter.default.post('/register', data);
  }

  checkEmail(data: any) {
    return this.adapter.default.post('/check-email', data);
  }

  checkEmailChange(data: any) {
    return this.adapter.secure.post('/check-email-change', data);
  }

  login(data: any) {
    return this.adapter.default.post('/login', data);
  }

  logout() {
    return this.adapter.secure.get('/logout');
  }

  forgotPassword(data: any) {
    return this.adapter.default.post('/forgot-password', data);
  }

  resetPassword(data: any) {
    return this.adapter.default.post('/reset-password', data);
  }

  getMe() {
    return this.adapter.secure.get('/me');
  }

  updateMe(data: any) {
    return this.adapter.secure.post('/me', data);
  }

  sendOtp() {
    return this.adapter.secure.post('/send-otp');
  }

  loginFacebook(data: any) {
    return this.adapter.default.post('/login-facebook', data);
  }

  loginGoogle(data: any) {
    return this.adapter.default.post('/login-google', data);
  }
}
