import { render, screen } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from 'react-dom';

import Accordion from './Accordion';

describe('components/atoms/Accordion', () => {
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
    render(
      <Accordion title="Title Test" isMobile={false}>
        Content test
      </Accordion>,
    );
    expect(screen).toMatchSnapshot();
    render(
      <Accordion title="Title Test" isMobile={true}>
        Content test
      </Accordion>,
    );
    expect(screen).toMatchSnapshot();
    render(<Accordion />);
    expect(screen).toMatchSnapshot();
  });
});
