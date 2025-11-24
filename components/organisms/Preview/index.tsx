import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, Fragment, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import * as gtag from 'lib/gtag';
import { useResponsive } from 'lib/hooks/useResponsive';
import { RootState } from 'store';
import actions from 'store/actions';
import { saveSelected } from 'store/cart/reducers';
import { CartItem } from 'store/cart/types';

import { dummySelected, schema, getFromCookies } from './helper';

// Dynamic imports for better performance and code splitting
const Modal = dynamic(() => import('components/atoms/Modal'));
const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Card = dynamic(() => import('components/atoms/Card'));
const Button = dynamic(() => import('components/atoms/Button'));
const FieldCover = dynamic(() => import('components/molecules/FieldCover'));
const BookPreview = dynamic(() => import('components/BookPreview'), { ssr: false });
const Sheet = dynamic(() => import('components/atoms/Sheet'));

/**
 * Form data structure for cover selection
 */
interface PreviewFormData {
  /** Selected book cover option */
  Cover: string;
}

/**
 * Props interface for the Preview component
 */
interface PreviewContainerProps {
  /** Whether the component is being rendered on mobile device */
  isMobile?: boolean;
  /** Additional props passed from layout */
  [key: string]: unknown;
}

/**
 * Preview Container Component
 *
 * A comprehensive preview interface for character book creation that handles
 * both mobile and desktop layouts. Users can preview their book, select covers,
 * and proceed to cart with proper authentication handling.
 *
 * Key Features:
 * - Responsive mobile/desktop layouts
 * - Book cover selection with real-time preview
 * - Guest checkout vs authenticated user workflows
 * - Form validation with error handling
 * - Analytics tracking and Facebook Pixel integration
 * - Cookie-based cart persistence for authentication flows
 * - Dynamic component loading for performance
 */
const PreviewContainer: React.FC<PreviewContainerProps> = (props): JSX.Element => {
  // Hooks for internationalization, responsive design, routing, and Redux
  const { t } = useTranslation('common');
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state selectors with proper typing
  const cart = useSelector((state: RootState) => state.cart);
  const users = useSelector((state: RootState) => state.users);
  const master = useSelector((state: RootState) => state.master);

  // Form management with React Hook Form
  const methods = useForm<PreviewFormData>({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;

  // Component state management
  /** Controls modal visibility for desktop guest checkout */
  const [showModal, setShowModal] = useState<boolean>(false);
  /** Controls bottom sheet visibility for mobile guest checkout */
  const [showSheet, setShowSheet] = useState<boolean>(false);
  /** Controls book specifications sheet visibility on mobile */
  const [showSpecs, setShowSpecs] = useState<boolean>(false);
  /** Temporary cart data storage for guest checkout flow */
  const [tempData, setTempData] = useState<CartItem | null>(null);

  // Derived state and constants
  /** Mobile screen height calculation for full viewport usage */
  const screenHeight = '100vh - 69px';
  /** Selected character data with fallback to dummy data */
  const selected = cart.selected || dummySelected;
  /** Book pages data from master state */
  const bookPages = master.bookPages;

  /**
   * Add item to cart - handles both new items and updates
   * Includes analytics tracking and navigation logic
   */
  const addToCart = useCallback(
    async (cartItem: CartItem) => {
      try {
        // Check if updating existing cart item or adding new one
        if ('id' in selected && selected.id) {
          await dispatch(actions.thunkUpdateCart(cartItem));
        } else {
          // Analytics tracking for new cart additions
          gtag.event({
            action: 'click_create',
            category: 'engagement',
            label: '/preview',
          });
          gtag.event({
            action: 'add_to_cart',
            category: 'ecommerce',
            label: isMobile ? 'mobile' : 'desktop',
          });

          // Facebook Pixel tracking
          (window as any).fbq('track', 'AddToCart', {
            cartItem,
            isLoggedIn: users.isLoggedIn,
          });

          await dispatch(actions.thunkAddToCart(cartItem));
          router.push('/cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error(t('cart-error'));
      }
    },
    [selected, dispatch, isMobile, users.isLoggedIn, router, t],
  );

  /**
   * Save cart data to cookies and redirect to login
   * Used when user needs to authenticate before checkout
   */
  const saveToCookies = useCallback(
    (cartData: CartItem) => {
      try {
        Cookies.set('pendingTrx', JSON.stringify(cartData));
        router.push('/login?from=preview');
      } catch (error) {
        console.error('Error saving to cookies:', error);
        toast.error(t('save-error'));
      }
    },
    [router, t],
  );

  /**
   * Continue checkout as guest user
   * Adds temporary cart data without requiring authentication
   */
  const continueAsGuest = useCallback(() => {
    if (tempData) {
      addToCart(tempData);
    }
  }, [tempData, addToCart]);

  /**
   * Handle form submission for cover selection
   * Manages authentication flow and cart processing
   */
  const onSubmit = useCallback(
    (data: PreviewFormData) => {
      if (!selected) {
        router.replace('/create');
        return;
      }

      const cartData = { ...selected, ...data } as CartItem;

      if (!users.isLoggedIn) {
        setTempData(cartData);
        if (isMobile) {
          setShowSheet(true);
        } else {
          setShowModal(true);
        }
        return;
      }

      addToCart(cartData);
    },
    [selected, users.isLoggedIn, isMobile, router, addToCart],
  );

  /**
   * Handle form validation errors
   * Scrolls to top and shows error message
   */
  useEffect(() => {
    if (!formState.isValid && Object.keys(errors).length > 0) {
      window.scrollTo(0, 0);
      toast.error(t('form:form-error'));
    }
  }, [errors, formState.isValid, t]);

  /**
   * Handle cookie-based cart restoration
   * Restores cart data from cookies after login redirect
   */
  useEffect(() => {
    const fromCookies = getFromCookies();
    if (fromCookies) {
      dispatch(saveSelected(fromCookies));
      Cookies.remove('pendingTrx');
    }
  }, [dispatch]);

  // Mobile layout rendering
  if (isMobile) {
    return (
      <DefaultLayout
        {...props}
        navbar={<NavBar isSteps={true} title={t('book-preferences')} step={2} totalSteps={2} />}
      >
        <main className="c-preview" style={{ height: `calc(${screenHeight})` }} role="main">
          <BookPreview
            selected={selected as CartItem}
            isMobile={props.isMobile}
            bookPages={bookPages}
            cover={watch('Cover')}
          />
          <form className="c-preview__tab u-container" onSubmit={handleSubmit(onSubmit)} noValidate>
            <button
              type="button"
              className="c-preview__specs"
              onClick={() => setShowSpecs(true)}
              aria-label={t('book-specs')}
            >
              <div>{t('book-specs')}</div>
              <span className="icon-chevron_right" />
            </button>
            <div className="c-preview__cover">
              <FieldCover schema={schema(t).cover} register={register} errors={errors.Cover} />
            </div>
            <Button type="submit" width="648px" style={{ margin: '12px 0 18px' }}>
              {t('form:continue-button')}
            </Button>
          </form>
        </main>
        <Sheet
          name="guest-sheet"
          isOpen={showSheet}
          closeSheet={() => setShowSheet(false)}
          content={
            <Fragment>
              <h1 className="c-preview__sheet__title">{t('guest-order-title')}</h1>
              <div className="c-preview__sheet__content">{t('guest-order-info')}</div>
            </Fragment>
          }
          actions={
            <Fragment>
              <Button width="100%" onClick={() => tempData && saveToCookies(tempData)} style={{ marginBottom: 12 }}>
                {t('login')}
              </Button>
              <Button width="100%" onClick={() => continueAsGuest()} variant="outline" color="black">
                {t('continue-guest')}
              </Button>
            </Fragment>
          }
        />
        <Sheet
          name="specs-sheet"
          isOpen={showSpecs}
          closeSheet={() => setShowSpecs(false)}
          content={
            <div className="c-sheet__content">
              <div className="c-sheet__content__item">
                <span className="icon-ico_verified" /> {t('book-specs-1')}
              </div>
              <div className="c-sheet__content__item">
                <span className="icon-ico_premium_account" /> {t('book-specs-2')}
              </div>
              <div className="c-sheet__content__item">
                <span className="icon-ico_book" /> {t('book-specs-3')}
              </div>
              <div className="c-sheet__content__item">
                <span className="icon-gift" /> {t('manufacturing-time')}
              </div>
            </div>
          }
          header={true}
          title={t(`book-specs`)}
        />
        {/* Mobile-specific styles */}
        <style jsx>{`
          .c-preview {
            @apply flex flex-col justify-between;

            &__tab {
              border-top: 1px solid #efeef4;
              border-radius: 24px 24px 0 0;
              padding-top: 20px;
            }

            &__cover {
              @apply flex justify-center;
            }

            &__link {
              @apply mb-4 cursor-pointer text-center text-sm font-semibold;
              color: #445ca4;
            }

            &__sheet {
              &__title {
                @apply text-2xl font-semibold leading-8;

                @screen sm {
                  font-size: 27px;
                  line-height: 32px;
                }
              }

              &__content {
                @apply mt-3 font-opensans text-sm leading-5;
              }
            }

            &__specs {
              @apply mb-6 flex cursor-pointer items-center justify-between rounded bg-white p-3 font-opensans text-sm shadow-md;
              transition: all 0.3s ease;

              &:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transform: translateY(-1px);
              }

              &:active {
                transform: translateY(0);
              }

              div {
                line-height: 1.4;
              }

              span {
                @apply text-xl text-gray-600;
              }
            }
          }
        `}</style>

        {/* Global styles for sheet components */}
        <style jsx global>{`
          .c-sheet__content {
            @apply py-4 font-opensans text-sm leading-6;

            &__item {
              @apply mb-2 flex items-baseline;

              span {
                @apply mr-3 text-blue-600;
              }
            }
          }
        `}</style>
      </DefaultLayout>
    );
  }

  // Desktop layout rendering
  return (
    <DefaultLayout {...props}>
      <div className="u-container u-container__page">
        <Stepper step={1} totalSteps={2} title={t('book-preferences')} />
        <main className="c-preview" role="main">
          <Card variant="border">
            <form className="c-preview__container" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="c-preview__book">
                <BookPreview selected={selected as CartItem} bookPages={bookPages} cover={watch('Cover')} />
              </div>
              <div className="c-preview__details">
                <div className="c-preview__details--left">
                  <h2>{t('book-specs')}</h2>
                  <div className="c-preview__details__content">
                    <div className="c-preview__details__item">
                      <span className="icon-ico_verified" /> {t('book-specs-1')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-ico_premium_account" /> {t('book-specs-2')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-ico_book" /> {t('book-specs-3')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-gift" /> {t('manufacturing-time')}
                    </div>
                  </div>
                </div>
                <div className="c-preview__details--right">
                  <div className="c-preview__cover">
                    <FieldCover schema={schema(t).cover} errors={errors.Cover} register={register} />
                  </div>
                  <Button type="submit" width="320px">
                    {t('form:continue-order-button')}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </main>
      </div>
      <Modal
        title={t('guest-order-title')}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actions={
          <Fragment>
            <Button width="100%" onClick={() => tempData && saveToCookies(tempData)} style={{ marginBottom: 12 }}>
              {t('login')}
            </Button>
            <Button width="100%" onClick={() => continueAsGuest()} variant="outline" color="black">
              {t('continue-guest')}
            </Button>
          </Fragment>
        }
        content={t('guest-order-info')}
      />
      {/* Desktop-specific styles */}
      <style jsx>{`
        .c-preview {
          @apply mx-auto mt-8 w-full;

          &__container {
            @apply overflow-hidden text-center;
            padding: 42px 30px 30px;
          }

          &__book {
            @apply mb-8;
          }

          &__cover {
            @apply flex justify-center;
          }

          &__link {
            @apply cursor-pointer font-semibold transition-colors duration-200;
            color: #445ca4;

            &:hover {
              color: #334c8a;
            }

            span {
              @apply font-normal;
            }
          }

          &__details {
            @apply flex gap-8;
            margin-top: 30px;

            &--left,
            &--right {
              @apply w-1/2;
            }

            &--left {
              @apply pr-8 text-left;
            }

            &--right {
              @apply flex flex-col justify-between space-y-6;
            }

            h2 {
              @apply mb-2 text-xl font-semibold leading-6;
            }

            &__content {
              @apply font-opensans leading-6;
            }

            &__item {
              @apply mb-2 flex items-baseline;

              span {
                @apply mr-3 text-blue-600;
              }
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default PreviewContainer;
