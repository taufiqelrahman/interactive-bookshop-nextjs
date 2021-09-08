import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import Cart from './cart';
import Orders from './orders';
import Products from './products';
import Users from './users';
import Master from './master';
import Message from './message';
import { decryptTokenClient, decryptTokenServer } from 'lib/crypto';
import { NextApiRequest } from 'next';

export interface AdapterObject {
  default: AxiosInstance,
  secure: AxiosInstance,
}

const options = {
  baseURL: `${process.env.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
}
const createAdapter = (): AxiosAdapter => {
  return axios.create(options);
}

const createSecureAdapter = (req?: NextApiRequest): AxiosAdapter => {
  let token;
  if (req) {
    // if server-side
    const userCookie = (req as any).headers.cookie.split(';').filter((cookie: string) => cookie.includes('user='));
    const cryptedToken = userCookie[0] && userCookie[0].split('=')[1];
    token = !!cryptedToken ? decryptTokenServer(cryptedToken) : '';
  } else {
    // if client-side
    const cryptedToken = Cookies.get('user');
    token = !!cryptedToken ? decryptTokenClient(cryptedToken) : '';
  }
  const secureOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
  return axios.create(secureOptions);
}

const apiService = (req?: NextApiRequest) => {
  const instance = createAdapter();
  const secure = createSecureAdapter(req);
  const adapter = {
    default: instance,
    secure: secure,
  } as AdapterObject
  return {
    cart: new Cart(adapter),
    orders: new Orders(adapter),
    products: new Products(adapter),
    users: new Users(adapter),
    master: new Master(adapter),
    message: new Message(adapter),
  }
};

export default apiService;
