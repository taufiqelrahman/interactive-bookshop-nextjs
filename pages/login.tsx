import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from 'components/atoms/Card';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';
import Divider from 'components/atoms/Divider';
import FormTextField from 'components/molecules/FormTextField';

const Login = (props: any): any => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
  });
  const stepEnum = { WELCOME: 0, EMAIL: 1, RESET: 2, SENT: 3 };
  const [loginStep, setLoginStep] = useState(stepEnum.WELCOME);
  const onSubmit = data => {
    props.thunkLogin(data);
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
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey h-min-screen">
        <div className="u-container">
          <div className="c-login">
            <Card variant="border" style={{ marginTop: 61 }}>
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
                    <div onClick={loginEmail} className="c-login__link" style={{ marginBottom: 24, marginTop: 18 }}>
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
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                      {props.t('login')}
                    </Button>
                    <div onClick={goBack} className="c-login__link">
                      {props.t('go-back')}
                    </div>
                  </form>
                )}
                {loginStep === stepEnum.RESET && (
                  <form onSubmit={handleSubmit(onReset)}>
                    <h1 className="c-login__title">{props.t('form:reset-title')}</h1>
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
                    <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                      {props.t('form:reset-send')}
                    </Button>
                    <div onClick={goBack} className="c-login__link">
                      {props.t('go-back')}
                    </div>
                  </form>
                )}
                {loginStep === stepEnum.SENT && (
                  <div>
                    <img className="c-login__image" src="/static/images/welcome.png" />
                    <h1 className="c-login__title">{props.t('form:email-sent-title')}</h1>
                    <div className="c-login__subtitle">{props.t('form:email-sent-subtitle')}</div>
                    <Button onClick={goBack} width="100%" style={{ margin: '30px 0' }}>
                      {props.t('go-back')}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-login {
          @apply mx-auto w-full;
          margin-bottom: 243px;
          @screen md {
            width: 445px;
          }
          &__container {
            padding: 24px;
            text-align: center;
          }
          &__image {
            @apply mx-auto;
            margin-top: 12px;
            margin-bottom: 24px;
          }
          &__title {
            @apply font-bold;
            font-size: 28px;
            line-height: 42px;
            margin: 12px 0;
          }
          &__subtitle {
            @apply font-opensans;
            line-height: 22px;
          }
          &__link {
            @apply font-semibold cursor-pointer;
            color: #445ca4;
            span {
              @apply font-normal;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['common', 'form'])(connect(mapStateToProps, mapDispatchToProps)(Login));
