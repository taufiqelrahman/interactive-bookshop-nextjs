import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import CharacterCustomization from 'components/organisms/CharacterCustomization';

const Create = (props: any): any => {
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey h-min-screen">
        <div className="u-container u-container__page">
          <Stepper step={1} totalSteps={2} title={props.t('character-customization')} />
          <div className="flex w-full">
            <div className="c-section__left">
              <CharacterCustomization />
            </div>
            <div className="c-section__right"></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-section {
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
            @apply w-0;
            @screen lg {
              @apply w-1/5;
            }
            @screen xl {
              @apply w-2/5;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Create));
