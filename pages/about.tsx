import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import NavBar from 'components/organisms/NavBar/mobile';
import Head from 'next/head';
import Button from 'components/atoms/Button';

const Help = (props: any): any => {
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('about-us')} />}
    >
      <Head>
        <title>When I Grow Up | {props.t('about-us')}</title>
      </Head>
      <div className={`u-container__page ${props.isMobile ? '' : 'u-container'}`}>
        {!props.isMobile && <Stepper title={props.t('about-us')} />}
        <img className="c-about-us__image c-about-us--long" src="https://picsum.photos/800/240" alt="about-us" />
        <div className="c-about-us">
          {props.isMobile && <div className="c-about-us__title">{props.t('about-us')}</div>}
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
            <span>&ldquo;</span>Visi kami ingin terus meningkatan literasi anak bangsa.<span>&rdquo;</span>
          </div>
          <div className="c-about-us--long">
            Perlu kita ketahui bahwa gemar membaca dapat meningkatkan pengetahuan yang luas, konsentrasi, imajinasi,
            sosial-emosinya dan masih banyak lagi. Visi besar kami adalah meningkatkan <strong>literasi</strong> anak
            penerus bangsa.
          </div>
          <Link href="/create">
            <a>
              <Button className="text-center">{props.t('cart-empty-cta')}</Button>
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .c-about-us {
          &__title {
            @apply font-semibold;
            font-size: 16px;
            line-height: 24px;
          }
          @apply mb-16 p-6;
          @screen md {
            @apply mb-24 p-0;
          }
          &--long {
            @apply w-full my-8 leading-normal mx-auto text-sm;
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
          }
          &--quote {
            @apply w-10/12 my-10 text-center text-xl leading-normal font-opensans font-bold mx-auto;
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
            height: 180px;
            @screen md {
              @apply mt-8;
              height: 240px;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['common', 'form'])(connect(mapStateToProps, mapDispatchToProps)(Help));
