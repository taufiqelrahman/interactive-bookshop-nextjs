import reducer, { loadProducts, showProduct } from './reducers';
import * as types from './types';

describe('store/products/reducers', () => {
  const initialState: types.ProductsState = {
    isFetching: false,
    products: [],
    currentProduct: null,
  };

  const mockProduct: types.Product = {
    id: 123,
    name: 'Test Book',
    description: 'A test book description',
    short_description: 'Test',
    price: 100000,
    created_at: '2023-12-01',
    updated_at: '2023-12-01',
    deleted_at: '2023-12-01',
    images: [
      {
        id: 1,
        product_id: 123,
        description: 'test',
        filepath: 'https://example.com/image.jpg',
        created_at: '2023-12-01',
        updated_at: '2023-12-01',
      },
    ],
  };

  const mockProducts: types.Product[] = [
    mockProduct,
    {
      id: 456,
      name: 'Another Book',
      description: 'Another book description',
      short_description: 'Another',
      price: 200000,
      created_at: '2023-12-01',
      updated_at: '2023-12-01',
      deleted_at: '2023-12-01',
      images: [],
    },
  ];

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('loadProducts', () => {
    it('should load products successfully', () => {
      const action = loadProducts({ isFetching: false, payload: mockProducts });
      const state = reducer(initialState, action);
      expect(state.products).toEqual(mockProducts);
      expect(state.products).toHaveLength(2);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching to true', () => {
      const action = loadProducts({ isFetching: true, payload: undefined });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
      expect(state.products).toEqual([]);
    });

    it('should handle undefined payload', () => {
      const action = loadProducts({ isFetching: false, payload: undefined });
      const state = reducer(initialState, action);
      expect(state.products).toEqual([]);
    });

    it('should handle empty products array', () => {
      const action = loadProducts({ isFetching: false, payload: [] });
      const state = reducer(initialState, action);
      expect(state.products).toEqual([]);
      expect(state.products).toHaveLength(0);
    });

    it('should replace existing products', () => {
      const stateWithProducts = { ...initialState, products: [mockProduct] };
      const newProducts = mockProducts;
      const action = loadProducts({ isFetching: false, payload: newProducts });
      const state = reducer(stateWithProducts, action);
      expect(state.products).toEqual(newProducts);
      expect(state.products).toHaveLength(2);
    });

    it('should clear products when payload is undefined', () => {
      const stateWithProducts = { ...initialState, products: mockProducts };
      const action = loadProducts({ isFetching: false, payload: undefined });
      const state = reducer(stateWithProducts, action);
      expect(state.products).toEqual([]);
    });
  });

  describe('showProduct', () => {
    it('should show single product', () => {
      const action = showProduct({ isFetching: false, payload: mockProduct });
      const state = reducer(initialState, action);
      expect(state.currentProduct).toEqual(mockProduct);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching to true', () => {
      const action = showProduct({ isFetching: true, payload: null });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
      expect(state.currentProduct).toBeNull();
    });

    it('should handle null payload', () => {
      const stateWithProduct = { ...initialState, currentProduct: mockProduct };
      const action = showProduct({ isFetching: false, payload: null });
      const state = reducer(stateWithProduct, action);
      expect(state.currentProduct).toBeNull();
    });

    it('should handle undefined payload', () => {
      const stateWithProduct = { ...initialState, currentProduct: mockProduct };
      const action = showProduct({ isFetching: false, payload: undefined });
      const state = reducer(stateWithProduct, action);
      expect(state.currentProduct).toBeNull();
    });

    it('should replace existing current product', () => {
      const stateWithProduct = { ...initialState, currentProduct: mockProduct };
      const newProduct = mockProducts[1];
      const action = showProduct({ isFetching: false, payload: newProduct });
      const state = reducer(stateWithProduct, action);
      expect(state.currentProduct).toEqual(newProduct);
      expect(state.currentProduct?.id).toBe(456);
    });

    it('should not affect products array', () => {
      const stateWithProducts = { ...initialState, products: mockProducts };
      const action = showProduct({ isFetching: false, payload: mockProduct });
      const state = reducer(stateWithProducts, action);
      expect(state.products).toEqual(mockProducts);
      expect(state.currentProduct).toEqual(mockProduct);
    });
  });

  describe('state immutability', () => {
    it('should not mutate original state on loadProducts', () => {
      const state = { ...initialState };
      const action = loadProducts({ isFetching: false, payload: mockProducts });
      reducer(state, action);
      expect(state).toEqual(initialState);
    });

    it('should not mutate original state on showProduct', () => {
      const state = { ...initialState };
      const action = showProduct({ isFetching: false, payload: mockProduct });
      reducer(state, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('complex scenarios', () => {
    it('should handle loading products and showing specific product', () => {
      let state = reducer(initialState, loadProducts({ isFetching: false, payload: mockProducts }));
      expect(state.products).toHaveLength(2);

      state = reducer(state, showProduct({ isFetching: false, payload: mockProduct }));
      expect(state.currentProduct).toEqual(mockProduct);
      expect(state.products).toHaveLength(2);
    });

    it('should handle fetching state transitions', () => {
      let state = reducer(initialState, loadProducts({ isFetching: true, payload: undefined }));
      expect(state.isFetching).toBe(true);

      state = reducer(state, loadProducts({ isFetching: false, payload: mockProducts }));
      expect(state.isFetching).toBe(false);
      expect(state.products).toEqual(mockProducts);
    });

    it('should clear current product while keeping products', () => {
      let state = reducer(initialState, loadProducts({ isFetching: false, payload: mockProducts }));
      state = reducer(state, showProduct({ isFetching: false, payload: mockProduct }));
      expect(state.currentProduct).toEqual(mockProduct);

      state = reducer(state, showProduct({ isFetching: false, payload: null }));
      expect(state.currentProduct).toBeNull();
      expect(state.products).toEqual(mockProducts);
    });
  });
});
