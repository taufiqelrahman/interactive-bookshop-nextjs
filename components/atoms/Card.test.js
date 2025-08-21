import { render, screen } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from 'react-dom';

import Card from './Card';

describe('components/atoms/Card', () => {
  let container = null;
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
    render(<Card variant="border--light,square--light"></Card>);
    expect(screen).toMatchSnapshot();
    render(<Card variant="border">Test</Card>);
    expect(screen).toMatchSnapshot();
    render(<Card>Test</Card>);
    expect(screen).toMatchSnapshot();
  });
});
