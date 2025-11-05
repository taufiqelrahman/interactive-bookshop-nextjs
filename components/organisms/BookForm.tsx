import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Button from 'components/atoms/Button';
import Card from 'components/atoms/Card';
import FieldGender from 'components/molecules/FieldGender';
import FormTextField from 'components/molecules/FormTextField';
import * as gtag from 'lib/gtag';
import { saveSelected } from 'store/cart/reducers';

/**
 * Form data structure for book character creation
 */
interface BookFormData {
  /** Character's display name (nickname) - max 10 characters, no spaces */
  Name: string;
  /** Character's gender selection */
  Gender: string;
}

/**
 * Validation rule structure for form fields
 */
interface ValidationRule {
  /** Field is required */
  required?: { value: boolean; message: string };
  /** Maximum character length */
  maxLength?: { value: number; message: string };
  /** Custom validation function */
  validate?: (value: string) => boolean | string;
}

/**
 * Validation schema type for all form fields
 */
interface ValidationSchema {
  name: ValidationRule;
  gender: ValidationRule;
}

/**
 * Props interface for the BookForm component
 */
interface BookFormProps {
  /** Whether the component is being rendered on mobile device */
  isMobile?: boolean;
}
/**
 * BookForm Component
 *
 * A responsive form component for character creation in the interactive bookshop.
 * Allows users to input character details (name, gender) with validation and
 * responsive mobile/desktop layouts.
 *
 * Key Features:
 * - Real-time form validation with custom rules
 * - Responsive design with mobile and desktop variants
 * - Integration with Redux store for data persistence
 * - Google Analytics event tracking
 * - Internationalization support
 * - Accessibility features with proper form labeling
 */
const BookForm: React.FC<BookFormProps> = ({ isMobile = false }): JSX.Element => {
  // Redux and routing hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // Internationalization hook for form labels and messages
  const { t } = useTranslation('form');

  // Form validation state
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // React Hook Form setup with real-time validation
  const methods = useForm<BookFormData>({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState } = methods;

  // Form validation schema with internationalized error messages
  const schema: ValidationSchema = {
    name: {
      required: { value: true, message: `${t('nickname-label')} ${t('required-error')}` },
      maxLength: { value: 10, message: `${t('nickname-label')} ${t('less-than-error')} 10` },
      validate: (value: string) => !value.includes(' ') || `${t('nickname-label')} ${t('space-error')}`,
    },
    gender: {
      required: { value: true, message: `${t('gender-label')} ${t('required-error')}` },
    },
  };

  /**
   * Update form validity state when form state changes
   * Watches form state to enable/disable submit button
   */
  useEffect(() => {
    setIsFormValid(formState.isValid);
  }, [formState.isValid]);

  /**
   * Prefetch the create page for better navigation performance
   * Only runs once on component mount
   */
  useEffect(() => {
    router.prefetch('/create');
  }, [router]);

  /**
   * Handle form submission with analytics tracking
   * Dispatches form data to Redux store and navigates to create page
   */
  const onSubmit = useCallback(
    (data: BookFormData) => {
      // Track form submission for analytics
      gtag.event({
        action: 'click_create',
        category: 'engagement',
        label: '/',
      });

      // Save form data to Redux store and navigate to character creation
      dispatch(saveSelected(data as any)); // Type assertion for store compatibility
      router.push('/create');
    },
    [dispatch, router],
  );

  return (
    <section className="c-book-form-section" role="main" aria-labelledby="book-form-title">
      <div className="c-book-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {isMobile ? (
            // Mobile Layout - Stacked form fields with full-width styling
            <div className="c-book-form__mobile-container">
              <Card variant="shadow--bold">
                <div className="c-book-form__container c-book-form__container__mobile">
                  <div className="c-book-form__fields">
                    <FormTextField
                      label={t('nickname-label')}
                      name="Name"
                      placeholder={t('name-placeholder')}
                      schema={schema.name}
                      register={register}
                      errors={errors.Name}
                      variant="full-width"
                    />
                    <FieldGender schema={schema.gender} register={register} errors={errors.Gender} isMobile={true} />
                  </div>
                  <Button type="submit" width="100%" disabled={!isFormValid} aria-label={t('continue-button')}>
                    {t('continue-button')}
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            // Desktop Layout - Horizontal form fields with inline styling
            <Card variant="shadow--bold">
              <div className="c-book-form__container">
                <div className="c-book-form__second-row items-end">
                  <div className="c-book-form__second-row__inputs flex items-center">
                    <FormTextField
                      label={t('nickname-label')}
                      name="Name"
                      placeholder={t('name-placeholder')}
                      schema={schema.name}
                      register={register}
                      errors={errors.Name}
                      variant="full-width"
                      className="c-book-form__item"
                    />
                    <FieldGender
                      schema={schema.gender}
                      register={register}
                      errors={errors.Gender}
                      isMobile={false}
                      className="c-book-form__item"
                    />
                  </div>
                  <div className="c-book-form__second-row__button">
                    <Button width="100%" type="submit" disabled={!isFormValid} aria-label={t('continue-button')}>
                      {t('continue-button')}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </form>
      </div>
      {/* Component-scoped styles using styled-jsx */}
      <style jsx>{`
        .c-book-form-section {
          @apply w-full py-8;
        }

        .c-book-form {
          @apply mx-auto w-11/12;
          max-width: 920px;

          &__mobile-container {
            overflow: hidden;
          }

          &__container {
            padding: 36px;

            &__mobile {
              @apply flex flex-col justify-between;
              min-height: 300px;
            }
          }

          &__fields {
            @apply mb-6 space-y-4;

            @screen md {
              @apply space-y-6;
            }
          }

          &__second-row {
            @apply flex flex-col gap-6;

            @screen lg {
              @apply flex-row items-end justify-between gap-8;
            }

            &__inputs {
              @apply flex w-full flex-col gap-4;

              @screen md {
                @apply flex-row gap-6;
              }

              @screen lg {
                @apply w-2/3;
              }
            }

            &__button {
              @apply w-full;

              @screen lg {
                @apply w-1/3;
              }
            }
          }

          &__item {
            @apply w-full;

            @screen md {
              @apply w-1/2;
            }

            &:not(:last-child) {
              @apply mb-4;

              @screen md {
                @apply mb-0 pr-3;
              }
            }
          }
        }
      `}</style>

      {/* Global styles for animations and transitions */}
      <style jsx global>{`
        .c-book-form {
          /* Form validation feedback animations */
          .c-form-field--error {
            animation: shake 0.6s ease-in-out;
          }

          /* Smooth transitions for form state changes */
          .c-form-field,
          .c-button {
            transition: all 0.3s ease;
          }

          /* Focus styles for better accessibility */
          .c-form-field:focus-within {
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
          }
        }

        /* Keyframe for error animation */
        @keyframes shake {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          70%,
          90% {
            transform: translateX(-10px);
          }
          40%,
          60% {
            transform: translateX(10px);
          }
        }
      `}</style>
    </section>
  );
};

export default BookForm;
