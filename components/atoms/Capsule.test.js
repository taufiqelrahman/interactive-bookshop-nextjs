import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import Capsule from './Capsule';

describe('components/atoms/Capsule', () => {
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
    render(<Capsule color="red">Test</Capsule>);
    expect(screen).toMatchSnapshot();
    render(<Capsule />);
    expect(screen).toMatchSnapshot();
  });
});
