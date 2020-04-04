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

const Account = (props: any): any => {
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
  });
  const { user } = props.state.users;
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
    email: { required: true },
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
                    />
                    <div className="flex items-center" style={{ marginTop: 6 }}>
                      <Button width="101px" variant="rectangle,small-text">
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
                  <div className="c-account__action">Change</div>
                </div>
                <div className="c-account__value">{user.email}</div>
              </div>
              <div className="c-account__row">
                <div className="c-account__header">
                  <div className="c-account__title">{props.t('phone-label')}</div>
                  <div className="c-account__action">Change</div>
                </div>
                <div className="c-account__value">{user.phone}</div>
              </div>
              <div className="c-account__row">
                <div className="c-account__header">
                  <div className="c-account__title">{props.t('password-label')}</div>
                  <div className="c-account__action">Change</div>
                </div>
                <div className="c-account__value">************</div>
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
