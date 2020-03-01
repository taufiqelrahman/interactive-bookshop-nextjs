import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import CharCustom from 'components/organisms/CharacterCustomization/desktop';
import CharCustomMobile from 'components/organisms/CharacterCustomization/mobile';

const Create = (props: any): any => {
  if (props.isMobile) {
    return <CharCustomMobile {...props} />;
  } else {
    return <CharCustom {...props} />;
  }
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Create));
