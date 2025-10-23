import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';

/**
 * Social media platform configuration
 */
interface SocialMediaItem {
  /** Icon class name for the social media platform */
  icon: string;
  /** URL to the social media profile */
  url: string;
  /** Platform name for accessibility */
  name: string;
  /** ARIA label for screen readers */
  ariaLabel: string;
}

/**
 * Props interface for the Footer component
 */
interface FooterProps {
  /** Company/site name to display */
  companyName?: string;
  /** Company address to display */
  address?: string;
  /** Array of social media links */
  socialLinks?: SocialMediaItem[];
  /** Logo image source path */
  logoSrc?: string;
  /** Logo alt text for accessibility */
  logoAlt?: string;
}

// Default social media configuration - extracted for maintainability
const DEFAULT_SOCIAL_MEDIA: SocialMediaItem[] = [
  {
    icon: 'twitter_white',
    url: 'https://twitter.com',
    name: 'Twitter',
    ariaLabel: 'Visit our Twitter profile',
  },
  {
    icon: 'instagram_white',
    url: 'https://instagram.com',
    name: 'Instagram',
    ariaLabel: 'Visit our Instagram profile',
  },
  {
    icon: 'facebook_white',
    url: 'https://facebook.com',
    name: 'Facebook',
    ariaLabel: 'Visit our Facebook profile',
  },
];

/**
 * Footer Component
 *
 * A comprehensive site footer containing company information, navigation links,
 * and social media connections. Features responsive design with mobile-optimized
 * layout and proper accessibility support.
 *
 * Key Features:
 * - Responsive layout (stacked on mobile, side-by-side on desktop)
 * - Configurable company information and social media links
 * - Internationalization support for navigation links
 * - Optimized images with Next.js Image component
 * - Proper semantic HTML structure and accessibility attributes
 * - Memoized for performance optimization
 */
const Footer = memo<FooterProps>(
  ({
    companyName = 'Interactive Bookshop Next.js',
    address = 'Lorem Ipsum\nJakarta Indonesia',
    socialLinks = DEFAULT_SOCIAL_MEDIA,
    logoSrc = '/static/images/logo-white.png',
    logoAlt = 'Company logo',
  }) => {
    /** Translation function for internationalization */
    const { t } = useTranslation('common');

    return (
      <div>
        <footer className="c-footer" role="contentinfo" aria-label="Site footer">
          <div className="u-container c-footer__container">
            {/* Left section with company logo and information */}
            <div className="c-footer__left">
              {/* Company logo with Next.js optimized Image component */}
              <div className="c-footer__left__logo-container">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={58}
                  height={58}
                  className="c-footer__left__logo"
                  priority={false}
                />
              </div>

              {/* Company information section */}
              <div className="c-footer__left__info">
                <div className="c-footer__left__name">{companyName}</div>
                <address className="c-footer__left__address">
                  {address.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < address.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </address>
              </div>
            </div>
            {/* Right section with navigation and social media links */}
            <div className="c-footer__right">
              {/* Footer navigation menu */}
              <nav className="c-footer__right__menu" role="navigation" aria-label="Footer navigation">
                <Link href="/about">
                  <a aria-label="Learn more about us">{t('about-us')}</a>
                </Link>
                <Link href="/policies">
                  <a aria-label="Read our policies">{t('policies')}</a>
                </Link>
                <Link href="/terms">
                  <a aria-label="Read our terms of service">{t('terms')}</a>
                </Link>
                <Link href="/help">
                  <a aria-label="Get help or contact us">{t('help-contact-us')}</a>
                </Link>
              </nav>

              {/* Social media links section */}
              <div className="c-footer__right__social" role="list" aria-label="Social media links">
                {socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    title={`Visit our ${social.name} profile`}
                    role="listitem"
                  >
                    <span className={`icon-${social.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Component-scoped styles using styled-jsx */}
        <style jsx>{`
          .c-footer {
            @apply bg-dark-grey py-3 text-sm;
            padding: 24px 0;

            @screen md {
              padding: 48px 0;
            }

            &__container {
              @apply flex flex-col;

              @screen md {
                @apply flex-row justify-between;
              }
            }

            &__left {
              @apply flex flex-col items-center justify-center;

              @screen md {
                @apply flex-row;
                justify-content: unset;
              }

              &__logo-container {
                @apply mr-3;
              }

              &__logo {
                width: 58px;
                height: 58px;
              }
              &__name {
                @apply text-base font-semibold text-white;
                line-height: 24px;

                @screen md {
                  @apply text-sm;
                }
              }

              &__address {
                @apply text-xs text-white;
                width: 300px;
                line-height: 19px;
                font-style: normal;
              }

              &__info {
                @apply text-center;
                margin-top: 15px;
                margin-bottom: 30px;

                @screen md {
                  @apply my-0 text-left;
                }
              }
            }

            &__right {
              @apply flex flex-col;

              @screen md {
                @apply flex-row;
              }

              &__menu {
                @apply flex flex-col text-center font-semibold text-white underline;
                margin-bottom: 40px;
                height: 110px;
                justify-content: space-evenly;

                @screen md {
                  @apply mb-0 items-end text-left font-semibold no-underline;
                  height: 100px;
                  padding-right: 30px;
                  border-right: 1px solid white;
                }

                a {
                  transition: opacity 0.2s ease;

                  &:hover {
                    opacity: 0.8;
                  }
                }
              }

              &__social {
                @apply mx-auto flex justify-between;
                font-size: 36px;
                width: 144px;

                @screen md {
                  @apply items-center;
                  justify-content: unset;
                  width: auto;
                  font-size: 30px;
                  padding-left: 30px;

                  a {
                    margin-right: 18px;
                    transition: transform 0.2s ease;

                    &:last-child {
                      margin-right: 0;
                    }

                    &:hover {
                      transform: translateY(-2px);
                    }
                  }
                }
              }
            }
          }
        `}</style>
      </div>
    );
  },
);

// Set display name for debugging purposes
Footer.displayName = 'Footer';

export default Footer;
