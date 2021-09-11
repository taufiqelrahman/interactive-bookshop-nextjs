import { render, screen, cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import TestimonialSlider from '../TestimonialSlider';
import { testimonialsMock } from '_mocks/testimonial';

jest.mock('lib/gtag', () => {
  return {
    event: jest.fn(),
  };
});
afterEach(cleanup);

describe('Component: TestimonialSlider', () => {
  beforeEach(() => {
    render(<TestimonialSlider testimonials={testimonialsMock} />);
  });
  test('should show 3 testimonials', () => {
    const { getAllByTestId } = screen;
    expect(getAllByTestId('testimonial').length).toBe(3);
    expect(screen).toMatchSnapshot();
  });

  test('should nav correctly', async () => {
    fireEvent.click(screen.getByTestId('nav-right'));
    await waitForDomChange();
    fireEvent.click(screen.getByTestId('nav-left'));
  });
});
