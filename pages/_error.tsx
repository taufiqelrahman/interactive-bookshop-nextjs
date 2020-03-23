import { NextPage } from 'next';

const Error: NextPage<any> = ({ statusCode }: any) => {
  return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>;
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    statusCode,
    namespacesRequired: [],
  };
};

export default Error;
