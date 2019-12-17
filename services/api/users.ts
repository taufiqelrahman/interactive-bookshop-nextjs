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

  login(data) {
    return this.adapter.default.post('/login', data);
  }

  logout() {
    return this.adapter.secure.get('/logout');
  }
}
