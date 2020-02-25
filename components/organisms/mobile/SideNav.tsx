import { withTranslation, Link } from 'i18n';
import TranslationToggle from 'components/molecules/TranslationToggle';

const SideNav = (props: any) => {
  return (
    <div className="c-side-nav">
      <div className="c-side-nav__header">
        <button className="c-side-nav__button--close" onClick={props.hide}>
          x
        </button>
      </div>
      <div className="c-side-nav__menu">
        <Link href="/">
          <a className="c-side-nav__link">Homepage</a>
        </Link>
      </div>
      <div className="c-side-nav__footer">
        <TranslationToggle />
      </div>
      <style jsx>{`
        .c-side-nav {
          @apply h-screen fixed z-50 top-0 left-0 overflow-x-hidden text-white;
          width: ${props.isOpen ? '90vw' : 0};
          background-color: #de6236;
          transition: 0.5s;
          padding: ${props.isOpen ? '32px 21px' : 0};
        }
      `}</style>
    </div>
  );
};

export default withTranslation('common')(SideNav);
