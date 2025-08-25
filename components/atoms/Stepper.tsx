import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Stepper = ({ backButton = true, isMobile = false, ...props }: any) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  return (
    <div className="c-stepper" style={props.style}>
      {backButton && (
        <div className="c-stepper__back">
          <span className="icon-arrow_left" onClick={() => router.back()} />
        </div>
      )}
      <div>
        {props.totalSteps && (
          <div className="c-stepper__steps">
            {`${isMobile ? '' : `${t('step')} `}${props.step} ${t('of')} ${props.totalSteps}`}
          </div>
        )}
        <div className="c-stepper__title">
          <h1>{props.title}</h1>
        </div>
      </div>
      <style jsx>{`
        .c-stepper {
          @apply flex w-full items-end;
          &__back {
            @apply cursor-pointer font-bold;
            margin-right: 12px;
            line-height: 39px;
            font-size: 24px;
          }
          &__steps {
            @apply font-opensans text-xs;
          }
          &__title {
            font-size: 18px;
            margin-top: 6px;
            @screen md {
              @apply mt-0 font-bold;
              font-size: 28px;
              line-height: 42px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Stepper;
