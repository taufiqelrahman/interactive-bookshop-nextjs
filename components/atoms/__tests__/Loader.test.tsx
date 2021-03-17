import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('components/atoms/Loader', () => {
  let container;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders the component', () => {
    render(<Loader />);
    expect(screen).toMatchSnapshot();
  });
});
