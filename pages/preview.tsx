import Head from 'next/head';
import cookies from 'next-cookies';

import PreviewDesktop from 'components/organisms/Preview/desktop';
import PreviewMobile from 'components/organisms/Preview/mobile';

import api from 'services/api';
import { wrapper } from 'store';
import actions from 'store/actions';

const Preview = (props: any): any => (
  <div>
    <Head>
      <title>When I Grow Up | {props.t('book-preferences')}</title>
    </Head>
    {props.isMobile ? <PreviewMobile {...props} /> : <PreviewDesktop {...props} />}
  </div>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  let selected: any = cookies(ctx).pendingTrx;
  if (!selected) {
    ({ selected } = store.getState().cart);
  }
  if (!selected) {
    return {
      redirect: {
        destination: '/create',
        permanent: false, // false = temporary redirect
      },
    };
  }
  try {
    if (!selected.jobIds.length) return;
    const [firstJobId] = selected.jobIds;
    store.dispatch(actions.loadBookPages(true));
    // const PARAMS = { jobs: selected.jobIds.toString() };
    const PARAMS = { jobs: firstJobId.toString() };
    const { data } = await api().master.getBookPages(PARAMS);
    store.dispatch(actions.loadBookPages(false, data.data));
  } catch (err: any) {
    console.log(err.message);
  }

  return {
    props: {
      namespacesRequired: ['form'],
    },
  };
});

export default withTranslation('common')(Preview);
