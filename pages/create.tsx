import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import CharacterCustomization from 'components/organisms/CharacterCustomization';
import NavBar from 'components/organisms/mobile/NavBar';

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
        {!props.isMobile && (
          <Stepper step={1} totalSteps={2} title={props.t('character-customization')} style={{ marginBottom: 30 }} />
        )}
        <div className="c-section">
          <div className="c-section__left">
            <CharacterCustomization {...props} />
          </div>
          <div className="c-section__right">
            <img src="/static/images/dummy.png" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-section {
          @apply flex w-full flex-col;
          @screen lg {
            @apply flex-row;
          }
          &__left {
            @apply w-full;
            @screen lg {
              @apply w-4/5;
            }
            @screen xl {
              @apply w-3/5;
            }
          }
          &__right {
            @apply w-full;
            padding: 0 100px;
            @screen lg {
              @apply w-1/5;
            }
            @screen xl {
              @apply w-2/5;
            }
            img {
              @apply w-full;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Create));
