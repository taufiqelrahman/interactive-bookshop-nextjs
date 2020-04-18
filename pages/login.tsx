import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link, Router } from 'i18n';
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from 'components/atoms/Card';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';
import Divider from 'components/atoms/Divider';
import FormTextField from 'components/molecules/FormTextField';
import NavBar from 'components/organisms/NavBar/mobile';
import Head from 'next/head';

const Login = (props: any): any => {
  const router = useRouter();
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const stepEnum = { WELCOME: 0, EMAIL: 1, FORGOT: 2, SENT: 3, RESET: 4 };
  const [loginStep, setLoginStep] = useState(stepEnum.WELCOME);
  const [resetData, setResetData] = useState({
    email: '',
    token: '',
  });
  const schema = {
    email: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { required: true },
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
  useEffect(() => {
    const { reset, token, email }: any = router.query;
    if (reset === '1') {
      setLoginStep(4);
      setResetData({ email, token });
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
  const onSubmit = data => {
    switch (loginStep) {
      case stepEnum.EMAIL:
        props.thunkLogin({ ...data, from: Router.query.from });
        break;
      case stepEnum.FORGOT:
        props.thunkForgotPassword(data);
        setLoginStep(stepEnum.SENT);
        break;
      case stepEnum.RESET:
        const { email, token } = resetData;
        props.thunkResetPassword({ ...data, email, token });
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
        Router.push('/');
        break;
      default:
        break;
    }
  };
  const Wrapper: any = props.isMobile ? 'div' : Card;
  const loginFacebook = () => {
    window.location.href = `${process.env.API_URL}/redirect-facebook`;
  };
  const loginGoogle = () => {
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
            title={props.t('login')}
          />
        )
      }
    >
      <Head>
        <title>When I Grow Up | {props.t('login')}</title>
      </Head>
      <div className={`u-container ${props.isMobile ? 'u-container__page' : 'u-container__page--large'}`}>
        <div className="c-login">
          <Wrapper variant="border">
            <div className="c-login__container">
              {loginStep === stepEnum.WELCOME && (
                <Fragment>
                  <img className="c-login__image" src="/static/images/welcome.png" />
                  <h1 className="c-login__title">{props.t('welcome-back')}</h1>
                  <Button
                    onClick={loginGoogle}
                    variant="outline"
                    width="100%"
                    color="black"
                    style={{ margin: '12px 0' }}
                  >
                    {`${props.t('login-with')} Google`}
                  </Button>
                  <Button
                    onClick={loginFacebook}
                    variant="outline"
                    width="100%"
                    color="black"
                    style={{ margin: '12px 0' }}
                  >
                    {`${props.t('login-with')} Facebook`}
                  </Button>
                  <div onClick={loginEmail} className="c-login__link" style={{ marginBottom: 24, marginTop: 24 }}>
                    {`${props.t('login-with')} Email`}
                  </div>
                  <Divider />
                  <Link href="/register">
                    <a className="c-login__link">
                      <span>{props.t('no-account')}</span>
                      {' ' + props.t('register')}
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
                        <h1 className="c-login__title">{`${props.t('login-with')} Email`}</h1>
                        <FormTextField
                          label={props.t('form:email-label')}
                          name="email"
                          placeholder="example@yourdomain.com"
                          schema={schema.email}
                          register={register}
                          errors={errors.email}
                          variant="full-width"
                        />
                        <FormTextField
                          label={props.t('form:password-label')}
                          name="password"
                          placeholder={props.t('form:password-placeholder')}
                          schema={schema.password}
                          register={register}
                          errors={errors.password}
                          variant="full-width"
                          isPassword={true}
                          style={{ marginTop: 24 }}
                        />
                        <div
                          onClick={forgotPassword}
                          className="c-login__link"
                          style={{ margin: '12px 0', textAlign: 'left' }}
                        >
                          {props.t('forgot-password')}
                        </div>
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {props.t('login')}
                        </Button>
                        <div onClick={onBack} className="c-login__link">
                          {props.t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {loginStep === stepEnum.FORGOT && (
                    <Fragment>
                      <div>
                        <h1 className="c-login__title" style={{ marginBottom: 12 }}>
                          {props.t('form:reset-title')}
                        </h1>
                        <div className="c-login__subtitle">{props.t('form:reset-subtitle')}</div>
                        <FormTextField
                          label={props.t('form:email-label')}
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
                          {props.t('form:reset-send')}
                        </Button>
                        <div onClick={onBack} className="c-login__link">
                          {props.t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {loginStep === stepEnum.RESET && (
                    <Fragment>
                      <div>
                        <h1 className="c-login__title" style={{ marginBottom: 12 }}>
                          {props.t('form:reset-title')}
                        </h1>
                        <div className="c-login__saved-email">{resetData.email}</div>
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
                          errors={errors.password_confirmation}
                          variant="full-width"
                          isPassword={true}
                          style={{ marginTop: 24 }}
                        />
                      </div>
                      <div>
                        <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                          {props.t('form:reset-button')}
                        </Button>
                        <div onClick={onBack} className="c-login__link">
                          {props.t('go-back')}
                        </div>
                      </div>
                    </Fragment>
                  )}
                </form>
              )}
              {loginStep === stepEnum.SENT && (
                <div className="c-login__form">
                  <div>
                    <img className="c-login__image" src="/static/images/welcome.png" />
                    <h1 className="c-login__title" style={{ marginBottom: 12 }}>
                      {props.t('form:email-sent-title')}
                    </h1>
                    <div className="c-login__subtitle">{props.t('form:email-sent-subtitle')}</div>
                  </div>
                  <div>
                    <Button onClick={onBack} width="100%" style={{ margin: '30px 0' }}>
                      {props.t('go-back')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Wrapper>
        </div>
      </div>
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

export default withTranslation(['common', 'form'])(connect(mapStateToProps, mapDispatchToProps)(Login));
