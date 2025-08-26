import debouncePromise from 'awesome-debounce-promise';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect, Fragment, ElementType } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import api from 'services/api';
import actions from 'store/actions';
// import Footer from 'components/organisms/Footer';

const Card = dynamic(() => import('components/atoms/Card'));
const Button = dynamic(() => import('components/atoms/Button'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const FormTextField = dynamic(() => import('components/molecules/FormTextField'));

interface RegisterProps {
  t: (key: string) => string;
  isMobile: boolean;
  setSideNav: (open: boolean) => void;
  thunkRegister: (data: RegisterFormData) => void;
  state: {
    [key: string]: unknown;
  };
}

type RegisterFormData = {
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

enum RegisterStep {
  WELCOME = 0,
  EMAIL = 1,
  DETAIL = 2,
}

const Register: React.FC<RegisterProps> = (props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const methods = useForm<RegisterFormData>({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const [registerStep, setRegisterStep] = useState<RegisterStep>(RegisterStep.WELCOME);
  const [savedEmail, setSavedEmail] = useState<string>('');
  const registerEmail = () => setRegisterStep(RegisterStep.EMAIL);
  const schema = {
    email: {
      required: { value: true, message: `Email ${t('form:required-error')}` },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i, message: t('form:email-invalid') },
      validate: debouncePromise(async (value: string) => {
        const { data } = await api().users.checkEmail({ email: value });
        return !data.exists || t('form:email-exists');
      }, 500),
    },
    name: {
      required: { value: true, message: `${t('form:name-label')} ${t('form:required-error')}` },
      maxLength: 255,
    },
    phone: { required: { value: true, message: `${t('form:phone-label')} ${t('form:required-error')}` } },
    password: {
      required: { value: true, message: `${t('form:password-label')} ${t('form:required-error')}` },
      minLength: { value: 6, message: t('form:minlength-6-error') },
    },
    confirmPassword: {
      required: { value: true, message: `${t('form:password-label')} ${t('form:required-error')}` },
      validate: (value: string) => value === watch('password') || t('form:password-different'),
    },
  };
  useEffect(() => {
    if (!formState.isValid) {
      toast.error(t('form:form-error'));
    }
  }, [errors]);
  const onSubmit = async (data: RegisterFormData) => {
    switch (registerStep) {
      case RegisterStep.EMAIL:
        setSavedEmail(data.email);
        setRegisterStep(RegisterStep.DETAIL);
        break;
      case RegisterStep.DETAIL:
        dispatch(
          actions.thunkRegister({
            ...data,
            email: savedEmail,
            phone: data.phone.replace(/\s/g, ''),
          }),
        );
        break;
      default:
        break;
    }
  };
  const onBack = () => {
    switch (registerStep) {
      case RegisterStep.EMAIL:
        setRegisterStep(RegisterStep.WELCOME);
        break;
      case RegisterStep.DETAIL:
        setRegisterStep(RegisterStep.EMAIL);
        break;
      default:
        break;
    }
  };
  const Wrapper: ElementType = props.isMobile ? 'div' : Card;
  return (
    <DefaultLayout
      {...props}
      navbar={
        props.isMobile && (
          <NavBar
            onBack={onBack}
            setSideNav={props.setSideNav}
            menuAction={registerStep === RegisterStep.WELCOME}
            title={t('register')}
          />
        )
      }
    >
      <Head>
        <title>When I Grow Up | {t('register')}</title>
      </Head>
      <div className={`u-container ${props.isMobile ? 'u-container__page' : 'u-container__page--large'}`}>
        <div className="c-register">
          <Wrapper {...(!props.isMobile && { variant: 'border' })}>
            <div className="c-register__container">
              {registerStep === RegisterStep.WELCOME ? (
                <Fragment>
                  <img alt="welcome" className="c-register__image" src="/static/images/register-illus.png" />
                  <h1 className="c-register__title">{t('lets-join')}</h1>
                  <Button
                    onClick={registerEmail}
                    variant="outline"
                    width="100%"
                    color="black"
                    style={{ margin: '30px 0' }}
                  >
                    {`${t('register-with')} Email`}
                  </Button>
                  <Divider />
                  <Link href="/login">
                    <a className="c-register__link">
                      <span>{t('have-account')}</span>
                      {' ' + t('login')}
                    </a>
                  </Link>
                </Fragment>
              ) : (
                <form
                  className="c-register__form"
                  style={props.isMobile ? { minHeight: 'calc(100vh - 59px - 24px)' } : {}}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {registerStep === RegisterStep.EMAIL && (
                    <Fragment>
                      <div>
                        <h1 className="c-register__title">{`${t('register-with')} Email`}</h1>
                        <FormTextField
                          label={t('form:email-label')}
                          name="email"
                          placeholder="example@yourdomain.com"
                          schema={schema.email}
                          register={register}
                          errors={errors.email}
                          variant="full-width"
                          hint={t('form:email-hint')}
                        />
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {t('form:continue-button')}
                        </Button>
                        <div onClick={onBack} className="c-register__link">
                          {t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {registerStep === RegisterStep.DETAIL && (
                    <Fragment>
                      <div>
                        <h1 className="c-register__title" style={{ marginBottom: 8 }}>
                          {`${t('register-with')} Email`}
                        </h1>
                        <div className="c-register__saved-email">{savedEmail}</div>
                        <FormTextField
                          label={t('form:name-label')}
                          name="name"
                          placeholder={t('form:name-placeholder')}
                          schema={schema.name}
                          register={register}
                          errors={errors.name}
                          variant="full-width"
                        />
                        <FormTextField
                          label={t('form:phone-label')}
                          name="phone"
                          placeholder={t('form:phone-placeholder')}
                          schema={schema.phone}
                          register={register}
                          errors={errors.phone}
                          variant="full-width"
                          formStyle={{ marginTop: 24 }}
                        />
                        <FormTextField
                          label={t('form:password-label')}
                          name="password"
                          placeholder={t('form:new-password-placeholder')}
                          schema={schema.password}
                          register={register}
                          errors={errors.password}
                          variant="full-width"
                          isPassword={true}
                          formStyle={{ marginTop: 24 }}
                        />
                        <FormTextField
                          label={t('form:confirm-password-label')}
                          name="password_confirmation"
                          placeholder={t('form:confirm-password-placeholder')}
                          schema={schema.confirmPassword}
                          register={register}
                          errors={errors.confirmPassword}
                          variant="full-width"
                          isPassword={true}
                          formStyle={{ marginTop: 24 }}
                        />
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {t('form:create-account-button')}
                        </Button>
                        <div onClick={onBack} className="c-register__link">
                          {t('go-back')}
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
      {/* {props.isMobile && <Footer isMobile={props.isMobile} />} */}
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
            @apply cursor-pointer text-sm font-semibold;
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

export default Register;
