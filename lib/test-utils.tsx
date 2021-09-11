/**
 * Not used
 */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

export const render = (ui: JSX.Element, { store = initializeStore(), ...renderOptions }: any = {}) => {
  function Wrapper({ children }: { children: JSX.Element }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
