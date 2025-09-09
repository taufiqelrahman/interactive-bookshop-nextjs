import Client from 'shopify-buy';

import Checkout from './checkout';

/**
 * Build a Shopify client adapter using the given domain and token.
 * @param domain - Shopify store domain
 * @param accessToken - Storefront API access token
 */
function buildShopifyAdapter(domain: string, accessToken: string) {
  return Client.buildClient({
    domain,
    storefrontAccessToken: accessToken,
    apiVersion: '2018-10',
  });
}

/**
 * Create a Shopify adapter using environment variables.
 */
function getShopifyAdapter() {
  const domain = process.env.SHOPIFY_URL as string;
  const accessToken = process.env.STOREFRONT_API_KEY as string;
  return buildShopifyAdapter(domain, accessToken);
}

/**
 * Main GraphQL service for Shopify, exposing domain-specific services.
 * Add more services as needed.
 */
const getGraphqlService = () => {
  const shopifyAdapter = getShopifyAdapter();
  return {
    checkout: new Checkout(shopifyAdapter),
  };
};

export default getGraphqlService;
