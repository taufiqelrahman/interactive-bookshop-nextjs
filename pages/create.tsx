import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import CharacterCustomization from 'components/organisms/CharacterCustomization';

const Create = (props: any): any => {
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey">
        <div className="u-container">
          <div className="flex w-full">
            <div className="c-section__left">
              <Stepper step={1} totalSteps={2} title={props.t('character-customization')} />
              <CharacterCustomization />
            </div>
            <div className="c-section__right"></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-section {
          &__left {
            @apply w-3/5;
            padding: 31px 0;
          }
          &__right {
            @apply w-2/5;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Create));
