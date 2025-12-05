import axios, { AxiosInstance } from 'axios';
import { getSecureCookie } from 'lib/secure-cookies';
import Cart from './cart';
import Orders from './orders';
import Products from './products';
import Users from './users';
import Master from './master';
import Message from './message';

// AdapterObject defines the structure for API adapters (default and secure)
export interface AdapterObject {
  default: AxiosInstance;
  secure: AxiosInstance;
}

// Base configuration for axios requests
const axiosBaseConfig = {
  baseURL: `${process.env.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create a default axios instance (no auth)
const createDefaultAdapter = (): AxiosInstance => {
  return axios.create(axiosBaseConfig);
};

// Create a secure axios instance (with auth token from cookie)
const createSecureAdapter = (req?: any): AxiosInstance => {
  let userToken: string | undefined;

  if (req && req.headers && req.headers.cookie) {
    // Server-side: extract 'user' token from cookies in request headers
    const cookies = req.headers.cookie.split(';').map((cookie: string) => cookie.trim());
    const userCookie = cookies.find((cookie: string) => cookie.startsWith('user='));
    userToken = userCookie ? userCookie.split('=')[1] : undefined;
  } else {
    // Client-side: get 'user' token from browser cookies
    userToken = getSecureCookie('user');
  }

  // Merge base config with Authorization header
  const secureConfig = {
    ...axiosBaseConfig,
    headers: {
      ...axiosBaseConfig.headers,
      Authorization: userToken ? `Bearer ${userToken}` : '',
    },
  };
  return axios.create(secureConfig);
};

// Factory function to create API service instances for each resource
// Optionally accepts a request object for SSR/Node
const apiService = (req?: any) => {
  // Create adapters for default and secure requests
  const defaultAdapter = createDefaultAdapter();
  const secureAdapter = createSecureAdapter(req);
  const adapters: AdapterObject = {
    default: defaultAdapter,
    secure: secureAdapter,
  };

  // Return service instances for each resource
  return {
    cart: new Cart(adapters),
    orders: new Orders(adapters),
    products: new Products(adapters),
    users: new Users(adapters),
    master: new Master(adapters),
    message: new Message(adapters),
  };
};

export default apiService;
