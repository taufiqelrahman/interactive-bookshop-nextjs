// import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import Client from 'shopify-buy';

// import Cookies from 'js-cookie';
// import CryptoJS from 'crypto-js';
import Cart from './cart';
// import Orders from './orders';
// import Products from './products';
// import Users from './users';

// const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
// });

// export interface AdapterObject {
//   default: ApolloClient<any>;
//   admin: ApolloClient<any>;
// }

// const options = {
//   baseURL: process.env.API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// }

function adapterGenerator(uri, token): ApolloClient<any> {
  // const httpLink = createHttpLink({ uri });
  // const middlewareLink = setContext(() => ({
  //   headers: {
  //     [headerName]: token,
  //     Accept: 'application/json',
  //   },
  // }));

  // return new ApolloClient({
  //   link: middlewareLink.concat(httpLink),
  //   cache: new InMemoryCache(),
  // });

  return Client.buildClient({
    domain: uri,
    storefrontAccessToken: token,
  });
}

const createAdapter = (): ApolloClient<any> => {
  return adapterGenerator(
    process.env.SHOPIFY_URL,
    // 'X-Shopify-Storefront-Access-Token',
    process.env.STOREFRONT_API_KEY,
  );
};

// const createAdminAdapter = (): ApolloClient<any> => {
//   return adapterGenerator(
//     'https://elrahman.myshopify.com/admin/api/2019-10/graphql.json',
//     'X-Shopify-Access-Token',
//     '944c15a82bd703a3483a6ba91ea6c6e4',
//   );
// };

// const decryptToken = (cryptedToken) => {
//   const bytes  = CryptoJS.AES.decrypt(cryptedToken, process.env.SECRET_KEY);
//   return bytes.toString(CryptoJS.enc.Utf8);
// }

export default (): any => {
  // const adapter = {
  //   default: createAdapter(),
  //   admin: createAdminAdapter(),
  // };
  const adapter = createAdapter();
  return {
    cart: new Cart(adapter),
    // orders: new Orders(adapter),
    // products: new Products(adapter),
    // users: new Users(adapter),
  };
};
