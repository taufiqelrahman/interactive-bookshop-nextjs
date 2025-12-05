import reducer, { loadOrder, loadOrders, setPaymentProblem } from './reducers';
import * as types from './types';

describe('store/orders/reducers', () => {
  const initialState: types.OrdersState = {
    isFetching: false,
    orders: [],
    currentOrder: null,
    paymentProblem: false,
  };

  const mockOrder: types.Order = {
    id: 'order-123',
    order_number: 'ORD-001',
    shopify_order_id: 'shopify-123',
    user_id: 1,
    state_id: 1,
    name: 'Test User',
    created_at: '2023-12-01',
    updated_at: '2023-12-01',
    deleted_at: null,
    state: 'pending',
  };

  const mockOrders: types.Order[] = [
    mockOrder,
    {
      id: 'order-456',
      order_number: 'ORD-002',
      shopify_order_id: 'shopify-456',
      user_id: 1,
      state_id: 2,
      name: 'Test User',
      created_at: '2023-12-02',
      updated_at: '2023-12-02',
      deleted_at: null,
      state: 'completed',
    },
  ];

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('loadOrder', () => {
    it('should load single order', () => {
      const action = loadOrder({ isFetching: false, payload: mockOrder });
      const state = reducer(initialState, action);
      expect(state.currentOrder).toEqual(mockOrder);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching to true', () => {
      const action = loadOrder({ isFetching: true, payload: null });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
      expect(state.currentOrder).toBeNull();
    });

    it('should clear current order with null payload', () => {
      const stateWithOrder = { ...initialState, currentOrder: mockOrder };
      const action = loadOrder({ isFetching: false, payload: null });
      const state = reducer(stateWithOrder, action);
      expect(state.currentOrder).toBeNull();
    });

    it('should update existing order', () => {
      const stateWithOrder = { ...initialState, currentOrder: mockOrder };
      const updatedOrder = { ...mockOrder, state: 'completed' };
      const action = loadOrder({ isFetching: false, payload: updatedOrder });
      const state = reducer(stateWithOrder, action);
      expect(state.currentOrder?.state).toBe('completed');
    });
  });

  describe('loadOrders', () => {
    it('should load multiple orders', () => {
      const action = loadOrders({ isFetching: false, payload: mockOrders });
      const state = reducer(initialState, action);
      expect(state.orders).toEqual(mockOrders);
      expect(state.orders).toHaveLength(2);
      expect(state.isFetching).toBe(false);
    });

    it('should set isFetching to true', () => {
      const action = loadOrders({ isFetching: true, payload: [] });
      const state = reducer(initialState, action);
      expect(state.isFetching).toBe(true);
    });

    it('should handle empty orders array', () => {
      const action = loadOrders({ isFetching: false, payload: [] });
      const state = reducer(initialState, action);
      expect(state.orders).toEqual([]);
      expect(state.orders).toHaveLength(0);
    });

    it('should replace existing orders', () => {
      const stateWithOrders = { ...initialState, orders: [mockOrder] };
      const newOrders = mockOrders;
      const action = loadOrders({ isFetching: false, payload: newOrders });
      const state = reducer(stateWithOrders, action);
      expect(state.orders).toEqual(newOrders);
      expect(state.orders).toHaveLength(2);
    });
  });

  describe('setPaymentProblem', () => {
    it('should set payment problem to true', () => {
      const action = setPaymentProblem(true);
      const state = reducer(initialState, action);
      expect(state.paymentProblem).toBe(true);
    });

    it('should set payment problem to false', () => {
      const stateWithProblem = { ...initialState, paymentProblem: true };
      const action = setPaymentProblem(false);
      const state = reducer(stateWithProblem, action);
      expect(state.paymentProblem).toBe(false);
    });

    it('should not affect other state properties', () => {
      const stateWithData = {
        ...initialState,
        orders: mockOrders,
        currentOrder: mockOrder,
      };
      const action = setPaymentProblem(true);
      const state = reducer(stateWithData, action);
      expect(state.orders).toEqual(mockOrders);
      expect(state.currentOrder).toEqual(mockOrder);
      expect(state.paymentProblem).toBe(true);
    });
  });

  describe('state immutability', () => {
    it('should not mutate original state on loadOrder', () => {
      const state = { ...initialState };
      const action = loadOrder({ isFetching: true, payload: mockOrder });
      reducer(state, action);
      expect(state).toEqual(initialState);
    });

    it('should not mutate original state on loadOrders', () => {
      const state = { ...initialState };
      const action = loadOrders({ isFetching: false, payload: mockOrders });
      reducer(state, action);
      expect(state).toEqual(initialState);
    });

    it('should not mutate original state on setPaymentProblem', () => {
      const state = { ...initialState };
      const action = setPaymentProblem(true);
      reducer(state, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('complex scenarios', () => {
    it('should handle loading order while fetching orders', () => {
      let state = reducer(initialState, loadOrders({ isFetching: true, payload: [] }));
      expect(state.isFetching).toBe(true);

      state = reducer(state, loadOrder({ isFetching: false, payload: mockOrder }));
      expect(state.isFetching).toBe(false);
      expect(state.currentOrder).toEqual(mockOrder);
    });

    it('should maintain payment problem state across order loads', () => {
      let state = reducer(initialState, setPaymentProblem(true));
      expect(state.paymentProblem).toBe(true);

      state = reducer(state, loadOrder({ isFetching: false, payload: mockOrder }));
      expect(state.paymentProblem).toBe(true);
      expect(state.currentOrder).toEqual(mockOrder);
    });
  });
});
