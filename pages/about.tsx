import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LazyLoad from 'react-lazyload';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { wrapper } from 'store';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Button = dynamic(() => import('components/atoms/Button'));
const Footer = dynamic(() => import('components/organisms/Footer'));

const Help = ({ isMobile, setSideNav }: { isMobile?: boolean; setSideNav?: (open: boolean) => void }) => {
  const { t } = useTranslation('common');
  const names = [
    'Jasper Moon',
    'Lila Fern',
    'Kai Rivers',
    'Nova Finch',
    'Milo Frost',
    'Zara Quill',
    'Orion Vale',
    'Sage Ember',
    'Ezra Wren',
    'Ivy Solis',
    'Atlas Reed',
    'Mira Cove',
    'Finn Wilder',
    'Vera Lark',
    'Rowan Pike',
    'Sienna Gale',
    'Theo Marsh',
    'Aria Finch',
    'Leo Frost',
    'Nina Vale',
  ];
  const renderNames = (string: string) => {
    let content = string;
    names.forEach((name) => {
      content = content.replace('[name]', `<strong>${name}</strong>`);
    });
    return DOMPurify.sanitize(content);
  };
  return (
    <DefaultLayout
      isMobile={isMobile}
      navbar={isMobile && <NavBar setSideNav={setSideNav} menuAction title={t('about-us')} />}
    >
      <Head>
        <title>Interactive Bookshop Next.js | {t('about-us')}</title>
      </Head>
      <div className={`u-container__page ${isMobile ? 'pt-0' : 'u-container pb-0'}`}>
        {!isMobile && <Stepper title={t('about-us')} />}
        <div className="c-about-us">
          <div className="c-about-us--long">
            <strong>Interactive Bookshop Next.js</strong> adalah personalized book publisher ...
          </div>
          <div className="c-about-us--long">
            <strong>Interactive Bookshop Next.js</strong> dibangun karena di zaman yang serba digital ...
          </div>
          <div className="c-about-us--quote">
            <span>&ldquo;</span>Misi kami ingin terus meningkatan literasi anak bangsa.<span>&rdquo;</span>
          </div>
          <div className="c-about-us--long">Perlu kita ketahui bahwa gemar membaca ...</div>
          <Link href="/create">
            <Button className="text-center">{t('cart-empty-cta')}</Button>
          </Link>
        </div>
        <LazyLoad>
          <Image
            className="c-about-us__image c-about-us--long"
            src="/static/images/about-us.png"
            alt="about-us"
            width={800}
            height={400}
          />
        </LazyLoad>
        <div className="c-about-us c-about-us__team c-about-us--long">
          <div
            className="c-about-us__team__content"
            dangerouslySetInnerHTML={{ __html: renderNames(t('team-desc')) }}
          />
        </div>
        <div className="c-about-us__powered">
          <h5>Powered by:</h5>
          <div className="c-about-us__powered__container">
            <a href="https://www.tjetak.com/" rel="noreferrer noopener" target="_blank">
              <LazyLoad>
                <Image
                  className="c-about-us__powered__image"
                  src="https://picsum.photos/100/20"
                  alt="tjetak"
                  width={100}
                  height={20}
                  unoptimized
                />
              </LazyLoad>
            </a>
          </div>
        </div>
      </div>
      {isMobile && <Footer />}
      <style jsx>{`
        .c-about-us {
          &__title {
            @apply font-semibold;
            font-size: 16px;
            line-height: 24px;
          }
          @apply mb-5 p-6;
          @screen md {
            @apply mb-10 p-0;
          }
          &__team {
            @apply mt-5;
          }
          &--long {
            @apply mx-auto my-6 w-full text-sm leading-normal;
            strong {
              @apply font-semibold leading-snug;
            }
            @screen md {
              @apply my-10 w-11/12 text-base;
            }
            @screen lg {
              @apply w-10/12;
            }
            @screen xl {
              @apply w-9/12;
            }
            &:first-child {
              @apply mt-0;
              @screen md {
                @apply mt-8;
              }
            }
          }
          &--quote {
            @apply mx-auto my-8 w-10/12 text-center font-opensans text-xl font-bold leading-normal;
            @screen md {
              @apply my-12 w-7/12 text-2xl;
            }
            @screen xl {
              @apply w-6/12;
            }
            span {
              @apply p-1;
            }
          }
          &__image {
            @apply my-0;
            margin-top: -24px;
          }
          &__powered {
            @apply mb-20 mt-6 p-6;
            @screen md {
              @apply mb-32 mt-12 p-0;
            }
            h5 {
              @apply text-center font-semibold;
            }
            &__container {
              @apply mt-5 flex justify-center;
              @screen md {
              }
            }
            &__image {
              @apply object-contain;
              width: 100px;
              height: 20px;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        strong {
          @apply font-semibold;
        }
      `}</style>
    </DefaultLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(() => async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common'])),
    },
  };
});

export default Help;
