import Stepper from 'components/atoms/Stepper';
import { useRouter } from 'next/router';
import { Router } from 'i18n';

const NavBar = (props: any) => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const showSideNav = () => {
    props.setSideNav(true);
  };
  return (
    <div className="c-nav-bar">
      <div className={`c-nav-bar__action ${isIndexPage ? 'c-nav-bar__action--index' : ''}`}>
        {props.menuAction ? (
          <span className="icon-info" onClick={showSideNav} />
        ) : (
          <span className="icon-arrow_left" onClick={() => (props.onBack ? props.onBack() : Router.back())} />
        )}
      </div>
      <div className={`c-nav-bar__title ${isIndexPage ? 'c-nav-bar__title--index' : ''}`}>
        {isIndexPage ? (
          <img src="/static/images/logo.png" alt="logo" width="33" height="33" />
        ) : props.isSteps ? (
          <Stepper
            step={props.step}
            totalSteps={props.totalSteps}
            title={props.title}
            backButton={false}
            isMobile={true}
          />
        ) : (
          <div className="c-nav-bar__title__text">{props.title}</div>
        )}
      </div>
      <style jsx>{`
        .c-nav-bar {
          @apply fixed top-0 bg-white flex w-full z-30 items-center;
          padding: ${isIndexPage ? '14px' : '16px'};
          border-bottom: ${isIndexPage ? 'none' : '1px solid #efeef4'};
          &__action {
            @apply flex justify-center items-center cursor-pointer;
            width: 22px;
            font-size: 20px;
            margin-right: ${isIndexPage ? 0 : '16px'};
            &--index {
              @apply text-brand;
            }
          }
          &__title {
            &--index {
              @apply flex justify-center items-center w-full;
              img {
                width: 33px;
              }
            }
            &__text {
              @apply font-semibold;
              font-size: 18px;
              line-height: 26px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
