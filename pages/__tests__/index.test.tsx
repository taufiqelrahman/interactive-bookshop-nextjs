import { cleanup } from '@testing-library/react';
import { render } from 'lib/test-utils';
import IndexPage from '../index';

jest.mock('next/dynamic', () => () => {
  return jest.fn(props => <>{props.children}</>);
});
jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockResolvedValue({
      pathname: '/',
    }),
  };
});
afterEach(cleanup);
(global as any).fbq = jest.fn();

describe('Page: Index', () => {
  test('renders correctly', async () => {
    render(<IndexPage />);
    await IndexPage.getInitialProps();
    // const { getByText } = screen;
    // getByText('qwe');
    // debug();
  });
});
