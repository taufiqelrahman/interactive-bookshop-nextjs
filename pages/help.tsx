import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import Accordion from 'components/atoms/Accordion';
import dummyContents from '_mocks/helpContents';

const Help = (props: any): any => {
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey h-min-screen">
        <div className="u-container u-container__page">
          <Stepper title={props.t('cart-title')} />
          <div className="c-help-section">
            <div className="c-help-section__left">
              {dummyContents &&
                dummyContents.map(content => (
                  <Accordion key={content.id} title={content.title} style={{ marginBottom: 12 }}>
                    {content.content}
                  </Accordion>
                ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-help-section {
          @apply flex w-full;
          margin-top: 36px;
          &__left {
            @apply w-3/5;
          }
          &__right {
            @apply w-2/5;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Help));
