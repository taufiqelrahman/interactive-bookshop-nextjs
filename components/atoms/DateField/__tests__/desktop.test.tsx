import { render, screen, cleanup } from '@testing-library/react';
import DateFieldDesktop from '../desktop';

afterEach(cleanup);

describe('Component: DateField-desktop', () => {
  test('renders all fields', async () => {
    render(<DateFieldDesktop />);
    const { getByText } = screen;
    expect(getByText('DD')).toBeTruthy();
  });
});
