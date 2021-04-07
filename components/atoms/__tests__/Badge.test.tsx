import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('components/atoms/Badge', () => {
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
    render(<Badge>!</Badge>);
    expect(screen).toMatchSnapshot();
    render(<Badge />);
    expect(screen).toMatchSnapshot();
  });
});
