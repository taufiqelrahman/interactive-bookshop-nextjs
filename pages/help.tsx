import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// import GoogleMapReact from 'google-map-react';
// import dummyContents from '_mocks/helpContents';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import helpContents from 'config/helpContents';
import actions from 'store/actions';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Accordion = dynamic(() => import('components/atoms/Accordion'));
const Button = dynamic(() => import('components/atoms/Button'));
const Card = dynamic(() => import('components/atoms/Card'));
const FormTextField = dynamic(() => import('components/molecules/FormTextField'));
const FormTextArea = dynamic(() => import('components/molecules/FormTextArea'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const Footer = dynamic(() => import('components/organisms/Footer'));

const Help = (props: any): any => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const defaultStore = useSelector((state: any) => state.default);
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, reset } = methods;
  const { isFetching } = defaultStore;
  const onSubmit = async (data) => {
    await dispatch(actions.thunkSendMessage(data));
    reset();
    toast.success(t('form:copy-success-help'));
  };
  const schema = {
    email: {
      required: { value: true, message: `Email ${t('form:required-error')}` },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: t('form:email-invalid') },
    },
    message: {
      required: { value: true, message: `${t('form:message-label')} ${t('form:required-error')}` },
    },
  };
  // const Marker = (props: any) => <div>{props.text}</div>;
  const Wrapper: any = props.isMobile ? 'div' : Card;
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={t('help-title')} />}
    >
      <Head>
        <title>Interactive Bookshop Next.js | {t('help-title')}</title>
      </Head>
      <div className={`u-container__page ${props.isMobile ? '' : 'u-container'}`}>
        {props.isMobile ? (
          <Image className="c-help-section__image mb-2" src="/static/images/help.png" alt="help" />
        ) : (
          <Stepper title={t('help-title')} />
        )}
        <div className="c-help-section">
          <div className="c-help-section__left">
            {props.isMobile && <div className="c-help-section__title">{t('faq')}</div>}
            {helpContents &&
              helpContents.map((content) => (
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
                <h2>{t('contact-us')}</h2>
                <div className={props.isMobile ? '' : 'flex'}>
                  {/* <div className="c-help-section__map">
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                      defaultCenter={{
                        lat: 6.2,
                        lng: 106.82,
                      }}
                      defaultZoom={11}
                    >
                      <Marker lat={-6.199212} lng={106.822436}>
                        marker
                      </Marker>
                    </GoogleMapReact>
                  </div> */}
                  <div className="c-help-section__info">
                    <h2 style={props.isMobile ? {} : { marginBottom: 16 }}>Interactive Bookshop Next.js</h2>
                    <div className="c-help-section__address">
                      Lorem Ipsum
                      <br />
                      Jakarta Indonesia
                    </div>
                    <div className="c-help-section__phone">(+62) 877-xxxx-xxxx</div>
                  </div>
                </div>
                <Divider
                  style={{
                    borderColor: props.isMobile ? '#EFEEF4' : '#ededed',
                    borderWidth: 1,
                    margin: props.isMobile ? '18px 0 2px' : '30px 0 24px',
                  }}
                />
                <h2>{t('got-question')}</h2>
                <form className="c-help-section__form" onSubmit={handleSubmit(onSubmit)}>
                  <FormTextField
                    label={t('form:your-email-label')}
                    name="email"
                    placeholder={t('form:email-placeholder')}
                    schema={schema.email}
                    register={register}
                    errors={errors.email}
                    variant="full-width"
                  />
                  <FormTextArea
                    label={t('form:message-label')}
                    name="message"
                    placeholder={t('form:message-placeholder')}
                    schema={schema.message}
                    register={register}
                    errors={errors.message}
                    style={{ marginTop: props.isMobile ? 12 : 24, marginBottom: props.isMobile ? 16 : 24 }}
                  />
                  <Button
                    variant="outline"
                    width="100%"
                    color="black"
                    style={{ margin: '12px 0' }}
                    isLoading={isFetching}
                  >
                    {t('form:send-button')}
                  </Button>
                </form>
              </div>
            </Wrapper>
          </div>
          <div className="c-help-section__right">
            <Image src="/static/images/help-balloon.png" alt="help" />
          </div>
        </div>
      </div>
      {props.isMobile && <Footer />}
      <style jsx>{`
        .c-help-section {
          @apply flex w-full;
          margin-top: 4px;
          @screen md {
            margin-top: 36px;
          }
          &__left {
            @apply w-full;
            @screen md {
              width: 70%;
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
            @screen md {
              @apply pl-10;
              width: 30%;
            }
          }
          &__image {
            @apply mx-auto;
            height: 164px;
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
              @apply w-5/12;
            }
          }
          &__info {
            @apply w-full;
            @screen md {
              @apply w-7/12 text-base;
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

export default Help;
