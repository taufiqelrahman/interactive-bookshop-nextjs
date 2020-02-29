import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link, Router } from 'i18n';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from 'components/atoms/Card';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';
import Divider from 'components/atoms/Divider';
import FormTextField from 'components/molecules/FormTextField';
import NavBar from 'components/organisms/mobile/NavBar';

const Login = (props: any): any => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
  });
  const stepEnum = { WELCOME: 0, EMAIL: 1, RESET: 2, SENT: 3 };
  const [loginStep, setLoginStep] = useState(stepEnum.WELCOME);
  const onSubmit = data => {
    props.thunkLogin({ ...data, from: Router.query.from });
  };
  const onReset = data => {
    console.log(data);
    setLoginStep(stepEnum.SENT);
  };
  const loginEmail = () => {
    setLoginStep(stepEnum.EMAIL);
  };
  const forgotPassword = () => {
    setLoginStep(stepEnum.RESET);
  };
  const goBack = () => {
    setLoginStep(stepEnum.WELCOME);
  };
  const schema = {
    email: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { required: true },
  };
  useEffect(() => {
    if (!formState.isValid) {
      toast.error(props.t('form:form-error'));
    }
  }, [errors]);
  const Wrapper: any = props.isMobile ? 'div' : Card;
  const formClass = `c-login__form ${props.isMobile ? 'h-min-screen' : ''}`;
  const onBack = () => {
    switch (loginStep) {
      case stepEnum.EMAIL:
        setLoginStep(stepEnum.WELCOME);
        break;
      case stepEnum.RESET:
      case stepEnum.SENT:
        setLoginStep(stepEnum.EMAIL);
        break;
      default:
        break;
    }
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
      <div className={`u-container ${props.isMobile ? 'u-container__page' : 'u-container__page--large'}`}>
        <div className="c-login">
          <Wrapper variant="border">
            <div className="c-login__container">
              {loginStep === stepEnum.WELCOME && (
                <div>
                  <img className="c-login__image" src="/static/images/welcome.png" />
                  <h1 className="c-login__title">{props.t('welcome-back')}</h1>
                  <Button variant="outline" width="100%" color="black" style={{ margin: '12px 0' }}>
                    {`${props.t('login-with')} Goggle`}
                  </Button>
                  <Button variant="outline" width="100%" color="black" style={{ margin: '12px 0' }}>
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
                </div>
              )}
              {loginStep === stepEnum.EMAIL && (
                <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <h1 className="c-login__title">{`${props.t('login-with')} Email`}</h1>
                    <FormTextField
                      label={props.t('form:email-label')}
                      name="email"
                      placeholder="example@yourdomain.com"
                      ref={register(schema.email)}
                      errors={errors.email}
                      variant="full-width"
                    />
                    <FormTextField
                      label={props.t('form:password-label')}
                      name="password"
                      placeholder={props.t('form:password-placeholder')}
                      ref={register(schema.password)}
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
                    <div onClick={goBack} className="c-login__link">
                      {props.t('go-back')}
                    </div>
                  </div>
                </form>
              )}
              {loginStep === stepEnum.RESET && (
                <form className={formClass} onSubmit={handleSubmit(onReset)}>
                  <div>
                    <h1 className="c-login__title" style={{ marginBottom: 12 }}>
                      {props.t('form:reset-title')}
                    </h1>
                    <div className="c-login__subtitle">{props.t('form:reset-subtitle')}</div>
                    <FormTextField
                      label={props.t('form:email-label')}
                      name="email"
                      placeholder="example@yourdomain.com"
                      ref={register(schema.email)}
                      errors={errors.email}
                      variant="full-width"
                      style={{ marginTop: 24 }}
                    />
                  </div>
                  <div>
                    <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                      {props.t('form:reset-send')}
                    </Button>
                    <div onClick={goBack} className="c-login__link">
                      {props.t('go-back')}
                    </div>
                  </div>
                </form>
              )}
              {loginStep === stepEnum.SENT && (
                <div className={formClass}>
                  <div>
                    <img className="c-login__image" src="/static/images/welcome.png" />
                    <h1 className="c-login__title" style={{ marginBottom: 12 }}>
                      {props.t('form:email-sent-title')}
                    </h1>
                    <div className="c-login__subtitle">{props.t('form:email-sent-subtitle')}</div>
                  </div>
                  <div>
                    <Button onClick={goBack} width="100%" style={{ margin: '30px 0' }}>
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
              margin: 12px 0;
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
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['common', 'form'])(connect(mapStateToProps, mapDispatchToProps)(Login));
