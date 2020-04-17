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
import NavBar from 'components/organisms/NavBar/mobile';

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
  const Wrapper: any = props.isMobile ? 'div' : Card;
  return (
    <DefaultLayout
      {...props}
      navbar={
        props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('help-title')} />
      }
    >
      <div className={`u-container__page ${props.isMobile ? '' : 'u-container'}`}>
        {props.isMobile ? (
          <img className="c-help-section__image" src="/static/images/welcome.png" />
        ) : (
          <Stepper title={props.t('help-title')} />
        )}
        <div className="c-help-section">
          <div className="c-help-section__left">
            {props.isMobile && <div className="c-help-section__title">{props.t('faq')}</div>}
            {dummyContents &&
              dummyContents.map(content => (
                <Accordion
                  key={content.id}
                  title={content.title}
                  style={props.isMobile ? {} : { marginBottom: 12 }}
                  isMobile={props.isMobile}
                >
                  {content.content}
                </Accordion>
              ))}
            <Wrapper variant="border">
              <div className="c-help-section__contact-us">
                <h2>{props.t('contact-us')}</h2>
                <div className={props.isMobile ? '' : 'flex'}>
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
                    <h2 style={props.isMobile ? {} : { marginBottom: 16 }}>PT. When I Grow Up Indonesia</h2>
                    <div className="c-help-section__address">
                      Plaza City View, Lt. 2 Jalan Ampera 22. Kemang, Jakarta Selatan 19540
                    </div>
                    <div className="c-help-section__phone">(+6221) 765 888 900</div>
                  </div>
                </div>
                <Divider
                  style={{
                    borderColor: props.isMobile ? '#EFEEF4' : '#ededed',
                    borderWidth: 1,
                    margin: props.isMobile ? '18px 0 2px' : '30px 0 24px',
                  }}
                />
                <h2>{props.t('got-question')}</h2>
                <form className="c-help-section__form" onSubmit={handleSubmit(onSubmit)}>
                  <FormTextField
                    label={props.t('form:your-email-label')}
                    name="email"
                    placeholder={props.t('form:email-placeholder')}
                    schema={schema.email}
                    errors={errors.email}
                    variant="full-width"
                  />
                  <FormTextArea
                    label={props.t('form:message-label')}
                    name="message"
                    placeholder={props.t('form:message-placeholder')}
                    schema={schema.message}
                    errors={errors.message}
                    style={{ marginTop: props.isMobile ? 12 : 24, marginBottom: props.isMobile ? 16 : 24 }}
                  />
                  <Button variant="outline" width="100%" color="black" style={{ margin: '12px 0' }}>
                    {props.t('form:send-button')}
                  </Button>
                </form>
              </div>
            </Wrapper>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-help-section {
          @apply flex w-full;
          margin-top: 4px;
          @screen md {
            margin-top: 36px;
          }
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
              padding: 16px 0;
              @screen md {
                font-size: 20px;
                line-height: 30px;
                margin-bottom: 24px;
                padding: 0;
              }
            }
          }
          &__right {
            @apply w-0;
            @screen xl {
              @apply w-2/5;
            }
          }
          &__image {
            @apply mx-auto w-4/5;
          }
          &__title {
            @apply font-semibold;
            font-size: 16px;
            line-height: 24px;
            border-bottom: 1px solid #ededed;
            padding: 16px;
          }
          &__contact-us {
            padding: 16px;
            @screen md {
              padding: 20px 24px;
            }
          }
          &__map {
            @apply w-full;
            border: 2px solid #ededed;
            box-sizing: border-box;
            background: #efeef4;
            margin-right: 24px;
            height: 160px;
            @screen md {
              @apply w-1/2;
            }
          }
          &__info {
            @apply w-full;
            @screen md {
              @apply w-1/2 text-base;
            }
          }
          &__address {
            @apply font-opensans text-sm;
            margin-bottom: 8px;
            line-height: 20px;
            @screen md {
              @apply text-base;
              line-height: 22px;
              margin-bottom: 22px;
            }
          }
          &__phone {
            @apply font-opensans text-sm;
            margin-bottom: 8px;
            @screen md {
              @apply text-base;
            }
          }
          &__form {
            margin-top: 16px;
            @screen md {
              @apply w-3/5;
              margin: 0;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .c-help-section__map > div > div {
          border-radius: 12px;
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Help));
