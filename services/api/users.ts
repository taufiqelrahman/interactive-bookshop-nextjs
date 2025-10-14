import { User } from 'store/users/types';
import { AdapterObject } from './index';
import { CART } from './__mocks__/cart';

export default class Products {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter) {
    this.adapter = adapter;
  }

  register(data): Promise<void> {
    // return this.adapter.default.post('/register', data);
    console.log({ data });
    return Promise.resolve();
  }

  checkEmail(data): Promise<{ data: { exists: boolean } }> {
    // return this.adapter.default.post('/check-email', data);
    return Promise.resolve({ data: { exists: data.email === 'existing@example.com' } });
  }

  checkEmailChange(data): Promise<{ data: { exists: boolean } }> {
    // return this.adapter.secure.post('/check-email-change', data);
    return Promise.resolve({ data: { exists: data.email === 'existing@example.com' } });
  }

  login(data): Promise<{ data: { token: string; user: User } }> {
    // return this.adapter.default.post('/login', data);
    return Promise.resolve({
      data: {
        token: 'mock-token',
        user: {
          name: 'Mock User',
          email: data.email,
          cart: {
            ...CART,
            id: 'chk_login_123',
            checkout_id: 'chk_login_123',
          },
        } as User,
      },
    });
  }

  logout(): Promise<{ data: { success: boolean } }> {
    // return this.adapter.secure.get('/logout');
    return Promise.resolve({ data: { success: true } });
  }

  forgotPassword(data): Promise<void> {
    // return this.adapter.default.post('/forgot-password', data);
    console.log({ data });
    return Promise.resolve();
  }

  resetPassword(data): Promise<void> {
    // return this.adapter.default.post('/reset-password', data);
    console.log({ data });
    return Promise.resolve();
  }

  getMe(): Promise<{ data: User }> {
    // return this.adapter.secure.get('/me');
    return Promise.resolve({
      data: {
        name: 'Mock User',
        email: 'mockuser@example.com',
        cart: {
          ...CART,
          id: 'chk_123',
          checkout_id: 'chk_123',
        },
      } as User,
    });
  }

  updateMe(data): Promise<{ data: { user: User; updated: string | true } }> {
    // return this.adapter.secure.post('/me', data);
    return Promise.resolve({ data: { ...data, updated: true } });
  }

  sendOtp(): Promise<void> {
    // return this.adapter.secure.post('/send-otp');
    return Promise.resolve();
  }

  loginFacebook(data): Promise<{ data: { token: string; user: User } }> {
    // return this.adapter.default.post('/login-facebook', data);
    return Promise.resolve({
      data: {
        token: 'mock-fb-token',
        user: { id: 2, email: data.email || 'fbuser@example.com', name: 'FB User' } as unknown as User,
      },
    });
  }

  loginGoogle(data): Promise<{ data: { token: string; user: User } }> {
    // return this.adapter.default.post('/login-google', data);
    return Promise.resolve({
      data: {
        token: 'mock-google-token',
        user: { id: 3, email: data.email || 'googleuser@example.com', name: 'Google User' } as unknown as User,
      },
    });
  }
}
