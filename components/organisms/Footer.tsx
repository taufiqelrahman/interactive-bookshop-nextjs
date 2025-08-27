import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import LazyLoad from 'react-lazyload';

const Footer = memo(() => {
  const { t } = useTranslation('common');
  const socialMedia = [
    { icon: 'twitter_white', url: 'https://twitter.com' },
    { icon: 'instagram_white', url: 'https://instagram.com' },
    { icon: 'facebook_white', url: 'https://facebook.com' },
  ];

  return (
    <div>
      <div className="c-footer">
        <div className="u-container c-footer__container">
          <div className="c-footer__left">
            <LazyLoad>
              <Image alt="item" className="c-footer__left__logo" width="58" src="/static/images/logo-white.png" />
            </LazyLoad>
            <div className="c-footer__left__info">
              <div className="c-footer__left__name">Interactive Bookshop Next.js</div>
              <div className="c-footer__left__address">
                Lorem Ipsum
                <br />
                Jakarta Indonesia
              </div>
            </div>
          </div>
          <div className="c-footer__right">
            <div className="c-footer__right__menu">
              <Link href="/about">
                <a>{t('about-us')}</a>
              </Link>
              <Link href="/policies">
                <a>{t('policies')}</a>
              </Link>
              <Link href="/terms">
                <a>{t('terms')}</a>
              </Link>
              <Link href="/help">
                <a>{t('help-contact-us')}</a>
              </Link>
            </div>
            <div className="c-footer__right__social">
              {socialMedia.map((med) => (
                <a key={med.icon} href={med.url} target="_blank" rel="noopener noreferrer">
                  <span className={`icon-${med.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
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
            &__logo {
              @apply mr-3;
              width: 58px;
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
                  &:last-child {
                    margin-right: 0;
                  }
                }
              }
            }
          }
        }
      `}</style>
    </div>
  );
});
Footer.displayName = 'Footer';

export default Footer;
