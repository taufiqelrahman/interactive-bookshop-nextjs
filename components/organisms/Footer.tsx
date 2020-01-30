import React from 'react';
import { withTranslation, Link } from 'i18n';

const Footer = React.memo((props: any) => {
  const socialMedia = [
    { icon: 'twitter', url: 'twitter.com' },
    { icon: 'instagram', url: 'instagram.com' },
    { icon: 'facebook', url: 'facebook.com' },
  ];

  return (
    <div>
      <div className="c-footer">
        <div className="u-container flex justify-between">
          <div className="c-footer__left">
            <div className="flex items-center">
              <img alt="item" className="c-footer__left__logo" width="58" src="/static/images/logo-white.png" />
              <div>
                <div className="c-footer__left__name">When I Grow Up</div>
                <div className="c-footer__left__address">
                  Plaza City View, Lt. 2 Jalan Ampera 22. Kemang, Jakarta Selatan 19540
                </div>
              </div>
            </div>
          </div>
          <div className="c-footer__right">
            <div className="flex">
              <div className="c-footer__right__menu">
                <Link href="/help">
                  <a>{props.t('help-contact-us')}</a>
                </Link>
              </div>
              <div className="c-footer__right__social">
                {socialMedia.map(med => (
                  <Link key={med.icon} href={med.url}>
                    <a>
                      {/* <span className={`icon-${med.icon}`} /> */}
                      {/* dummy */}
                      <span className="icon-chevron_left" />
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-footer {
          @apply text-sm bg-dark-grey py-3;
          padding: 48px 0;
          &__left {
            &__logo {
              @apply mr-3;
              width: 58px;
            }
            &__name {
              @apply font-semibold text-white;
              line-height: 24px;
            }
            &__address {
              @apply text-xs text-white;
              width: 300px;
              line-height: 19px;
            }
          }
          &__right {
            &__menu {
              @apply flex items-center font-semibold text-white;
              height: 60px;
              padding-right: 30px;
              border-right: 1px solid white;
            }
            &__social {
              @apply flex items-center;
              padding-left: 30px;
              a {
                margin-right: 6px;
                &:last-child {
                  margin-right: 0;
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
