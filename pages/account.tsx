import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import Card from 'components/atoms/Card';
import NavBar from 'components/organisms/NavBar/mobile';

const Account = (props: any): any => {
  const { user } = props.state.users;
  const screenHeight = '100vh - 59px';
  const Wrapper: any = props.isMobile ? 'div' : Card;
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
                <div>
                  <div className="c-account__title">{props.t('name-label')}</div>
                  <div className="c-account__value">{user.name}</div>
                </div>
                <div className="c-account__action">Edit</div>
              </div>
              <div className="c-account__row">
                <div>
                  <div className="c-account__title">{props.t('email-label')}</div>
                  <div className="c-account__value">{user.email}</div>
                </div>
                <div className="c-account__action">Change</div>
              </div>
              <div className="c-account__row">
                <div>
                  <div className="c-account__title">{props.t('phone-label')}</div>
                  <div className="c-account__value">{user.phone}</div>
                </div>
                <div className="c-account__action">Change</div>
              </div>
              <div className="c-account__row">
                <div>
                  <div className="c-account__title">{props.t('password-label')}</div>
                  <div className="c-account__value">************</div>
                </div>
                <div className="c-account__action">Change</div>
              </div>
              <div className="c-account__row" style={{ marginBottom: props.isMobile ? 10 : 0 }}>
                <div>
                  <div className="c-account__title">{props.t('address-label')}</div>
                  {!props.isMobile && <div className="c-account__value">{showAddress()}</div>}
                </div>
                <div className="c-account__action">Change</div>
              </div>
              {props.isMobile && <div className="c-account__address">{showAddress()}</div>}
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
            @apply flex justify-between;
            margin-bottom: 32px;
            @screen md {
              margin-bottom: 36px;
            }
            &:last-child {
              @apply mb-0;
            }
          }
          &__title {
            @apply font-semibold;
            line-height: 24px;
            margin-bottom: 4px;
            @screen md {
              margin-bottom: 6px;
            }
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
          &__address {
            @apply text-xs w-full font-opensans;
            color: #898699;
            background: #fcfcff;
            border: 1px solid #efeef4;
            box-sizing: border-box;
            border-radius: 4px;
            line-height: 16px;
            padding: 8px 8px 24px;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

Account.getInitialProps = () => ({ namespacesRequired: ['common'] });

export default withTranslation(['form', 'common'])(connect(mapStateToProps, mapDispatchToProps)(Account));
