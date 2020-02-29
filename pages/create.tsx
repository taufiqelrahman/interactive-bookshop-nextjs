import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import { Fragment } from 'react';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import CharCustom from 'components/organisms/CharacterCustomization/desktop';
import CharCustomMobile from 'components/organisms/CharacterCustomization/mobile';
import NavBar from 'components/organisms/NavBar/mobile';

const Create = (props: any): any => {
  const onBack = () => {
    console.log('onback');
  };
  return (
    <DefaultLayout
      {...props}
      navbar={
        props.isMobile && (
          <NavBar
            onBack={onBack}
            setSideNav={props.setSideNav}
            isSteps={true}
            title={props.t('character-customization')}
            step={1}
            totalSteps={2}
          />
        )
      }
    >
      <div className={`u-container ${props.isMobile ? 'u-container__page' : 'u-container__page--large'}`}>
        {!props.isMobile ? (
          <Fragment>
            <Stepper step={1} totalSteps={2} title={props.t('character-customization')} style={{ marginBottom: 30 }} />
            <CharCustom {...props} />
          </Fragment>
        ) : (
          <CharCustomMobile {...props} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Create));
