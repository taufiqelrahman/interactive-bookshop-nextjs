import { AdapterObject } from './index';

export default class Products {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter) {
    this.adapter = adapter;
  }

  register(data) {
    return this.adapter.default.post('/register', data);
  }

  checkEmail(data) {
    return this.adapter.default.post('/check-email', data);
  }

  login(data) {
    return this.adapter.default.post('/login', data);
  }

  logout() {
    return this.adapter.secure.get('/logout');
  }

  forgotPassword(data) {
    return this.adapter.default.post('/forgot-password', data);
  }

  resetPassword(data) {
    return this.adapter.default.post('/reset-password', data);
  }

  getMe() {
    return this.adapter.secure.get('/me');
  }
}
