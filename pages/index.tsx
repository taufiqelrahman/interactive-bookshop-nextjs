// pages/index.tsx
import { GetServerSideProps, NextPage } from 'next';

interface HomeProps {
  timestamp: string;
}

const Home: NextPage<HomeProps> = ({ timestamp }) => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>✅ Index Works!</h1>
      <p>Rendered at: {timestamp}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log('>>> SSR running for /index');
  console.log('>>> URL:', ctx.req.url);
  console.log('>>> Headers:', ctx.req.headers);

  return {
    props: {
      timestamp: new Date().toISOString(),
    },
  };
};

export default Home;
