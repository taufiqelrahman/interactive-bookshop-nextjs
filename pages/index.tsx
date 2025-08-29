import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { Link, Element } from 'react-scroll';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import * as gtag from 'lib/gtag';
import api from 'services/api';
import { RootState, wrapper } from 'store';
import { loadOccupations, loadTestimonials } from 'store/master/reducers';

const Button = dynamic(() => import('components/atoms/Button'));
const TestimonialSlider = dynamic(() => import('components/organisms/TestimonialSlider'));
const BookForm = dynamic(() => import('components/organisms/BookForm'));
const Showcase = dynamic(() => import('components/atoms/Showcase'));
const Footer = dynamic(() => import('components/organisms/Footer'));

const Index = (props: any): JSX.Element => {
  const { t } = useTranslation('page-index');
  const { testimonials, occupations } = useSelector((state: RootState) => state.master);
  const { isMobile, setSideNav } = props;

  const occupationsTop = isMobile ? occupations.slice(0, 1) : occupations.slice(0, 5);
  const occupationsBottom = isMobile ? occupations.slice(1, 3) : occupations.slice(5, 9);

  // const createCheckout = async () => {
  //   let checkout = await graphql().checkout.create({
  //     email: 'asd@asd.com',
  //     // shippingAddress: {
  //     //   // firstName: '',
  //     //   lastName: 'asdasd',
  //     //   address1: 'jl. aselih',
  //     //   address2: 'cipedak',
  //     //   city: 'jakarta selatan',
  //     //   province: 'dki jakarta',
  //     //   zip: '54321',
  //     //   phone: '085747977734',
  //     //   country: 'indonesia',
  //     // },
  //   });
  //   const lineItemsToAdd = [
  //     {
  //       variantId: process.env.SHOPIFY_VARIANT_ID,
  //       quantity: 1,
  //     },
  //   ];
  //   checkout = await graphql().checkout.addLineItems(checkout.id, lineItemsToAdd);
  //   console.log(checkout);
  //   console.log(checkout.webUrl);
  // };

  // useEffect(() => {
  //   createCheckout();
  // }, []);

  const landingTracker = () => {
    gtag.event({
      action: 'click_landing',
      category: 'engagement',
      label: isMobile ? 'mobile' : 'desktop',
    });
  };

  return (
    <DefaultLayout {...props} navbar={isMobile && <NavBar setSideNav={setSideNav} menuAction={true} />}>
      <Head>
        <title>Interactive Bookshop Next.js</title>
      </Head>
      {/* {props.isMobile && <NavBar icon="menu" />} */}
      <div className="c-section--top">
        <div className="c-section__create-now">
          <div className="u-container">
            <div className="c-section--top__container">
              <div className="c-section__content">
                <h1>{t('createnow-title')}</h1>
                <div className="c-section__content__content">{t('createnow-content')}</div>
                <Link to="create-book" spy smooth offset={-100} duration={500} onClick={landingTracker}>
                  <Button variant="outline" color="black" style={{ marginTop: 24 }}>
                    {t('createnow-button')}
                  </Button>
                </Link>
              </div>
              <div className="c-section--top__image">
                <img src={`/static/images/pilots${props.isMobile ? '-sm' : ''}.png`} alt="pilots" />
              </div>
            </div>
            <div className="c-section__create-now__books">
              <LazyLoad>
                <img src="/static/images/book-decoration.png" alt="books" />
              </LazyLoad>
            </div>
            <div className="c-section__create-now__dust">
              <LazyLoad>
                <img src="/static/images/dust-decoration.png" alt="dust" />
              </LazyLoad>
            </div>
          </div>
        </div>
        <div className="c-section__start-story">
          <div className="u-container">
            <div>
              <div className="c-section--top__container">
                <div className="c-section--top__image c-section--top__image--kid">
                  <Showcase isMobile={props.isMobile} />
                  {/* <LazyLoad>
                    <img src={`/static/images/pilots${props.isMobile ? '-sm' : ''}.png`} alt="pilots" />
                  </LazyLoad> */}
                </div>
                <div className="c-section__content text-white">
                  <h1 className="mb-4">{t('startstory-title')}</h1>
                  <div className="c-section__content__content">{t('startstory-content')}</div>
                  {/* <a href="#create-book">
                    <Button variant="outline" color="white">
                      {t('startstory-button')}
                    </Button>
                  </a> */}
                </div>
              </div>
              {/* {!props.isMobile && (
                <div className="c-section__start-story__socks">
                  <img src="/static/images/socks.png" alt="socks" />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <div className="c-section--middle">
        <div className="c-section__jobs--top">
          {occupationsTop.map((job) => (
            <div key={job.id} className="c-section__jobs__circle">
              <LazyLoad>
                <img src={`/static/images/jobs-lg/${(job.name || '').toLowerCase()}.png`} alt={job.name} />
              </LazyLoad>
            </div>
          ))}
        </div>
        <div className="c-section__jobs--bottom">
          {occupationsBottom.map(
            (job) =>
              job.name !== 'President' && (
                <div key={job.id} className="c-section__jobs__circle">
                  <LazyLoad>
                    <img src={`/static/images/jobs-lg/${(job.name || '').toLowerCase()}.png`} alt={job.name} />
                  </LazyLoad>
                </div>
              ),
          )}
        </div>
        <div className="c-section__content c-section__content--middle text-white">
          <h1>{t('choosenow-title')}</h1>
          <div className="c-section__content__content">{t('choosenow-content')}</div>
          {/* <a href="#create-book">
            <Button variant="outline" color="white">
              {t('choosenow-button')}
            </Button>
          </a> */}
        </div>
      </div>
      <div className="c-section--bottom">
        <div className="c-section--bottom__testi">
          <TestimonialSlider isMobile={isMobile} testimonials={testimonials} />
        </div>
        <div id="create-book">
          <LazyLoad>
            <div className="c-section--bottom__create-book">
              <Element name="create-book">
                <h2>{t('createbook-header')}</h2>
                <BookForm isMobile={isMobile} />
              </Element>
            </div>
          </LazyLoad>
        </div>
      </div>
      {isMobile && <Footer />}
      <style jsx>{`
        .c-section {
          &--top {
            /* background: url('/static/images/clouds.png') 0 35vh no-repeat,
              linear-gradient(180deg, #ffe2b0 -7.09%, #f1d096 32.55%, #536390 70.5%); */
            background: linear-gradient(180deg, #f7d8a2 0%, #ffc4b3 33.41%, #3d77c7 70.5%);
            @apply bg-contain;
            /* @screen md {
              background: url('/static/images/clouds.png') 0 80px no-repeat,
                linear-gradient(180deg, #ffe2b0 -7.09%, #f1d096 32.55%, #536390 70.5%);
            } */
            &__container {
              @apply relative flex w-full flex-col-reverse items-center;
              z-index: 1;
              .c-section__start-story & {
                @apply flex-col;
              }
              @screen md {
                flex-direction: row !important;
              }
            }
            &__image {
              &--kid {
                margin: 0;
                width: 80vw;
                img {
                  @apply m-auto;
                  @screen md {
                    @apply m-0;
                  }
                }
              }
              img {
                @apply object-contain;
              }
              @screen md {
                @apply flex w-7/12 justify-end;
                margin-left: 0;
                margin-top: 0;
              }
            }
          }
          &--middle {
            @apply w-full;
            padding-bottom: 227px;
            /* background: linear-gradient(180deg, #536390 0%, #3ba99c 100%); */
            background: linear-gradient(180deg, #3d77c7 0%, #228e79 100%);
            @screen md {
              padding-bottom: 240px;
            }
          }
          &--bottom {
            @apply relative z-10;
            &__testi {
              @apply overflow-hidden pb-4;
              /* background: linear-gradient(180deg, #3ba99c 0%, #f4c574 100%); */
              background: linear-gradient(180deg, #228e7a 0%, #bcb776 100%);
              @screen md {
                padding-bottom: 300px;
              }
            }
            &__create-book {
              /* @apply bg-no-repeat bg-cover; */
              padding-top: 246px;
              padding-bottom: 60px;
              /* background-color: #f4c574;
              background-image: url('/static/images/create-book-bg-small.png'); */
              background:
                url('/static/images/create-book-bg-mweb.png') no-repeat,
                linear-gradient(180deg, #bcb776 0%, #ccba75 20%, #f4c574 100%);
              background-size: cover;
              min-height: 630px;
              background-position: center top;
              @screen md {
                @apply pb-0 pt-0;
                background:
                  url('/static/images/create-book-bg-small.png') no-repeat,
                  linear-gradient(180deg, #bcb776 0%, #ccba75 20%, #f4c574 100%);
                background-position: center bottom;
              }
              @screen lg {
                background-size: contain;
              }
              h2 {
                @apply mb-8 text-center font-semibold text-white;
                font-size: 28px;
                line-height: 42px;
                @screen md {
                  font-size: 40px;
                  line-height: 60px;
                }
              }
            }
          }
          &__content {
            @apply w-full text-center;
            padding: 0 30px;
            z-index: 10;
            @screen md {
              @apply w-5/12 text-left;
              padding: 0;
            }
            h1 {
              @apply mb-3 font-semibold;
              font-size: 28px;
              line-height: 42px;
              @screen md {
                @apply text-left;
                font-size: 48px;
                line-height: 55px;
              }
            }
            h2 {
              @apply mb-4 font-semibold;
              font-size: 28px;
              line-height: 42px;
              @screen md {
                @apply text-left;
                font-size: 40px;
                line-height: 58px;
              }
            }
            &__content {
              @apply font-opensans;
              line-height: 22px;
              @screen md {
                @apply text-left;
                line-height: 22px;
                width: 350px;
              }
            }
            &--middle {
              @apply w-full text-center;
              h1,
              h2 {
                @apply text-center;
                margin-bottom: 12px;
                @screen md {
                  @apply mb-4;
                }
              }
              div {
                @apply text-center;
                width: auto;
              }
            }
          }
          &__create-now {
            @apply relative;
            padding-top: 61px;
            @screen md {
              padding-top: 157px;
            }
            &__book {
              @apply ml-auto mt-12 w-5/12;
              img {
                width: 93px;
                height: 75px;
                @screen md {
                  width: 202px;
                  height: 162px;
                }
              }
            }
            &__books {
              @apply absolute hidden;
              bottom: -20%;
              width: 90vw;
              left: 50%;
              margin-left: -45vw;
              right: 50%;
              margin-right: -45vw;
              @screen md {
                @apply block;
              }
              @screen lg {
                width: 70vw;
                margin-left: -35vw;
                margin-right: -35vw;
              }
            }
            &__dust {
              @apply absolute;
              top: 38%;
              width: 100vw;
              left: 0;
              @screen md {
                @apply hidden;
              }
              img {
                @apply w-full;
              }
            }
            & .c-section--top__image {
              @apply mb-8 pl-6;
              @screen md {
                @apply mb-0;
              }
            }
          }
          &__start-story {
            padding-top: 97px;
            padding-bottom: 121px;
            @screen md {
              padding-top: 240px;
              padding-bottom: 194px;
              & .c-section--top__image {
                padding-right: 78px;
              }
            }
            & .c-section__content {
              @screen md {
                padding-bottom: 81px;
              }
            }
            &__socks {
              @apply ml-auto mt-16;
              width: 159px;
              height: 138px;
            }
          }
          &__jobs {
            &--top {
              @apply mx-auto flex justify-center;
            }
            &--bottom {
              @apply mx-auto mb-12 mt-8 flex justify-center;
            }
            &__circle {
              @apply mx-4 flex items-center justify-center bg-white;
              width: 120px;
              height: 120px;
              border-radius: 50%;
              padding: 12px;
              img {
                @apply w-full;
              }
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    const [{ data: testi }, { data: occupations }] = await Promise.all([
      api().master.getTestimonials(),
      api().master.getOccupations(),
    ]);

    store.dispatch(loadTestimonials({ isFetching: false, data: testi.data }));
    store.dispatch(loadOccupations({ isFetching: false, data: occupations.data }));
  } catch (err: any) {
    console.error('❌ Index getServerSideProps:', err.message);
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'page-index', 'form'])),
    },
  };
});

export default Index;
