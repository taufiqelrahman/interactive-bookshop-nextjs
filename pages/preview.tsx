import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import PreviewMobile from 'components/organisms/Preview/mobile';
import PreviewDesktop from 'components/organisms/Preview/desktop';
import actions from 'store/actions';
import { useEffect } from 'react';
import { Router } from 'i18n';

const Preview = (props: any): any => {
  useEffect(() => {
    if (!props.state.cart.selected) Router.back();
  }, []);
  if (props.isMobile) {
    return <PreviewMobile {...props} />;
  } else {
    return <PreviewDesktop {...props} />;
  }
};

Preview.getInitialProps = async (ctx: any): Promise<any> => {
  try {
    await ctx.reduxStore.dispatch(actions.thunkLoadBookPages());
  } catch (err) {
    console.log(err.message);
  }
  return {
    namespacesRequired: ['form'],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
