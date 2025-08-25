import { NextPage } from 'next';

interface ErrorProps {
  statusCode?: number;
}

const ErrorPage: NextPage<ErrorProps> & {
  getInitialProps?: (ctx: any) => { statusCode?: number };
} = ({ statusCode }) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>{statusCode || 'Error'}</h1>
      <p>{statusCode === 404 ? 'This page could not be found.' : 'An unexpected error has occurred.'}</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
