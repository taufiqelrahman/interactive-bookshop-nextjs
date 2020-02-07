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
  const onSubmit = data => {
    console.log(data);
  };
  const stepEnum = { WELCOME: 0, EMAIL: 1, RESET: 2, SENT: 3 };
  const [loginStep, setLoginStep] = useState(stepEnum.WELCOME);
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
    email: { required: true },
    password: { required: true },
  };
  useEffect(() => {
    if (!formState.isValid) {
      toast.error(props.t('form-error'));
    }
  }, [errors]);
  return (
    <DefaultLayout isLoggedIn={{}} cart={{}}>
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
                      {props.t('login-google')}
                    </Button>
                    <Button variant="outline" width="100%" color="black" style={{ margin: '12px 0' }}>
                      {props.t('login-facebook')}
                    </Button>
                    <div onClick={loginEmail} className="c-login__link" style={{ marginBottom: 24, marginTop: 18 }}>
                      {props.t('login-email')}
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
                    <h1 className="c-login__title">{props.t('login-email')}</h1>
                    <FormTextField
                      label={props.t('email-label')}
                      name="email"
                      placeholder="example@yourdomain.com"
                      ref={register(schema.email)}
                      errors={errors.email}
                      variant="full-width"
                    />
                    <FormTextField
                      label={props.t('password-label')}
                      name="password"
                      placeholder={props.t('password-placeholder')}
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Login));
