import { withTranslation, Link } from 'i18n';
import Divider from 'components/atoms/Divider';

const AccountDropdown = (props: any) => {
  const signOut = () => {
    props.logout();
  };
  return (
    <div onClick={e => e.stopPropagation()}>
      <div className="c-account-dropdown">
        <div className="c-account-dropdown__item">
          <Link href="/orders">
            <a>{props.t('my-orders')}</a>
          </Link>
        </div>
        <Divider style={{ borderColor: '#ededed', borderWidth: 1, margin: '0 18px' }} />
        <div className="c-account-dropdown__item c-account-dropdown__sign-out" onClick={signOut}>
          {props.t('sign-out')}
        </div>
      </div>
      <style jsx>{`
        .c-account-dropdown {
          @apply absolute bg-gray-100 text-xs;
          box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.08);
          border-radius: 0px 0px 6px 6px;
          top: 80px;
          width: 200px;
          left: -35px;
          &__item {
            padding: 18px;
          }
          &__sign-out {
            @apply text-brand cursor-pointer;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('common')(AccountDropdown);
