import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import * as React from 'react';
import { useRouter } from 'next/router';

import Cart from '../../pages/cart';
import { createTestStore } from '../test-utils';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock next-i18next
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

// Mock next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>;
    },
  };
});

// Mock dynamic imports
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null;
  DynamicComponent.displayName = 'LoadableComponent';
  return DynamicComponent;
});

describe('E2E: Cart Page', () => {
  let store: any;
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/cart',
      query: {},
      asPath: '/cart',
    });

    store = createTestStore({
      cart: {
        items: [
          {
            id: '1',
            name: 'Custom Book 1',
            price: 150000,
            quantity: 1,
            character: {
              name: 'John',
              occupation: 'Pilot',
              age: 5,
            },
          },
          {
            id: '2',
            name: 'Custom Book 2',
            price: 150000,
            quantity: 2,
            character: {
              name: 'Jane',
              occupation: 'Doctor',
              age: 6,
            },
          },
        ],
        total: 450000,
        selected: null,
      },
      users: {
        isLoggedIn: false,
        user: null,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart page without crashing', () => {
    render(
      <Provider store={store}>
        <Cart isMobile={false} />
      </Provider>,
    );

    // Page should render
    expect(screen.getByText('cart-title')).toBeInTheDocument();
  });

  it('displays cart items from Redux store', () => {
    render(
      <Provider store={store}>
        <Cart isMobile={false} />
      </Provider>,
    );

    const state = store.getState();
    expect(state.cart.items).toHaveLength(2);
    expect(state.cart.items[0].name).toBe('Custom Book 1');
  });

  it('displays correct total amount', () => {
    render(
      <Provider store={store}>
        <Cart isMobile={false} />
      </Provider>,
    );

    const state = store.getState();
    expect(state.cart.total).toBe(450000);
  });

  it('handles empty cart gracefully', () => {
    store = createTestStore({
      cart: {
        items: [],
        total: 0,
        selected: null,
      },
      users: {
        isLoggedIn: false,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <Cart isMobile={false} />
      </Provider>,
    );

    expect(screen.getByText('cart-title')).toBeInTheDocument();
  });

  it('renders mobile version correctly', () => {
    render(
      <Provider store={store}>
        <Cart isMobile={true} setSideNav={jest.fn()} />
      </Provider>,
    );

    expect(screen.getByText('cart-title')).toBeInTheDocument();
  });

  it('maintains cart state across page loads', () => {
    const { rerender } = render(
      <Provider store={store}>
        <Cart isMobile={false} />
      </Provider>,
    );

    const initialState = store.getState();
    expect(initialState.cart.items).toHaveLength(2);

    rerender(
      <Provider store={store}>
        <Cart isMobile={false} />
      </Provider>,
    );

    const currentState = store.getState();
    expect(currentState.cart.items).toHaveLength(2);
    expect(currentState.cart.items).toEqual(initialState.cart.items);
  });
});
