import React from 'react';
import { withTranslation, Link } from 'i18n';
import LazyLoad from 'react-lazyload';

const Footer = React.memo((props: any) => {
  const socialMedia = [
    // { icon: 'twitter_white', url: 'https://twitter.com' },
    { icon: 'instagram_white', url: 'https://www.instagram.com/wigubooks/' },
    { icon: 'facebook_white', url: 'https://www.facebook.com/wigubooks' },
  ];

  return (
    <div>
      <div className="c-footer">
        <div className="u-container c-footer__container">
          <div className="c-footer__left">
            <LazyLoad>
              <img alt="item" className="c-footer__left__logo" width="58" src="/static/images/logo-white.png" />
            </LazyLoad>
            <div className="c-footer__left__info">
              <div className="c-footer__left__name">When I Grow Up</div>
              <div className="c-footer__left__address">
                CoHive - Sahid Sudirman Residence
                <br />
                Jl. Jend. Sudirman No.86, Tanah Abang, Kota Jakarta Pusat, Jakarta 10250
              </div>
            </div>
          </div>
          <div className="c-footer__right">
            <div className="c-footer__right__menu">
              <Link href="/about">
                <a>{props.t('about-us')}</a>
              </Link>
              <Link href="/policies">
                <a>{props.t('policies')}</a>
              </Link>
              <Link href="/terms">
                <a>{props.t('terms')}</a>
              </Link>
              <Link href="/help">
                <a>{props.t('help-contact-us')}</a>
              </Link>
            </div>
            <div className="c-footer__right__social">
              {socialMedia.map(med => (
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
          @apply text-sm bg-dark-grey py-3;
          padding: 24px 0;
          @screen md {
            padding: 48px 0;
          }
          &__container {
            @apply flex flex-col;
            @screen md {
              @apply justify-between flex-row;
            }
          }
          &__left {
            @apply flex items-center flex-col justify-center;
            @screen md {
              @apply flex-row;
              justify-content: unset;
            }
            &__logo {
              @apply mr-3;
              width: 58px;
            }
            &__name {
              @apply font-semibold text-white text-base;
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
                @apply text-left my-0;
              }
            }
          }
          &__right {
            @apply flex flex-col;
            @screen md {
              @apply flex-row;
            }
            &__menu {
              @apply flex text-white text-center font-semibold underline flex-col;
              margin-bottom: 40px;
              height: 110px;
              justify-content: space-evenly;
              @screen md {
                @apply font-semibold text-left mb-0 no-underline items-end;
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

export default withTranslation('common')(Footer);
