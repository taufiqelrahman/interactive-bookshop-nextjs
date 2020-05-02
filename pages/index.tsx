import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
// import api from 'services/api';
import DefaultLayout from 'components/layouts/Default';
import { withTranslation } from 'i18n';
import TestimonialSlider from 'components/organisms/TestimonialSlider';
import BookForm from 'components/organisms/BookForm';
import Button from 'components/atoms/Button';
import Head from 'next/head';
import NavBar from 'components/organisms/NavBar/mobile';
import Footer from 'components/organisms/Footer';
import actions from 'store/actions';
// import graphql from 'services/graphql';
import api from 'services/api';

const Index = (props: any): any => {
  const { testimonials, occupations } = props.state.master;
  const occupationsTop = props.isMobile ? occupations.slice(0, 1) : occupations.slice(0, 5);
  const occupationsBottom = props.isMobile ? occupations.slice(1, 3) : occupations.slice(5, 9);

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

  return (
    <DefaultLayout {...props} navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} />}>
      <Head>
        <title>When I Grow Up</title>
      </Head>
      {/* {props.isMobile && <NavBar icon="menu" />} */}
      <div className="c-section--top">
        <div className="c-section__create-now">
          <div className="u-container">
            <div className="c-section--top__container">
              <div className="c-section__content">
                <h1>{props.t('createnow-title')}</h1>
                <div className="c-section__content__content">{props.t('createnow-content')}</div>
                <a href="#create-book">
                  <Button variant="outline" color="black">
                    {props.t('createnow-button')}
                  </Button>
                </a>
              </div>
              <div className="c-section--top__image">
                <img src={`/static/images/guitars${props.isMobile ? '-sm' : ''}.png`} alt="guitars" />
              </div>
            </div>
            <div className="c-section__create-now__books">
              <img src="/static/images/book-decoration.png" alt="books" />
            </div>
            <div className="c-section__create-now__dust">
              <img src="/static/images/dust-decoration.png" alt="dust" />
            </div>
          </div>
        </div>
        <div className="c-section__start-story">
          <div className="u-container">
            <div>
              <div className="c-section--top__container">
                <div className="c-section--top__image c-section--top__image--kid">
                  <img src={`/static/images/pilots${props.isMobile ? '-sm' : ''}.png`} alt="pilots" />
                </div>
                <div className="c-section__content text-white">
                  <h1 className="mb-4">{props.t('startstory-title')}</h1>
                  <div className="c-section__content__content">{props.t('startstory-content')}</div>
                  <a href="#create-book">
                    <Button variant="outline" color="white">
                      {props.t('startstory-button')}
                    </Button>
                  </a>
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
          {occupationsTop.map(job => (
            <div key={job.id} className="c-section__jobs__circle">
              <img src={`/static/images/jobs/${(job.name || '').toLowerCase()}.png`} alt={job.name} />
            </div>
          ))}
        </div>
        <div className="c-section__jobs--bottom">
          {occupationsBottom.map(
            job =>
              job.name !== 'President' && (
                <div key={job.id} className="c-section__jobs__circle">
                  <img src={`/static/images/jobs/${(job.name || '').toLowerCase()}.png`} alt={job.name} />
                </div>
              ),
          )}
        </div>
        <div className="c-section__content text-white c-section__content--middle">
          <h1>{props.t('choosenow-title')}</h1>
          <div className="c-section__content__content">{props.t('choosenow-content')}</div>
          <a href="#create-book">
            <Button variant="outline" color="white">
              {props.t('choosenow-button')}
            </Button>
          </a>
        </div>
      </div>
      <div className="c-section--bottom">
        <div className="c-section--bottom__testi">
          <TestimonialSlider isMobile={props.isMobile} testimonials={testimonials} />
        </div>
        <div id="create-book" className="c-section--bottom__create-book">
          <h2>{props.t('createbook-header')}</h2>
          <BookForm isMobile={props.isMobile} saveSelected={props.saveSelected} occupations={occupations} />
        </div>
      </div>
      {props.isMobile && <Footer isMobile={props.isMobile} />}
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
              @apply flex w-full items-center flex-col-reverse relative;
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
              }
              @screen md {
                @apply w-7/12 flex justify-end;
                margin-left: 0;
                margin-top: 0;
              }
            }
          }
          &--middle {
            @apply w-full;
            padding-bottom: 227px;
            @screen md {
              padding-bottom: 240px;
            }
            /* background: linear-gradient(180deg, #536390 0%, #3ba99c 100%); */
            background: linear-gradient(180deg, #3d77c7 0%, #228e79 100%);
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
              background: url('/static/images/create-book-bg-mweb.png') no-repeat,
                linear-gradient(180deg, #bcb776 0%, #ccba75 20%, #f4c574 100%);
              background-size: cover;
              min-height: 630px;
              background-position: center top;
              @screen md {
                @apply pt-0 pb-0;
                background: url('/static/images/create-book-bg-small.png') no-repeat,
                  linear-gradient(180deg, #bcb776 0%, #ccba75 20%, #f4c574 100%);
                background-position: center bottom;
              }
              @screen lg {
                background-size: contain;
              }
              h2 {
                @apply font-semibold mb-8 text-center text-white;
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
              @apply font-semibold mb-3;
              font-size: 28px;
              line-height: 42px;
              @screen md {
                @apply text-left;
                font-size: 48px;
                line-height: 55px;
              }
            }
            h2 {
              @apply font-semibold mb-4;
              font-size: 28px;
              line-height: 42px;
              @screen md {
                @apply text-left;
                font-size: 40px;
                line-height: 58px;
              }
            }
            &__content {
              @apply mb-6 font-opensans;
              line-height: 22px;
              @screen md {
                @apply text-left;
                line-height: 22px;
                width: 350px;
              }
            }
            &--middle {
              @apply text-center w-full;
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
              @apply ml-auto w-5/12 mt-12;
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
              z-index: 2;
              @screen md {
                @apply hidden;
              }
              img {
                @apply w-full;
              }
            }
            & .c-section--top__image {
              @apply pl-6 mb-8;
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
              padding-top: 32px;
              @screen md {
                padding-top: 100px;
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
              @apply mx-auto flex justify-center mb-12 mt-8;
            }
            &__circle {
              @apply bg-white mx-4;
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

Index.getInitialProps = async (ctx: any): Promise<any> => {
  try {
    const [{ data: testi }, { data: occupations }] = await Promise.all([
      api().master.getTestimonials(),
      api().master.getOccupations(),
    ]);
    ctx.reduxStore.dispatch(actions.loadTestimonials(false, testi.data));
    ctx.reduxStore.dispatch(actions.loadOccupations(false, occupations.data));
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
  return { namespacesRequired: ['page-index'] };
};

export default withTranslation('page-index')(connect(mapStateToProps, mapDispatchToProps)(Index));
