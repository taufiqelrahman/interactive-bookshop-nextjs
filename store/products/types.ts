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
