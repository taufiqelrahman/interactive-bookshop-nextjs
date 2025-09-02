import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PreviewDesktop from 'components/organisms/Preview/desktop';
import PreviewMobile from 'components/organisms/Preview/mobile';
import api from 'services/api';
import { wrapper } from 'store';
import actions from 'store/actions';

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
      {props.isMobile ? <PreviewMobile {...props} /> : <PreviewDesktop {...props} />}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    // get jobids from url query
    const { jobIds } = ctx.query;
    if (!jobIds) return;
    let firstJobId: string | undefined;
    if (typeof jobIds === 'string') {
      [firstJobId] = jobIds.split(',');
    } else if (Array.isArray(jobIds)) {
      [firstJobId] = jobIds;
    }
    if (!firstJobId) return;
    store.dispatch(actions.loadBookPages(true));
    const PARAMS = { jobs: firstJobId.toString() };
    const { data } = await api().master.getBookPages(PARAMS);
    store.dispatch(actions.loadBookPages(false, data.data));
  } catch (err: any) {
    console.log(err.message);
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'form'])),
    },
  };
});

export default Preview;
