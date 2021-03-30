import { render, screen, cleanup } from '@testing-library/react';
import { selectedMock, Selected } from '_mocks/selected';
import { bookContentsMock, BookContent } from '_mocks/book';
import BookPage from '../BookPage';

afterEach(cleanup);
describe('Component: BookPage', () => {
  const setup = (selected: Selected, bookContents: BookContent[], isLast: boolean) => {
    render(<BookPage selected={selected} contents={bookContents} isLast={isLast} />);
  };
  test('Renders svg', () => {
    setup(selectedMock, bookContentsMock, false);
    const { getByTestId, getAllByTestId } = screen;
    expect(getByTestId('bookPage-svg')).toBeTruthy();
    expect(getAllByTestId('bookPage-content').length).toBe(3);
  });

  test('Renders last svg', () => {
    setup(selectedMock, bookContentsMock, true);
    const { getByTestId, getByText } = screen;
    expect(getByTestId('bookPage-svg')).toBeTruthy();
    expect(getByText('book-limit')).toBeTruthy();
  });
});
