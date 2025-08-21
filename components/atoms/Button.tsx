import { twMerge } from 'tailwind-merge';

import styles from './Button.module.scss';
import Loader from './Loader';

const Button = (props: any) => {
  const variantClass = () => {
    if (!props.variant) return '';
    const variants = props.variant.split(',');
    return variants.map((variant) => `c-button--${variant}`).join(' ');
  };
  const colorClass = props.color ? `c-button--${props.color}` : '';
  const disabledClass = props.disabled || props.isLoading ? `c-button--disabled` : '';
  return (
    <div style={props.style} className={props.className}>
      <button
        aria-label="button"
        type={props.type ? props.type : null}
        className={twMerge(
          `${styles['c-button']} ${variantClass()} ${colorClass} ${disabledClass}`,
          props.width ? 'w-full max-w-full px-0 py-3 sm:w-[350px]' : 'p-3',
        )}
        onClick={props.onClick}
        disabled={props.disabled || props.isLoading}
        data-testid={props.name}
      >
        {props.isLoading ? <Loader /> : props.children}
      </button>
    </div>
  );
};

export default Button;
