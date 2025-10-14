export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const SHOW_PRODUCT = 'SHOW_PRODUCT';

export interface Product {
  id: number;
  name: string;
  description: string;
  short_description: string;
  price: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  images: ProductImage[];
}

interface ProductImage {
  id: number;
  product_id: number;
  description: string;
  filepath: string;
  created_at: string;
  updated_at: string;
}

export interface ProductsState {
  isFetching: boolean;
  products: Product[] | null;
  currentProduct: Product | null;
}

interface LoadProducts {
  type: typeof LOAD_PRODUCTS;
  payload: Product[] | null;
  isFetching: boolean;
}

interface ShowProduct {
  type: typeof SHOW_PRODUCT;
  payload: Product | null;
  isFetching: boolean;
}

export type ProductsActionTypes = LoadProducts | ShowProduct;
