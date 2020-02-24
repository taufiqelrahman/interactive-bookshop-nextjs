import Stepper from 'components/atoms/Stepper';
import { useRouter } from 'next/router';

const NavBar = (props: any) => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  return (
    <div className="c-navbar">
      <div className={`c-navbar__action ${isIndexPage ? 'c-navbar__action--index' : ''}`}>
        <span className={`icon-${props.icon}`} />
      </div>
      <div className={`c-navbar__title ${isIndexPage ? 'c-navbar__title--index' : ''}`}>
        {isIndexPage ? (
          <img src="/static/images/logo.png" alt="logo" width="33" height="33" />
        ) : props.isSteps ? (
          <Stepper step={props.step} totalSteps={props.totalSteps} title={props.title} style={{}} />
        ) : (
          <div className="c-navbar__text">{props.title}</div>
        )}
      </div>
      <style jsx>{`
        .c-navbar {
          @apply fixed top-0 bg-white flex w-full;
          height: 48px;
          padding: 8px 16px;
          &__action {
            @apply flex justify-center items-center;
            width: 22px;
            font-size: 20px;
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
          }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
