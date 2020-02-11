import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import GoogleMapReact from 'google-map-react';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import Accordion from 'components/atoms/Accordion';
import dummyContents from '_mocks/helpContents';
import Button from 'components/atoms/Button';
import Card from 'components/atoms/Card';
import FormTextField from 'components/molecules/FormTextField';
import FormTextArea from 'components/molecules/FormTextArea';
import { useForm } from 'react-hook-form';
import Divider from 'components/atoms/Divider';

const Help = (props: any): any => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    console.log(data);
  };
  const schema = {
    email: {
      required: { value: true, message: `Email ${props.t('form:required-error')}` },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: props.t('form:email-invalid') },
    },
    message: {
      required: { value: true, message: `${props.t('form:message-label')} ${props.t('form:required-error')}` },
    },
  };
  const Marker = (props: any) => <div>{props.text}</div>;
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey h-min-screen">
        <div className="u-container u-container__page">
          <Stepper title={props.t('help-title')} />
          <div className="c-help-section">
            <div className="c-help-section__left">
              {dummyContents &&
                dummyContents.map(content => (
                  <Accordion key={content.id} title={content.title} style={{ marginBottom: 12 }}>
                    {content.content}
                  </Accordion>
                ))}
              <Card variant="border">
                <div className="c-help-section__contact-us">
                  <h2>{props.t('contact-us')}</h2>
                  <div className="flex">
                    <div className="c-help-section__map">
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                        defaultCenter={{
                          lat: 59.95,
                          lng: 30.33,
                        }}
                        defaultZoom={11}
                      >
                        <Marker lat={59.955413} lng={30.337844}>
                          marker
                        </Marker>
                      </GoogleMapReact>
                    </div>
                    <div className="c-help-section__info">
                      <h2 style={{ marginBottom: 16 }}>PT. When I Grow Up Indonesia</h2>
                      <div className="c-help-section__address">
                        Plaza City View, Lt. 2 Jalan Ampera 22. Kemang, Jakarta Selatan 19540
                      </div>
                      <div>(+6221) 765 888 900</div>
                    </div>
                  </div>
                  <Divider style={{ borderColor: '#ededed', borderWidth: 1, margin: '30px 0 24px' }} />
                  <h2>{props.t('got-question')}</h2>
                  <form className="c-help-section__form" onSubmit={handleSubmit(onSubmit)}>
                    <FormTextField
                      label={props.t('form:your-email-label')}
                      name="email"
                      placeholder={props.t('form:email-placeholder')}
                      ref={register(schema.email)}
                      errors={errors.email}
                      variant="full-width"
                    />
                    <FormTextArea
                      label={props.t('form:message-label')}
                      name="message"
                      placeholder={props.t('form:message-placeholder')}
                      ref={register(schema.message)}
                      errors={errors.message}
                      style={{ marginTop: 24, marginBottom: 24 }}
                    />
                    <Button variant="outline" width="100%" color="black" style={{ margin: '12px 0' }}>
                      {props.t('form:send-button')}
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-help-section {
          @apply flex w-full;
          margin-top: 36px;
          &__left {
            @apply w-full;
            @screen lg {
              @apply w-4/5;
            }
            @screen xl {
              @apply w-3/5;
            }
            h2 {
              @apply font-semibold;
              font-size: 20px;
              line-height: 30px;
              margin-bottom: 24px;
            }
          }
          &__right {
            @apply w-0;
            @screen xl {
              @apply w-2/5;
            }
          }
          &__contact-us {
            padding: 20px 24px;
          }
          &__map {
            @apply w-1/2;
            border: 2px solid #ededed;
            box-sizing: border-box;
            border-radius: 12px;
            background: #efeef4;
            margin-right: 24px;
            height: 160px;
          }
          &__info {
            @apply w-1/2;
          }
          &__address {
            @apply font-opensans;
            margin-bottom: 22px;
            line-height: 22px;
          }
          &__form {
            @apply w-3/5;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['common', 'send'])(connect(mapStateToProps, mapDispatchToProps)(Help));
