import { render, screen, cleanup } from '@testing-library/react';
import { testimonialMock } from '_mocks/testimonial';
import Testimonial from '../Testimonial';

afterEach(cleanup);
describe('Component: Testimonial', () => {
  beforeEach(() => render(<Testimonial testi={testimonialMock} />));
  test('should show photo', async () => {
    const { getByTestId } = screen;
    expect(getByTestId('testimonial-photo')).toBeTruthy();
    expect(getByTestId('testimonial-photo').getAttribute('src')).toBe(testimonialMock.image_url);
  });
  test('should show contents', () => {
    const { getByText } = screen;
    expect(getByText(testimonialMock.name)).toBeTruthy();
    expect(getByText(testimonialMock.message)).toBeTruthy();
    expect(getByText(testimonialMock.company)).toBeTruthy();
  });
});
