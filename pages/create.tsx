import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import CharCustom from 'components/organisms/CharacterCustomization/desktop';
import CharCustomMobile from 'components/organisms/CharacterCustomization/mobile';
import actions from 'store/actions';
import api from 'services/api';

const Create = (props: any): any => {
  if (props.isMobile) {
    return <CharCustomMobile {...props} />;
  } else {
    return <CharCustom {...props} />;
  }
};

Create.getInitialProps = async (ctx: any): Promise<any> => {
  try {
    const { data: occupations } = await api().master.getOccupations();
    ctx.reduxStore.dispatch(actions.loadOccupations(false, occupations.data));
  } catch (err) {
    console.log(err.message);
  }
  return {
    namespacesRequired: ['common'],
  };
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Create));
