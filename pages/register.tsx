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

const Register = (props: any): any => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
  });
  const stepEnum = { WELCOME: 0, EMAIL: 1, DETAIL: 2, GOOGLE: 3 };
  const [registerStep, setRegisterStep] = useState(stepEnum.WELCOME);
  const onSubmit = data => {
    props.thunkRegister(data);
  };
  const submitEmail = data => {
    console.log(data);
    setRegisterStep(stepEnum.DETAIL);
  };
  const registerEmail = () => {
    setRegisterStep(stepEnum.EMAIL);
  };
  const registerGoogle = () => {
    setRegisterStep(stepEnum.GOOGLE);
  };
  const goBack = () => {
    setRegisterStep(stepEnum.WELCOME);
  };
  const schema = {
    email: {
      required: { value: true, message: `Email ${props.t('required-error')}` },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: props.t('invalid-email') },
      // validate: async value => await fetch(url) // watch for duplicate email
    },
    phone: { required: true },
    password: { required: true },
    confirmPassword: { required: true },
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
          <div className="c-register">
            <Card variant="border" style={{ marginTop: 61 }}>
              <div className="c-register__container">
                {registerStep === stepEnum.WELCOME && (
                  <div>
                    <img className="c-register__image" src="/static/images/welcome.png" />
                    <h1 className="c-register__title">{props.t('lets-join')}</h1>
                    <Button variant="outline" width="100%" color="black" style={{ margin: '12px 0' }}>
                      {props.t('register-google')}
                    </Button>
                    <Button variant="outline" width="100%" color="black" style={{ margin: '12px 0' }}>
                      {props.t('register-facebook')}
                    </Button>
                    <div
                      onClick={registerEmail}
                      className="c-register__link"
                      style={{ marginBottom: 24, marginTop: 18 }}
                    >
                      {props.t('register-email')}
                    </div>
                    <Divider />
                    <Link href="/login">
                      <a className="c-register__link">
                        <span>{props.t('have-account')}</span>
                        {' ' + props.t('login')}
                      </a>
                    </Link>
                  </div>
                )}
                {registerStep === stepEnum.EMAIL && (
                  <form onSubmit={handleSubmit(submitEmail)}>
                    <h1 className="c-register__title">{props.t('register-email')}</h1>
                    <FormTextField
                      label={props.t('form:email-label')}
                      name="email"
                      placeholder="example@yourdomain.com"
                      ref={register(schema.email)}
                      errors={errors.email}
                      variant="full-width"
                      hint={props.t('form:email-hint')}
                    />
                    <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                      {props.t('continue')}
                    </Button>
                    <div onClick={goBack} className="c-register__link">
                      {props.t('go-back')}
                    </div>
                  </form>
                )}
                {/* {registerStep === stepEnum.RESET && (
                  <form onSubmit={handleSubmit(onReset)}>
                    <h1 className="c-register__title">{props.t('form:reset-title')}</h1>
                    <div className="c-register__subtitle">{props.t('form:reset-subtitle')}</div>
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
                    <div onClick={goBack} className="c-register__link">
                      {props.t('go-back')}
                    </div>
                  </form>
                )} */}
                {/* {registerStep === stepEnum.SENT && (
                  <div>
                    <img className="c-register__image" src="/static/images/welcome.png" />
                    <h1 className="c-register__title">{props.t('form:email-sent-title')}</h1>
                    <div className="c-register__subtitle">{props.t('form:email-sent-subtitle')}</div>
                    <Button onClick={goBack} width="100%" style={{ margin: '30px 0' }}>
                      {props.t('go-back')}
                    </Button>
                  </div>
                )} */}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-register {
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

export default withTranslation(['common', 'form'])(connect(mapStateToProps, mapDispatchToProps)(Register));
