import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from 'components/atoms/Card';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';
import Divider from 'components/atoms/Divider';
import FormTextField from 'components/molecules/FormTextField';
import NavBar from 'components/organisms/NavBar/mobile';
import api from 'services/api';
import Head from 'next/head';
import Footer from 'components/organisms/Footer';

const Register = (props: any): any => {
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const stepEnum = { WELCOME: 0, EMAIL: 1, DETAIL: 2 };
  const [registerStep, setRegisterStep] = useState(stepEnum.WELCOME);
  const [savedEmail, setSavedEmail] = useState('');
  const registerEmail = () => {
    setRegisterStep(stepEnum.EMAIL);
  };
  const schema = {
    email: {
      required: { value: true, message: `Email ${props.t('form:required-error')}` },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i, message: props.t('form:email-invalid') },
      validate: async value => {
        const { data } = await api().users.checkEmail({ email: value });
        return !data.exists || props.t('form:email-exists');
      }, // watch for duplicate email
    },
    name: { required: { value: true, message: `${props.t('form:name-label')} ${props.t('form:required-error')}` } },
    phone: { required: { value: true, message: `${props.t('form:phone-label')} ${props.t('form:required-error')}` } },
    password: {
      required: { value: true, message: `${props.t('password-label')} ${props.t('form:required-error')}` },
      minLength: { value: 6, message: props.t('form:minlength-6-error') },
    },
    confirmPassword: {
      required: { value: true, message: `${props.t('password-label')} ${props.t('form:required-error')}` },
      validate: value => value === watch('password') || props.t('form:password-different'),
    },
  };
  useEffect(() => {
    if (!formState.isValid) {
      toast.error(props.t('form:form-error'));
    }
  }, [errors]);
  const onSubmit = async data => {
    switch (registerStep) {
      case stepEnum.EMAIL:
        setSavedEmail(data.email);
        setRegisterStep(stepEnum.DETAIL);
        break;
      case stepEnum.DETAIL:
        props.thunkRegister({
          ...data,
          email: savedEmail,
          phone: data.phone.replace(/\s/g, ''),
        });
        break;
      default:
        break;
    }
  };
  const onBack = () => {
    switch (registerStep) {
      case stepEnum.EMAIL:
        setRegisterStep(stepEnum.WELCOME);
        break;
      case stepEnum.DETAIL:
        setRegisterStep(stepEnum.EMAIL);
        break;
      default:
        break;
    }
  };
  const Wrapper: any = props.isMobile ? 'div' : Card;
  return (
    <DefaultLayout
      {...props}
      navbar={
        props.isMobile && (
          <NavBar
            onBack={onBack}
            setSideNav={props.setSideNav}
            menuAction={registerStep === stepEnum.WELCOME}
            title={props.t('register')}
          />
        )
      }
    >
      <Head>
        <title>When I Grow Up | {props.t('register')}</title>
      </Head>
      <div className={`u-container ${props.isMobile ? 'u-container__page mb-16' : 'u-container__page--large'}`}>
        <div className="c-register">
          <Wrapper variant="border">
            <div className="c-register__container">
              {registerStep === stepEnum.WELCOME ? (
                <Fragment>
                  <img alt="welcome" className="c-register__image" src="/static/images/register-illus.png" />
                  <h1 className="c-register__title">{props.t('lets-join')}</h1>
                  <Button
                    onClick={registerEmail}
                    variant="outline"
                    width="100%"
                    color="black"
                    style={{ margin: '30px 0' }}
                  >
                    {`${props.t('register-with')} Email`}
                  </Button>
                  <Divider />
                  <Link href="/login">
                    <a className="c-register__link">
                      <span>{props.t('have-account')}</span>
                      {' ' + props.t('login')}
                    </a>
                  </Link>
                </Fragment>
              ) : (
                <form
                  className="c-register__form"
                  style={props.isMobile ? { minHeight: 'calc(100vh - 59px - 24px)' } : {}}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {registerStep === stepEnum.EMAIL && (
                    <Fragment>
                      <div>
                        <h1 className="c-register__title">{`${props.t('register-with')} Email`}</h1>
                        <FormTextField
                          label={props.t('form:email-label')}
                          name="email"
                          placeholder="example@yourdomain.com"
                          schema={schema.email}
                          register={register}
                          errors={errors.email}
                          variant="full-width"
                          hint={props.t('form:email-hint')}
                        />
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {props.t('form:continue-button')}
                        </Button>
                        <div onClick={onBack} className="c-register__link">
                          {props.t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {registerStep === stepEnum.DETAIL && (
                    <Fragment>
                      <div>
                        <h1 className="c-register__title" style={{ marginBottom: 8 }}>
                          {`${props.t('register-with')} Email`}
                        </h1>
                        <div className="c-register__saved-email">{savedEmail}</div>
                        <FormTextField
                          label={props.t('form:name-label')}
                          name="name"
                          placeholder={props.t('form:name-placeholder')}
                          schema={schema.name}
                          register={register}
                          errors={errors.name}
                          variant="full-width"
                        />
                        <FormTextField
                          label={props.t('form:phone-label')}
                          name="phone"
                          placeholder={props.t('form:phone-placeholder')}
                          schema={schema.phone}
                          register={register}
                          errors={errors.phone}
                          variant="full-width"
                          style={{ marginTop: 24 }}
                        />
                        <FormTextField
                          label={props.t('form:password-label')}
                          name="password"
                          placeholder={props.t('form:new-password-placeholder')}
                          schema={schema.password}
                          register={register}
                          errors={errors.password}
                          variant="full-width"
                          isPassword={true}
                          style={{ marginTop: 24 }}
                        />
                        <FormTextField
                          label={props.t('form:confirm-password-label')}
                          name="password_confirmation"
                          placeholder={props.t('form:confirm-password-placeholder')}
                          schema={schema.confirmPassword}
                          register={register}
                          errors={errors.confirmPassword}
                          variant="full-width"
                          isPassword={true}
                          style={{ marginTop: 24 }}
                        />
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {props.t('form:create-account-button')}
                        </Button>
                        <div onClick={onBack} className="c-register__link">
                          {props.t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                </form>
              )}
            </div>
          </Wrapper>
        </div>
      </div>
      {props.isMobile && <Footer isMobile={props.isMobile} />}
      <style jsx>{`
        .c-register {
          @apply mx-auto w-full;
          @screen md {
            padding-bottom: 243px;
            width: 445px;
          }
          &__container {
            text-align: center;
            @screen md {
              padding: 24px;
            }
          }
          &__form {
            @apply flex flex-col justify-between;
            @screen md {
              @apply relative;
            }
          }
          &__image {
            @apply mx-auto;
            margin-top: 12px;
            margin-bottom: 24px;
            height: 164px;
          }
          &__title {
            @apply font-semibold;
            font-size: 20px;
            line-height: 30px;
            margin: 4px 0 28px;
            @screen md {
              @apply font-bold;
              font-size: 28px;
              margin: 12px 0;
            }
          }
          &__subtitle {
            @apply font-opensans;
            line-height: 22px;
          }
          &__link {
            @apply font-semibold cursor-pointer text-sm;
            margin-bottom: 18px;
            color: #445ca4;
            @screen md {
              @apply text-base;
              margin-bottom: 0;
            }
            span {
              @apply font-normal;
              color: #333;
            }
          }
          &__saved-email {
            @apply w-full;
            border-radius: 60px;
            background: #f5f5f8;
            margin: 24px 0;
            padding: 10px;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['common', 'form'])(connect(mapStateToProps, mapDispatchToProps)(Register));
