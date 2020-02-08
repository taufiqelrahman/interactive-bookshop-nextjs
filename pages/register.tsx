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
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
  });
  const stepEnum = { WELCOME: 0, EMAIL: 1, DETAIL: 2, GOOGLE: 3 };
  const [registerStep, setRegisterStep] = useState(stepEnum.WELCOME);
  const [savedEmail, setSavedEmail] = useState('');
  const onSubmit = data => {
    console.log({ ...data, email: savedEmail });
  };
  const submitEmail = data => {
    console.log(data);
    setSavedEmail(data.email);
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
      required: { value: true, message: `Email ${props.t('form:required-error')}` },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: props.t('form:email-invalid') },
      // validate: async value => await fetch(url) // watch for duplicate email
    },
    phone: { required: { value: true, message: `${props.t('form:phone-label')} ${props.t('form:required-error')}` } },
    password: { required: { value: true, message: `Password ${props.t('form:required-error')}` } },
    confirmPassword: {
      required: { value: true, message: `Password ${props.t('form:required-error')}` },
      validate: value => value === watch('password') || props.t('form:password-different'),
    },
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
                      {`${props.t('register-with')} Goggle`}
                    </Button>
                    <Button variant="outline" width="100%" color="black" style={{ margin: '12px 0' }}>
                      {`${props.t('register-with')} Facebook`}
                    </Button>
                    <div
                      onClick={registerEmail}
                      className="c-register__link"
                      style={{ marginBottom: 24, marginTop: 18 }}
                    >
                      {`${props.t('register-with')} Email`}
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
                    <h1 className="c-register__title">{`${props.t('register-with')} Email`}</h1>
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
                      {props.t('form:continue-button')}
                    </Button>
                    <div onClick={goBack} className="c-register__link">
                      {props.t('go-back')}
                    </div>
                  </form>
                )}
                {registerStep === stepEnum.DETAIL && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="c-register__title">{`${props.t('register-with')} Email`}</h1>
                    <div className="c-register__saved-email">{savedEmail}</div>
                    <FormTextField
                      label={props.t('form:phone-label')}
                      name="phone"
                      placeholder={props.t('form:phone-placeholder')}
                      ref={register(schema.phone)}
                      errors={errors.phone}
                      variant="full-width"
                      type="number"
                    />
                    <FormTextField
                      label={props.t('form:password-label')}
                      name="password"
                      placeholder={props.t('form:new-password-placeholder')}
                      ref={register(schema.password)}
                      errors={errors.password}
                      variant="full-width"
                      isPassword={true}
                      style={{ marginTop: 24 }}
                    />
                    <FormTextField
                      label={props.t('form:confirm-password-label')}
                      name="confirmPassword"
                      placeholder={props.t('form:confirm-password-placeholder')}
                      ref={register(schema.confirmPassword)}
                      errors={errors.confirmPassword}
                      variant="full-width"
                      isPassword={true}
                      style={{ marginTop: 24 }}
                    />
                    <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
                      {props.t('form:create-account-button')}
                    </Button>
                    <div onClick={goBack} className="c-register__link">
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
