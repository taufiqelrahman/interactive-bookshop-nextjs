import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import PreviewMobile from 'components/organisms/Preview/mobile';
import PreviewDesktop from 'components/organisms/Preview/desktop';
import actions from 'store/actions';
import api from 'services/api';
import Head from 'next/head';

const Preview = (props: any): any => (
  <div>
    <Head>
      <title>When I Grow Up | {props.t('book-preferences')}</title>
    </Head>
    {props.isMobile ? <PreviewMobile {...props} /> : <PreviewDesktop {...props} />}
  </div>
);

Preview.getInitialProps = async (ctx: any): Promise<any> => {
  if (!ctx.reduxStore.getState().cart.selected) {
    const { res } = ctx;
    if (res) {
      res.writeHead(302, { Location: 'create' });
      res.end();
    }
    return {};
  }
  try {
    ctx.reduxStore.dispatch(actions.loadBookPages(true));
    const { data } = await api().master.getBookPages();
    ctx.reduxStore.dispatch(actions.loadBookPages(false, data.data));
  } catch (err) {
    console.log(err.message);
  }
  return {
    namespacesRequired: ['form'],
  };
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Preview));
