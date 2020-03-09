import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import Cart from './cart';
import Orders from './orders';
import Products from './products';
import Users from './users';
import Master from './master';

export interface AdapterObject {
  default: AxiosInstance,
  secure: AxiosInstance,
}

const options = {
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}
const createAdapter = (): AxiosAdapter => {
  return axios.create(options);
}
const decryptToken = (cryptedToken) => {
  const bytes  = CryptoJS.AES.decrypt(cryptedToken, process.env.SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const createSecureAdapter = (req = null): AxiosAdapter => {
  let cryptedToken;
  // if (req) {
  //   const userCookie = req.headers.cookie.split(';').filter(cookie => cookie.includes('user='));
  //   cryptedToken = userCookie[0].split('=')[1];
  // } else {
    cryptedToken = Cookies.get('user');
  // }
  const token = cryptedToken ? decryptToken(cryptedToken) : '';
  const secureOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
  return axios.create(secureOptions);
}

export default (req = null) => {
  const instance = createAdapter();
  const secure = createSecureAdapter(req);
  const adapter = {
    default: instance,
    secure: secure,
  }
  return {
    cart: new Cart(adapter),
    orders: new Orders(adapter),
    products: new Products(adapter),
    users: new Users(adapter),
    master: new Master(adapter),
  }
};
