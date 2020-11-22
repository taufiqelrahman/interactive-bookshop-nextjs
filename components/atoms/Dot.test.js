import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from 'react-dom';
import { render, waitFor, screen } from '@testing-library/react';
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

  it('loads and displays greeting', async () => {
    render(<Dot color="red" />);
    await waitFor(() => screen.getByTestId('span'));
    expect(screen.getByTestId('span')).toHaveClass('c-dot--red');
  });

  it('renders the component', () => {
    render(<Dot color="red" />);
    expect(screen).toMatchSnapshot();
    render(<Dot />);
    expect(screen).toMatchSnapshot();
  });
});
