import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import Card from 'components/atoms/Card';
import NavBar from 'components/organisms/NavBar/mobile';
import { useState, Fragment, useEffect } from 'react';
import TextField from 'components/atoms/TextField';
import Button from 'components/atoms/Button';
import { useForm } from 'react-hook-form';
import api from 'services/api';
import Modal from 'components/atoms/Modal';
import actions from 'store/actions';
import Select from 'react-select';

const Account = (props: any): any => {
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, setValue, watch, triggerValidation, unregister } = methods;
  const { user } = props.state.users;
  const userAddress = user.address || {};
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
  const schema = {
    name: {
      required: { value: true, message: `${props.t('name-label')} ${props.t('form:required-error')}` },
    },
    email: {
      required: { value: true, message: `Email ${props.t('form:required-error')}` },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
        message: `Email ${props.t('form:invalid-error')}`,
      },
      validate: async value => {
        const { data } = await api().users.checkEmailChange({ email: value });
        return !data.exists || props.t('form:email-exists');
      }, // watch for duplicate email
    },
    phone: {
      required: { value: true, message: `${props.t('form:phone-label')} ${props.t('form:required-error')}` },
      minLength: { value: 7, message: `${props.t('form:phone-label')} ${props.t('form:invalid-error')}` },
    },
    password: {
      required: { value: true, message: `${props.t('password-label')} ${props.t('form:required-error')}` },
    },
    confirmNewPassword: {
      required: { value: true, message: `${props.t('password-label')} ${props.t('form:required-error')}` },
      validate: value => value === watch('newPassword') || props.t('form:password-different'),
    },
    address: {
      required: { value: true, message: `${props.t('address-label')} ${props.t('form:required-error')}` },
    },
  };
  const customStyles = {
    menu: provided => ({
      ...provided,
      marginTop: 0,
      border: '2px solid #333',
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTop: 'none',
      width: props.isMobile ? '100%' : '400px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    option: provided => ({
      ...provided,
      '&:hover': {
        background: '#333',
        color: 'white',
      },
      width: props.isMobile ? '100%' : '400px',
    }),
    control: (provided, state) => ({
      ...provided,
      borderWidth: 2,
      borderType: 'solid',
      borderColor: state.isFocused ? '#333' : '#e1e0e7',
      borderBottomRightRadius: state.isFocused ? 0 : provided.borderBottomRightRadius,
      borderBottomLeftRadius: state.isFocused ? 0 : provided.borderBottomLeftRadius,
      paddingLeft: 6,
      '.c-date-field--error &': {
        border: '2px solid #de3636',
      },
      marginBottom: 12,
      width: props.isMobile ? '100%' : '400px',
    }),
  };
  const screenHeight = '100vh - 59px';
  const Wrapper: any = props.isMobile ? 'div' : Card;
  const disabledUpdateAddress = () =>
    errors.address1 ||
    errors.address2 ||
    errors.city ||
    errors.province ||
    errors.zip ||
    (watch('address1') === userAddress.address1 &&
      watch('address2') === userAddress.address2 &&
      watch('city') === userAddress.city &&
      watch('province') &&
      watch('province').label === userAddress.province &&
      watch('zip') === userAddress.zip);
  const editField = (type, isClear, value?): any => {
    const newState = { ...state };
    Object.keys(newState).forEach(key => {
      newState[key].isEdit = false;
    });
    setState({
      ...newState,
      [type]: {
        isEdit: !isClear,
        value: isClear ? '' : value,
      },
    });
  };
  const showAddress = () => {
    if (Object.keys(userAddress).length === 0) return '-';
    const { address1, address2, city, country, province, zip } = userAddress;
    return `${address1} ${address2}, ${city}, ${province} ${country} ${zip}`;
  };
  const provinces = () => {
    const { provinces } = props.state.master;
    if (provinces.length === 0) return [];
    return provinces.map(prov => ({
      value: prov.name,
      label: prov.name,
    }));
  };
  const setDefaultProvince = () => {
    return { label: userAddress.province, value: userAddress.province };
  };
  const onChangePhone = () => {
    props.thunkSendOtp();
    setShowModal(true);
  };
  const onChangeProvince = e => {
    triggerValidation('province');
    setValue('province', e);
  };
  const onSubmit = data => {
    let PARAMS = data;
    if (data.province) PARAMS = { ...data, province: data.province.value };
    if (data.phone) PARAMS = { ...data, phone: data.phone.replace(/^\s+|\s+$/gm, '') };
    props.thunkUpdateUser(PARAMS);
    if (showModal) setShowModal(false);
    const field = Object.keys(data)[0];
    if (['address1', 'address2', 'city', 'country', 'province', 'zip'].includes(field)) {
      editField('address', true);
    } else {
      editField(field, true);
    }
  };
  useEffect(() => {
    if (state.address.isEdit) {
      register({ name: 'province' }, schema.address);
      setValue('province', setDefaultProvince());
    } else {
      unregister('province');
    }
  }, [state.address.isEdit]);
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
                      style={props.isMobile ? { marginBottom: 6 } : {}}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      defaultValue={state.name.value}
                      ref={props.register(schema.name)}
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
                      style={props.isMobile ? { marginBottom: 6 } : {}}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      defaultValue={state.email.value}
                      ref={props.register(schema.email)}
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
                    {/* <div className="c-account__label">{props.t('old-number')}</div> */}
                    <TextField
                      style={props.isMobile ? { marginBottom: 6 } : {}}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      defaultValue={state.phone.value}
                      ref={props.register(schema.phone)}
                      name="newPhone"
                      errors={errors.phone}
                    />
                    {/* <div className="c-account__label">{props.t('new-number')}</div>
                      <TextField
                      style={props.isMobile ? { marginBottom: 6 } : {}}
                        variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                        ref={props.register(schema.phone)}
                        name="newPhone"
                        errors={errors.newPhone}
                      /> */}
                    <div className="flex items-center" style={{ marginTop: 6 }}>
                      <Button
                        width="101px"
                        variant="rectangle,small-text"
                        disabled={errors.phone || watch('newPhone') === user.phone}
                        type="button"
                        onClick={onChangePhone}
                      >
                        {props.t('form:update-button')}
                      </Button>
                      <div onClick={() => editField('phone', true)} className="c-account__link">
                        {props.t('form:cancel-button')}
                      </div>
                    </div>
                  </form>
                ) : (
                  // <div className="c-account__value">{`*****${user.phone.slice(5)}`}</div>
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
                      style={props.isMobile ? { marginBottom: 6 } : { marginBottom: 12 }}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      ref={props.register(schema.password)}
                      name="password"
                      errors={errors.password}
                      isPassword={true}
                    />
                    <div className="c-account__label">{props.t('new-password')}</div>
                    <TextField
                      style={props.isMobile ? { marginBottom: 6 } : { marginBottom: 12 }}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      ref={props.register(schema.password)}
                      name="newPassword"
                      errors={errors.newPassword}
                      isPassword={true}
                    />
                    <div className="c-account__label">{props.t('confirm-new-password')}</div>
                    <TextField
                      style={props.isMobile ? { marginBottom: 6 } : {}}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      ref={props.register(schema.confirmNewPassword)}
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
                  {!state.address.isEdit && (
                    <div className="c-account__action" onClick={() => editField('address', false)}>
                      Change
                    </div>
                  )}
                </div>
                {state.address.isEdit ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="c-account__label">{props.t('address1')}</div>
                    <TextField
                      style={props.isMobile ? { marginBottom: 6 } : { marginBottom: 12 }}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      defaultValue={userAddress.address1}
                      ref={props.register(schema.address)}
                      name="address1"
                      errors={errors.address1}
                    />
                    <div className="c-account__label">{props.t('address2')}</div>
                    <TextField
                      style={props.isMobile ? { marginBottom: 6 } : { marginBottom: 12 }}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      defaultValue={userAddress.address2}
                      ref={props.register(schema.address)}
                      name="address2"
                      errors={errors.address2}
                    />
                    <div className="c-account__label">{props.t('city')}</div>
                    <TextField
                      style={props.isMobile ? { marginBottom: 6 } : { marginBottom: 12 }}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      defaultValue={userAddress.city}
                      ref={props.register(schema.address)}
                      name="city"
                      errors={errors.city}
                    />
                    <div className="c-account__label">{props.t('province')}</div>
                    <Select
                      styles={customStyles}
                      className="c-account_province"
                      instanceId="province"
                      placeholder={props.t('select-province')}
                      defaultValue={setDefaultProvince()}
                      options={provinces()}
                      onChange={onChangeProvince}
                    />
                    {/* {errors.province} */}
                    <div className="c-account__label">{props.t('zip')}</div>
                    <TextField
                      style={props.isMobile ? { marginBottom: 6 } : {}}
                      variant={`open-sans,${props.isMobile ? 'full-width' : 'large'}`}
                      defaultValue={userAddress.zip}
                      ref={props.register(schema.address)}
                      name="zip"
                      errors={errors.zip}
                    />
                    <div className="flex items-center" style={{ marginTop: 6 }}>
                      <Button width="101px" variant="rectangle,small-text" disabled={disabledUpdateAddress()}>
                        {props.t('form:update-button')}
                      </Button>
                      <div onClick={() => editField('address', true)} className="c-account__link">
                        {props.t('form:cancel-button')}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="c-account__value c-account__address">{showAddress()}</div>
                )}
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
            <Button width="100%" onClick={handleSubmit(onSubmit)} disabled={!watch('otp')} style={{ marginBottom: 12 }}>
              {props.t('continue-button')}
            </Button>
            <Button width="100%" onClick={() => setShowModal(false)} variant="outline" color="black">
              {props.t('cancel-button')}
            </Button>
          </Fragment>
        }
        content={
          <Fragment>
            <div
              className="font-opensans"
              // dangerouslySetInnerHTML={{
              //   __html: props
              //     .t('common:otp-verify-text')
              //     .replace('[phone]', `<div className="font-semibold">${user.phone}</strong>`),
              // }}
              style={{ marginBottom: 18 }}
            >
              {props.t('common:otp-verify-text')}
            </div>
            <div className="font-semibold">{props.t('common:otp-code')}</div>
            <TextField variant="full-width" name="otp" style={{ margin: '6px 0 24px' }} />
            <div className="c-account__action" onClick={() => props.thunkSendOtp()}>
              {props.t('common:otp-resend')}
            </div>
          </Fragment>
        }
      />
      <style jsx>{`
        .c-account {
          @apply overflow-y-auto;
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
              @apply text-base bg-transparent border-0 rounded-none p-0 text-dark-grey w-4/5;
              line-height: 22px;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

Account.getInitialProps = async (ctx: any): Promise<any> => {
  try {
    ctx.reduxStore.dispatch(actions.loadProvinces(true));
    const { data: provinces } = await api().master.getProvinces();
    ctx.reduxStore.dispatch(actions.loadProvinces(false, provinces.data));
  } catch (err) {
    console.log(err.message);
  }
  return { namespacesRequired: ['form', 'common'] };
};

export default withTranslation(['form', 'common'])(connect(mapStateToProps, mapDispatchToProps)(Account));
