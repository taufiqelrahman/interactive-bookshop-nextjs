import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import Card from 'components/atoms/Card';
import NavBar from 'components/organisms/NavBar/mobile';
import { useState, Fragment } from 'react';
import TextField from 'components/atoms/TextField';
import Button from 'components/atoms/Button';
import { useForm } from 'react-hook-form';
import api from 'services/api';
import Modal from 'components/atoms/Modal';

const Account = (props: any): any => {
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
  });
  const { user } = props.state.users;
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({
    name: {
      isEdit: false,
      value: '',
    },
    email: {
      isEdit: false,
      value: '',
    },
    phone: {
      isEdit: false,
      value: '',
    },
    password: {
      isEdit: false,
      value: '',
    },
    address: {
      isEdit: false,
      value: '',
    },
  });
  const editField = (type, isClear, value?): any => {
    setState({
      ...state,
      [type]: {
        isEdit: !isClear,
        value: isClear ? '' : value,
      },
    });
  };
  const schema = {
    name: { required: true },
    email: {
      required: { value: true, message: `Email ${props.t('form:required-error')}` },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i, message: props.t('form:email-invalid') },
      validate: async value => {
        const { data } = await api().users.checkEmailChange({ email: value });
        return !data.exists || props.t('form:email-exists');
      }, // watch for duplicate email
    },
    phone: { required: { value: true, message: `${props.t('form:phone-label')} ${props.t('form:required-error')}` } },
    password: { required: true },
    confirmPassword: {
      required: { value: true, message: `Password ${props.t('form:required-error')}` },
      validate: value => value === watch('newPassword') || props.t('form:password-different'),
    },
  };
  const screenHeight = '100vh - 59px';
  const Wrapper: any = props.isMobile ? 'div' : Card;
  const onSubmit = data => {
    props.thunkUpdateUser(data);
    const field = Object.keys(data)[0];
    editField(field, true);
  };
  const showAddress = () => {
    if (!user.address) return '';
    const { address1, address2, city, country, province, zip } = user.address;
    return `${address1} ${address2}, ${city}, ${province} ${country} ${zip}`;
  };
  const changePhone = () => {
    // TODO
    // props.thunkSendOtp();
    setShowModal(true);
  };
  return (
    <DefaultLayout
      {...props}
      navbar={
        props.isMobile && (
          <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('common:profile-title')} />
        )
      }
    >
      <div className={props.isMobile ? '' : 'u-container u-container__page'}>
        {!props.isMobile && <Stepper title={props.t('common:profile-title')} />}
        <div className="c-account" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
          <Wrapper variant="border">
            <div className="c-account__container">
              <div className="c-account__row">
                <div className="c-account__header">
                  <div className="c-account__title">{props.t('name-label')}</div>
                  {!state.name.isEdit && (
                    <div className="c-account__action" onClick={() => editField('name', false, user.name)}>
                      Edit
                    </div>
                  )}
                </div>
                {state.name.isEdit ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      variant="large,open-sans"
                      defaultValue={state.name.value}
                      ref={register(schema.name)}
                      name="name"
                      errors={errors.name}
                    />
                    <div className="flex items-center" style={{ marginTop: 6 }}>
                      <Button
                        width="101px"
                        variant="rectangle,small-text"
                        disabled={errors.name || watch('name') === user.name}
                      >
                        {props.t('form:update-button')}
                      </Button>
                      <div onClick={() => editField('name', true)} className="c-account__link">
                        {props.t('form:cancel-button')}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="c-account__value">{user.name}</div>
                )}
              </div>
              <div className="c-account__row">
                <div className="c-account__header">
                  <div className="c-account__title">{props.t('email-label')}</div>
                  {!state.email.isEdit && (
                    <div className="c-account__action" onClick={() => editField('email', false, user.email)}>
                      Change
                    </div>
                  )}
                </div>

                {state.email.isEdit ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      variant="large,open-sans"
                      defaultValue={state.email.value}
                      ref={register(schema.email)}
                      name="email"
                      errors={errors.email}
                    />
                    <div className="flex items-center" style={{ marginTop: 6 }}>
                      <Button
                        width="101px"
                        variant="rectangle,small-text"
                        disabled={errors.email || watch('email') === user.email}
                      >
                        {props.t('form:update-button')}
                      </Button>
                      <div onClick={() => editField('email', true)} className="c-account__link">
                        {props.t('form:cancel-button')}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="c-account__value">{user.email}</div>
                )}
              </div>
              <div className="c-account__row">
                <div className="c-account__header">
                  <div className="c-account__title">{props.t('phone-label')}</div>
                  {!state.phone.isEdit && (
                    <div className="c-account__action" onClick={() => editField('phone', false, user.phone)}>
                      Change
                    </div>
                  )}
                </div>
                {state.phone.isEdit ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="c-account__label">{props.t('old-number')}</div>
                    <TextField
                      variant="large,open-sans"
                      defaultValue={state.phone.value}
                      ref={register(schema.phone)}
                      name="phone"
                      errors={errors.phone}
                    />
                    <div className="c-account__label">{props.t('new-number')}</div>
                    <TextField
                      variant="large,open-sans"
                      ref={register(schema.phone)}
                      name="newPhone"
                      errors={errors.newPhone}
                    />
                    <div className="flex items-center" style={{ marginTop: 6 }}>
                      <Button
                        width="101px"
                        variant="rectangle,small-text"
                        disabled={errors.phone || errors.newPhone || !watch('newPhone')}
                        type="button"
                        onClick={changePhone}
                      >
                        {props.t('form:update-button')}
                      </Button>
                      <div onClick={() => editField('phone', true)} className="c-account__link">
                        {props.t('form:cancel-button')}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="c-account__value">{user.phone}</div>
                )}
              </div>
              <div className="c-account__row">
                <div className="c-account__header">
                  <div className="c-account__title">{props.t('password-label')}</div>
                  {!state.password.isEdit && (
                    <div className="c-account__action" onClick={() => editField('password', false)}>
                      Change
                    </div>
                  )}
                </div>
                {state.password.isEdit ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="c-account__label">{props.t('old-password')}</div>
                    <TextField
                      variant="large,open-sans"
                      ref={register(schema.password)}
                      name="password"
                      errors={errors.password}
                      isPassword={true}
                      style={{ marginBottom: 12 }}
                    />
                    <div className="c-account__label">{props.t('new-password')}</div>
                    <TextField
                      variant="large,open-sans"
                      ref={register(schema.password)}
                      name="newPassword"
                      errors={errors.newPassword}
                      isPassword={true}
                      style={{ marginBottom: 12 }}
                    />
                    <div className="c-account__label">{props.t('confirm-new-password')}</div>
                    <TextField
                      variant="large,open-sans"
                      ref={register(schema.confirmPassword)}
                      name="confirmNewPassword"
                      errors={errors.confirmNewPassword}
                      isPassword={true}
                    />
                    <div className="flex items-center" style={{ marginTop: 6 }}>
                      <Button
                        width="101px"
                        variant="rectangle,small-text"
                        disabled={
                          errors.password ||
                          errors.newPassword ||
                          errors.confirmNewPassword ||
                          !watch('password') ||
                          !watch('newPassword') ||
                          !watch('confirmNewPassword')
                        }
                      >
                        {props.t('form:update-button')}
                      </Button>
                      <div onClick={() => editField('password', true)} className="c-account__link">
                        {props.t('form:cancel-button')}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="c-account__value">************</div>
                )}
              </div>
              <div className="c-account__row">
                <div className="c-account__header" style={{ marginBottom: props.isMobile ? 10 : 6 }}>
                  <div className="c-account__title">{props.t('address-label')}</div>
                  <div className="c-account__action">Change</div>
                </div>
                <div className="c-account__value c-account__address">{showAddress()}</div>
              </div>
            </div>
          </Wrapper>
        </div>
      </div>
      <Modal
        title={props.t('common:otp-verify')}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actions={
          <Fragment>
            <Button width="100%" onClick={handleSubmit(onSubmit)} style={{ marginBottom: 12 }}>
              {props.t('continue-button')}
            </Button>
            <Button width="100%" onClick={() => setShowModal(false)} variant="outline" color="black">
              {props.t('cancel-button')}
            </Button>
          </Fragment>
        }
        content={
          <Fragment>
            {props.t('common:otp-verify-text')}
            {/* TODO */}
          </Fragment>
        }
      />
      <style jsx>{`
        .c-account {
          @screen md {
            margin-bottom: 100px;
            margin-top: 36px;
          }
          &__container {
            padding: 24px 16px;
            @screen md {
              padding: 36px 42px;
            }
          }
          &__row {
            margin-bottom: 32px;
            @screen md {
              margin-bottom: 36px;
            }
            &:last-child {
              @apply mb-0;
            }
          }
          &__header {
            @apply flex justify-between;
            margin-bottom: 4px;
            @screen md {
              margin-bottom: 6px;
            }
          }
          &__title {
            @apply font-semibold;
            line-height: 24px;
          }
          &__value {
            @apply font-opensans text-sm;
            line-height: 19px;
            @screen md {
              @apply text-base;
              line-height: 22px;
            }
          }
          &__label {
            @apply font-opensans;
            line-height: 22px;
            margin-bottom: 6px;
          }
          &__action {
            @apply text-brand font-semibold cursor-pointer text-sm;
            line-height: 21px;
            @screen md {
              @apply text-base;
              line-height: 24px;
            }
          }
          &__link {
            @apply text-sm font-semibold cursor-pointer;
            line-height: 20px;
            margin-left: 12px;
          }
          &__address {
            @apply text-xs w-full;
            color: #898699;
            background: #fcfcff;
            border: 1px solid #efeef4;
            box-sizing: border-box;
            border-radius: 4px;
            line-height: 16px;
            padding: 8px 8px 24px;
            @screen md {
              @apply text-base bg-transparent border-0 rounded-none p-0 text-dark-grey;
              line-height: 22px;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

Account.getInitialProps = () => ({ namespacesRequired: ['common'] });

export default withTranslation(['form', 'common'])(connect(mapStateToProps, mapDispatchToProps)(Account));
