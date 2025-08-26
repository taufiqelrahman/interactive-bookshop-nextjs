import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import * as gtag from 'lib/gtag';
import actions from 'store/actions';
// import Footer from 'components/organisms/Footer';

const Card = dynamic(() => import('components/atoms/Card'));
const Button = dynamic(() => import('components/atoms/Button'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const FormTextField = dynamic(() => import('components/molecules/FormTextField'));

const Login = (props: any): any => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const stepEnum = { WELCOME: 0, EMAIL: 1, FORGOT: 2, SENT: 3, RESET: 4 };
  const [loginStep, setLoginStep] = useState(stepEnum.WELCOME);
  const [isTransit, setIsTransit] = useState(false); // only for facebook & google redirects
  const [resetData, setResetData] = useState({
    email: '',
    token: '',
  });
  const schema = {
    // eslint-disable-next-line no-useless-escape
    email: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { required: true },
    confirmPassword: {
      required: { value: true, message: `${t('form:password-label')} ${t('form:required-error')}` },
      validate: (value) => value === watch('password') || t('form:password-different'),
    },
  };
  useEffect(() => {
    if (!formState.isValid) {
      toast.error(t('form:form-error'));
    }
  }, [errors]);
  useEffect(() => {
    const { reset, token, email, social, code, state }: any = router.query;
    const DATA = { code, state };
    if (reset === '1') {
      setLoginStep(4);
      setResetData({ email, token });
    } else if (social === 'google') {
      setIsTransit(true);
      dispatch(actions.thunkLoginGoogle(DATA));
    } else if (social === 'facebook') {
      setIsTransit(true);
      dispatch(actions.thunkLoginFacebook(DATA));
    } else {
      setLoginStep(0);
      setResetData({ email: '', token: '' });
    }
  }, [router.query]);
  const loginEmail = () => {
    setLoginStep(stepEnum.EMAIL);
  };
  const forgotPassword = () => {
    setLoginStep(stepEnum.FORGOT);
  };
  const onSubmit = (data) => {
    const { email, token } = resetData;
    switch (loginStep) {
      case stepEnum.EMAIL:
        gtag.event({
          action: 'login',
          category: 'engagement',
          label: 'email',
        });
        dispatch(actions.thunkLogin({ ...data, from: router.query.from }));
        break;
      case stepEnum.FORGOT:
        dispatch(actions.thunkForgotPassword(data));
        setLoginStep(stepEnum.SENT);
        break;
      case stepEnum.RESET:
        dispatch(actions.thunkResetPassword({ ...data, email, token }));
        break;
      default:
        break;
    }
  };
  const onBack = () => {
    switch (loginStep) {
      case stepEnum.EMAIL:
        setLoginStep(stepEnum.WELCOME);
        break;
      case stepEnum.FORGOT:
      case stepEnum.SENT:
        setLoginStep(stepEnum.EMAIL);
        break;
      case stepEnum.RESET:
        router.push('/');
        break;
      default:
        break;
    }
  };
  const Wrapper: any = props.isMobile ? 'div' : Card;
  const loginFacebook = () => {
    const { from }: any = router.query;
    if (from) localStorage.setItem('from', from);
    gtag.event({
      action: 'login',
      category: 'engagement',
      label: 'facebook',
    });
    window.location.href = `${process.env.API_URL}/redirect-facebook`;
  };
  const loginGoogle = () => {
    const { from }: any = router.query;
    if (from) localStorage.setItem('from', from);
    gtag.event({
      action: 'login',
      category: 'engagement',
      label: 'google',
    });
    window.location.href = `${process.env.API_URL}/redirect-google`;
  };
  return (
    <DefaultLayout
      {...props}
      navbar={
        props.isMobile && (
          <NavBar
            onBack={onBack}
            setSideNav={props.setSideNav}
            menuAction={loginStep === stepEnum.WELCOME}
            title={t('login')}
          />
        )
      }
    >
      <Head>
        <title>When I Grow Up | {t('login')}</title>
      </Head>
      <div className={`u-container ${props.isMobile ? 'u-container__page' : 'u-container__page--large'}`}>
        <div className="c-login">
          <Wrapper variant="border">
            <div className="c-login__container">
              {loginStep === stepEnum.WELCOME && (
                <Fragment>
                  <img alt="welcome" className="c-login__image" src="/static/images/login-illus.png" />
                  <h1 className="c-login__title">{isTransit ? t('please-wait') : t('welcome-back')}</h1>
                  <Button
                    name="google"
                    onClick={loginGoogle}
                    variant="outline"
                    width="100%"
                    color="black"
                    style={{ margin: '12px 0' }}
                    isLoading={isTransit && router.query.social === 'google'}
                  >
                    {`${t('login-with')} Google`}
                  </Button>
                  <Button
                    name="facebook"
                    onClick={loginFacebook}
                    variant="outline"
                    width="100%"
                    color="black"
                    style={{ margin: '12px 0' }}
                    isLoading={isTransit && router.query.social === 'facebook'}
                  >
                    {`${t('login-with')} Facebook`}
                  </Button>
                  <div
                    data-testid="email"
                    onClick={loginEmail}
                    className="c-login__link"
                    style={{ marginBottom: 24, marginTop: 24 }}
                  >
                    {`${t('login-with')} Email`}
                  </div>
                  <Divider />
                  <Link href="/register">
                    <a className="c-login__link">
                      <span>{t('no-account')}</span>
                      {' ' + t('register')}
                    </a>
                  </Link>
                </Fragment>
              )}
              {[stepEnum.EMAIL, stepEnum.FORGOT, stepEnum.RESET].includes(loginStep) && (
                <form
                  className="c-login__form"
                  style={props.isMobile ? { minHeight: 'calc(100vh - 59px - 24px)' } : {}}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {loginStep === stepEnum.EMAIL && (
                    <Fragment>
                      <div>
                        <h1 className="c-login__title">{`${t('login-with')} Email`}</h1>
                        <FormTextField
                          label={t('form:email-label')}
                          name="email"
                          placeholder="example@yourdomain.com"
                          schema={schema.email}
                          register={register}
                          errors={errors.email}
                          variant="full-width"
                        />
                        <FormTextField
                          label={t('form:password-label')}
                          name="password"
                          placeholder={t('form:password-placeholder')}
                          schema={schema.password}
                          register={register}
                          errors={errors.password}
                          variant="full-width"
                          isPassword={true}
                          formStyle={{ marginTop: 24 }}
                        />
                        <div
                          data-testid="submit"
                          onClick={forgotPassword}
                          className="c-login__link"
                          style={{ margin: '12px 0', textAlign: 'left' }}
                        >
                          {t('forgot-password')}
                        </div>
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {t('login')}
                        </Button>
                        <div onClick={onBack} className="c-login__link">
                          {t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {loginStep === stepEnum.FORGOT && (
                    <Fragment>
                      <div>
                        <h1 className="c-login__title" style={{ marginBottom: 12 }}>
                          {t('form:reset-title')}
                        </h1>
                        <div className="c-login__subtitle">{t('form:reset-subtitle')}</div>
                        <FormTextField
                          label={t('form:email-label')}
                          name="email"
                          placeholder="example@yourdomain.com"
                          schema={schema.email}
                          register={register}
                          errors={errors.email}
                          variant="full-width"
                          style={{ marginTop: 24 }}
                        />
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {t('form:reset-send')}
                        </Button>
                        <div onClick={onBack} className="c-login__link">
                          {t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {loginStep === stepEnum.RESET && (
                    <Fragment>
                      <div>
                        <h1 className="c-login__title" style={{ marginBottom: 12 }}>
                          {t('form:reset-title')}
                        </h1>
                        <div className="c-login__saved-email">{resetData.email}</div>
                        <FormTextField
                          label={t('form:password-label')}
                          name="password"
                          placeholder={t('form:new-password-placeholder')}
                          schema={schema.password}
                          register={register}
                          errors={errors.password}
                          variant="full-width"
                          isPassword={true}
                          style={{ marginTop: 24 }}
                        />
                        <FormTextField
                          label={t('form:confirm-password-label')}
                          name="password_confirmation"
                          placeholder={t('form:confirm-password-placeholder')}
                          schema={schema.confirmPassword}
                          register={register}
                          errors={errors.password_confirmation}
                          variant="full-width"
                          isPassword={true}
                          style={{ marginTop: 24 }}
                        />
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {t('form:reset-button')}
                        </Button>
                        <div onClick={onBack} className="c-login__link">
                          {t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                </form>
              )}
              {loginStep === stepEnum.SENT && (
                <div className="c-login__form">
                  <div>
                    <img alt="welcome" className="c-login__image" src="/static/images/welcome.png" />
                    <h1 className="c-login__title" style={{ marginBottom: 12 }}>
                      {t('form:email-sent-title')}
                    </h1>
                    <div className="c-login__subtitle">{t('form:email-sent-subtitle')}</div>
                  </div>
                  <div>
                    <Button onClick={onBack} width="100%" style={{ margin: '30px 0' }}>
                      {t('go-back')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Wrapper>
        </div>
      </div>
      {/* {props.isMobile && <Footer isMobile={props.isMobile} />} */}
      <style jsx>{`
        .c-login {
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
              margin: 12px 0 24px;
            }
          }
          &__subtitle {
            @apply font-opensans text-sm;
            line-height: 19px;
            @screen md {
              @apply text-base;
              line-height: 22px;
            }
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

export default Login;
