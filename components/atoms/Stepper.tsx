import { withTranslation, Router } from 'i18n';
import { WithTranslation } from 'next-i18next';
import { ReactElement } from 'react';

interface Props extends WithTranslation {
  title: string | ReactElement;
  backButton?: boolean;
  isMobile?: boolean;
  totalSteps?: number;
  step?: number;
  style?: object;
}
const Stepper = ({ backButton = true, isMobile = false, ...props }: Props) => {
  return (
    <div className="c-stepper" style={props.style}>
      {backButton && (
        <div className="c-stepper__back">
          <span className="icon-arrow_left" onClick={() => Router.back()} />
        </div>
      )}
      <div>
        {props.totalSteps && (
          <div className="c-stepper__steps">
            {`${isMobile ? '' : `${props.t('step')} `}${props.step} ${props.t('of')} ${props.totalSteps}`}
          </div>
        )}
        <div className="c-stepper__title">
          <h1>{props.title}</h1>
        </div>
      </div>
      <style jsx>{`
        .c-stepper {
          @apply flex items-end w-full;
          &__back {
            @apply font-bold cursor-pointer;
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
              @apply font-bold mt-0;
              font-size: 28px;
              line-height: 42px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('common')(Stepper);
