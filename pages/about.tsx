import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, PropsFromRedux } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';
import DOMPurify from 'dompurify';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { WithTranslation } from 'next-i18next';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Button = dynamic(() => import('components/atoms/Button'));
const Footer = dynamic(() => import('components/organisms/Footer'));

interface HelpProps extends WithTranslation, PropsFromRedux {
  isMobile: boolean;
}
const Help = (props: HelpProps) => {
  const names = [
    'Vinsensiana Aprillia',
    'Dwita Regiana',
    'Anita Yustisia',
    'Dhana Bisma',
    'Amanda',
    'Aninda',
    'Raffisal',
    'Fariz',
    'Riyan Aga',
    'Taufiq El Rahman',
    'Vandi',
    'Dhana Bisma',
  ];
  const renderNames = (string: string) => {
    let content = string;
    names.forEach(name => {
      content = content.replace('[name]', `<strong>${name}</strong>`);
    });
    return DOMPurify.sanitize(content);
  };
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('about-us')} />}
    >
      <Head>
        <title>When I Grow Up | {props.t('about-us')}</title>
      </Head>
      <div className={`u-container__page ${props.isMobile ? 'pt-0' : 'u-container pb-0'}`}>
        {!props.isMobile && <Stepper title={props.t('about-us')} />}
        <div className="c-about-us">
          <div className="c-about-us--long">
            <strong>When I Grow Up</strong> adalah personalized book publisher yang dimana sebagai pembeli dapat ikut
            terlibat dalam pembuatan alur cerita, nama dan karakter si anak dalam buku, semua itu dapat dikerjakan
            dengan mudah dan dalam satu waktu.
          </div>
          <div className="c-about-us--long">
            <strong>When I Grow Up</strong> dibangun karena di zaman yang serba digital ini, minat dan ketertarikan anak
            dalam membaca buku semakin kecil. Buku cerita yang ada di Indonesia saat ini pun masih belum ada yang
            benar-benar membuat anak dapat tertarik membacanya.
          </div>
          <div className="c-about-us--quote">
            <span>&ldquo;</span>Misi kami ingin terus meningkatan literasi anak bangsa.<span>&rdquo;</span>
          </div>
          <div className="c-about-us--long">
            Perlu kita ketahui bahwa gemar membaca dapat meningkatkan pengetahuan yang luas, konsentrasi, imajinasi,
            sosial-emosinya dan masih banyak lagi. Misi besar kami adalah meningkatkan <strong>literasi</strong> anak
            penerus bangsa.
          </div>
          <Link href="/create">
            <a>
              <Button className="text-center">{props.t('cart-empty-cta')}</Button>
            </a>
          </Link>
        </div>
        <LazyLoad>
          <img className="c-about-us__image c-about-us--long" src="/static/images/about-us.png" alt="about-us" />
        </LazyLoad>
        <div className="c-about-us c-about-us__team c-about-us--long">
          <div
            className="c-about-us__team__content"
            dangerouslySetInnerHTML={{ __html: renderNames(props.t('team-desc')) }}
          />
        </div>
        <div className="c-about-us__powered">
          <h5>Powered by:</h5>
          <div className="c-about-us__powered__container">
            <a href="https://www.tjetak.com/" rel="noreferrer noopener" target="_blank">
              <LazyLoad>
                <img
                  className="c-about-us__powered__image"
                  src="/static/images/tjetak.png"
                  alt="tjetak"
                  width="100"
                  height="20"
                />
              </LazyLoad>
            </a>
          </div>
        </div>
      </div>
      {props.isMobile && <Footer isMobile={props.isMobile} />}
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
            @apply w-full my-6 leading-normal mx-auto text-sm;
            strong {
              @apply font-semibold leading-snug;
            }
            @screen md {
              @apply w-11/12 my-10 text-base;
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
            @apply w-10/12 my-8 text-center text-xl leading-normal font-opensans font-bold mx-auto;
            @screen md {
              @apply w-7/12 my-12 text-2xl;
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
            @apply mt-6 mb-20 p-6;
            @screen md {
              @apply p-0 mt-12 mb-32;
            }
            h5 {
              @apply font-semibold text-center;
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

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Help));
