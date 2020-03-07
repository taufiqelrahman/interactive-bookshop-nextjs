import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import PreviewMobile from 'components/organisms/Preview/mobile';
import PreviewDesktop from 'components/organisms/Preview/desktop';

const Preview = (props: any): any => {
  if (props.isMobile) {
    return <PreviewMobile {...props} />;
  } else {
    return <PreviewDesktop {...props} />;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
