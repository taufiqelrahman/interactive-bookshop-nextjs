import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import Dot from './Dot';

describe('components/atoms/Dot', () => {
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
    render(<Dot color="red" />);
    expect(screen).toMatchSnapshot();
    render(<Dot />);
    expect(screen).toMatchSnapshot();
  });
});
