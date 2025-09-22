import { useRouter } from 'next/router';
import { useMemo } from 'react';

import Stepper from 'components/atoms/Stepper';

const NavBar = (props: any) => {
  const router = useRouter();
  const isIndexPage = useMemo(() => router.pathname === '/', [router.pathname]);
  const isErrorPage = useMemo(() => router.pathname === '/_error', [router.pathname]);
  const indexOrError = isIndexPage || isErrorPage;
  const showSideNav = () => {
    props.setSideNav(true);
  };
  return (
    <div className="c-nav-bar" style={props.style}>
      <div className={`c-nav-bar__action ${indexOrError ? 'c-nav-bar__action--index' : ''}`}>
        {props.menuAction ? (
          <span className="icon-menu" onClick={showSideNav} />
        ) : (
          <span className="icon-arrow_left" onClick={() => (props.onBack ? props.onBack() : router.back())} />
        )}
      </div>
      <div className={`c-nav-bar__title ${indexOrError ? 'c-nav-bar__title--index' : ''}`}>
        {indexOrError ? (
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
          @apply fixed top-0 z-30 flex w-full items-center bg-white;
          padding: ${indexOrError ? '14px' : '16px'};
          border-bottom: ${indexOrError ? 'none' : '1px solid #efeef4'};
          &__action {
            @apply flex cursor-pointer items-center justify-center;
            width: 22px;
            font-size: 20px;
            margin-right: ${indexOrError ? 0 : '16px'};
            &--index {
              @apply text-brand;
            }
          }
          &__title {
            &--index {
              @apply flex w-full items-center justify-center;
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
