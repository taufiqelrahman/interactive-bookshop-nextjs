import { HTMLAttributes } from 'react';
import Loader from './Loader';

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  variant: 'outline' | 'rectangle' | 'small-text' | 'whatsapp';
  color: 'black' | 'white';
  disabled: boolean;
  isLoading: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  name: string;
  width: string;
  height: string;
}

const Button = (props: ButtonProps) => {
  const variantClass = () => {
    if (!props.variant) return '';
    const variants = props.variant.split(',');
    return variants.map((variant: string) => `c-button--${variant}`).join(' ');
  };
  const colorClass = props.color ? `c-button--${props.color}` : '';
  const disabledClass = props.disabled || props.isLoading ? `c-button--disabled` : '';
  return (
    <div style={props.style} className={props.className}>
      <button
        aria-label="button"
        type={props.type}
        className={`c-button ${variantClass()} ${colorClass} ${disabledClass}`}
        onClick={props.onClick}
        disabled={props.disabled || props.isLoading}
        data-testid={props.name}
      >
        {props.isLoading ? <Loader /> : props.children}
      </button>
      <style jsx>{`
        .c-button {
          @apply font-semibold bg-brand text-white text-sm;
          border-radius: 60px;
          padding: ${props.width ? '12px 0' : '12px'};
          max-width: ${props.width ? '100%' : 'none'};
          width: ${props.width || '100%'};
          height: ${props.height || 'auto'};
          line-height: ${props.height ? 'unset' : '24px'};
          @screen sm {
            width: ${props.width || '350px'};
          }
          @screen md {
            @apply text-base;
          }
          &--outline {
            @apply bg-transparent;
            border: 2px solid;
            &.c-button--black {
              @apply text-dark-grey;
              border-color: #333333;
            }
            &.c-button--white {
              @apply border-white;
            }
          }
          &--rectangle {
            border-radius: 6px;
            padding: 8px 16px;
          }
          &--small-text {
            @apply text-sm;
          }
          &--disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
          &--whatsapp {
            background: #25d366;
          }
        }
      `}</style>
    </div>
  );
};

export default Button;
