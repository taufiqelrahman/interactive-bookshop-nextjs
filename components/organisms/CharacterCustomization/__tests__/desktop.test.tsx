// import React from 'react';
import { render, cleanup } from '@testing-library/react';
// import { render } from 'lib/test-utils';
import CharCusDesktop from '../desktop';

jest.mock('i18n', () => {
  return {
    Router: {
      prefetch: jest.fn(),
    },
    withTranslation: jest.fn(() => (el: any) => el),
  };
});
jest.mock('next/dynamic', () => () => {
  return jest.fn(props => <>{props.children}</>);
});
afterEach(cleanup);

describe('Component: CharacterCustomization-desktop', () => {
  const stateMock = {
    cart: {},
    master: {},
  };
  test('should show Name field', () => {
    render(<CharCusDesktop state={stateMock} t={jest.fn(text => text)} />);
    // const { getByTestId, debug } = screen;
    // expect(getByTestId('input-Name')).toBeTruthy();
    // debug();
  });
});
