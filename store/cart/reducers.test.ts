import reducer, {
  loadCart,
  addToCart,
  transferCart,
  updateCart,
  removeFromCart,
  saveSelected,
  createCart,
} from './reducers';
import * as types from './types';

describe('store/cart/reducers', () => {
  const initialState: types.CartState = {
    isFetching: false,
    cart: null,
    selected: null,
  };

  const mockCart: Partial<types.Cart> = {
    id: 'cart-123',
    webUrl: 'https://example.com/cart',
    lineItems: [
      {
        id: 'item-1',
        title: 'Test Book',
        variant: { id: 'var-1', title: 'Variant 1', price: '100000' } as any,
        quantity: 1,
        customAttributes: { Gender: 'boy', Age: 'kid' },
      } as any,
    ],
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('loadCart', () => {
    it('should load cart data', () => {
      const action = loadCart({ isFetching: false, payload: mockCart as types.Cart });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(false);
      expect(state.cart).toEqual(mockCart);
    });

    it('should set isFetching to true', () => {
      const action = loadCart({ isFetching: true, payload: null });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
      expect(state.cart).toBeNull();
    });

    it('should handle null payload', () => {
      const action = loadCart({ isFetching: false, payload: null });
      const state = reducer(initialState, action);
      expect(state.cart).toBeNull();
    });

    it('should handle undefined payload', () => {
      const action = loadCart({ isFetching: false, payload: undefined });
      const state = reducer(initialState, action);
      expect(state.cart).toBeNull();
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', () => {
      const action = addToCart({ isFetching: false, payload: mockCart as types.Cart });
      const state = reducer(initialState, action);
      expect(state.cart).toEqual(mockCart);
    });

    it('should set isFetching during add', () => {
      const action = addToCart({ isFetching: true, payload: null });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });
  });

  describe('transferCart', () => {
    it('should transfer cart data', () => {
      const action = transferCart({ isFetching: false, payload: mockCart as types.Cart });
      const state = reducer(initialState, action);
      expect(state.cart).toEqual(mockCart);
    });

    it('should set isFetching during transfer', () => {
      const action = transferCart({ isFetching: true, payload: null });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });
  });

  describe('updateCart', () => {
    it('should update cart data', () => {
      const updatedCart = { ...mockCart, lineItems: [] };
      const action = updateCart({ isFetching: false, payload: updatedCart as types.Cart });
      const state = reducer(initialState, action);
      expect(state.cart).toEqual(updatedCart);
    });

    it('should set isFetching during update', () => {
      const action = updateCart({ isFetching: true, payload: null });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const action = removeFromCart({ isFetching: false, payload: mockCart as types.Cart });
      const state = reducer(initialState, action);
      expect(state.cart).toEqual(mockCart);
    });

    it('should set isFetching during remove', () => {
      const action = removeFromCart({ isFetching: true, payload: null });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });
  });

  describe('saveSelected', () => {
    it('should save selected cart item', () => {
      const selectedItem: Partial<types.CartItem> = {
        id: 'item-1',
        Gender: 'boy',
        Age: 'kid',
      };
      const action = saveSelected(selectedItem);
      const state = reducer(initialState, action);
      expect(state.selected).toEqual(selectedItem);
    });

    it('should save partial selected item', () => {
      const partialItem = { id: 'item-1', Gender: 'boy' };
      const action = saveSelected(partialItem);
      const state = reducer(initialState, action);
      expect(state.selected).toEqual(partialItem);
    });

    it('should clear selected when null', () => {
      const stateWithSelected = { ...initialState, selected: { id: 'item-1' } as types.CartItem };
      const action = saveSelected(null);
      const state = reducer(stateWithSelected, action);
      expect(state.selected).toBeNull();
    });
  });

  describe('createCart', () => {
    it('should set isFetching true during creation', () => {
      const action = createCart({ isFetching: true });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });

    it('should set isFetching false after creation', () => {
      const action = createCart({ isFetching: false });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(false);
    });
  });

  describe('state immutability', () => {
    it('should not mutate original state on loadCart', () => {
      const state = { ...initialState };
      const action = loadCart({ isFetching: true, payload: mockCart as types.Cart });
      reducer(state, action);
      expect(state).toEqual(initialState);
    });

    it('should not mutate original state on saveSelected', () => {
      const state = { ...initialState };
      const action = saveSelected({ id: 'test' });
      reducer(state, action);
      expect(state).toEqual(initialState);
    });
  });
});
