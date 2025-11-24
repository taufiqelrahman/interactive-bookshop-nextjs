import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PreviewContainer from 'components/organisms/Preview';
import api from 'services/api';
import { wrapper } from 'store';
import { loadBookPages } from 'store/master/reducers';

const Preview = (props: any): any => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const selected = useSelector((state: any) => state.cart.selected);

  useEffect(() => {
    if (!selected) {
      router.replace('/create'); // client-side redirect
    }
  }, [selected, router]);

  if (!selected) return null; // prevent render until redirect

  return (
    <div>
      <Head>
        <title>Interactive Bookshop Next.js | {t('book-preferences')}</title>
      </Head>
      <PreviewContainer {...props} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    // get jobids from url query
    const { jobIds } = ctx.query;
    if (!jobIds) {
      return {
        props: {
          ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'form'])),
        },
      };
    }
    let firstJobId: string | undefined;
    if (typeof jobIds === 'string') {
      [firstJobId] = jobIds.split(',');
    } else if (Array.isArray(jobIds)) {
      [firstJobId] = jobIds;
    }
    if (!firstJobId) {
      return {
        props: {
          ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'form'])),
        },
      };
    }
    store.dispatch(loadBookPages({ isFetching: true, data: [] }));
    const PARAMS = { jobs: firstJobId.toString() };
    const { data: bookPages } = await api().master.getBookPages(PARAMS);
    store.dispatch(loadBookPages({ isFetching: false, data: bookPages.data }));
  } catch (err: any) {
    console.log(err.message);
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'form'])),
    },
  };
});

export default Preview;
