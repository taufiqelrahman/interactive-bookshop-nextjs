import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
// import api from 'services/api';
import DefaultLayout from 'components/layouts/Default';
import { withTranslation } from 'i18n';
import TestimonialSlider from 'components/organisms/TestimonialSlider';
import BookForm from 'components/organisms/BookForm';
import Button from 'components/atoms/Button';
// import actions from 'store/actions';

const Index = (props: any): any => {
  // const register = () => {
  //   api().users.register({
  //     name: 'taufiq',
  //     email: 'taufiqelrahman65@gmail.com',
  //     password: 'password',
  //     password_confirmation: 'password',
  //   });
  // };

  // const login = () => {
  //   props.thunkLogin({
  //     email: 'taufiqelrahman65@gmail.com',
  //     password: 'password',
  //   });
  // };

  // const logout = () => {
  //   props.thunkLogout();
  // };

  // const loadProducts = () => {
  //   props.thunkLoadProducts();
  // };

  // const getCart = () => {
  //   props.thunkLoadCart();
  // };

  // const addToCart = () => {
  //   props.thunkAddToCart({
  //     'product_id':	2,
  //     quantity: 5,
  //     price: 3400
  //   });
  // };

  // const removeFromCart = () => {
  //   props.thunkRemoveFromCart({
  //     'product_id':	2
  //   });
  // };

  // const checkout = () => {
  //   props.thunkCheckout({
  //     address: {
  //       address: 'jalan cinta',
  //       city: 'kota parakan',
  //       province: 'jawa sini',
  //       post_code: '12342',
  //       phone: '085743657123'
  //     },
  //     order: {
  //       total: 450000,
  //       shipping_method: 'JNE',
  //       shipping_rate: 29000
  //     }
  //   });
  // }

  // const loadOrder = () => {
  //   props.thunkLoadOrder(201900000001);
  // }

  // const getProducts = (): any => {
  //   props.thunkLoadProducts();
  //   // props.client.product.fetchAll().then(() => {
  //   //   // Do something with the products
  //   //   // console.log(products);
  //   //   // console.log(products[0].variants[0].id);
  //   // });
  //   // // Build a custom products query using the unoptimized version of the SDK
  //   // const productsQuery = props.client.graphQLClient.query(root => {
  //   //   root.addConnection('order', { args: { first: 10 } }, () => {
  //   //     // product.add('title');
  //   //   });
  //   // });

  //   // // Call the send method with the custom products query
  //   // props.client.graphQLClient.send(productsQuery).then(({ model }) => {
  //   //   // Do something with the products
  //   //   console.log(model);
  //   // });
  // };

  // const checkout = (): any => {
  //   // const variantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTM5OTAxOTkwNTE2NA==';
  //   props.client.checkout
  //     .create({
  //       email: 'asd@asd.com',
  //     })
  //     .then(checkout => {
  //       console.log(checkout);
  //       // Do something with the checkout
  //       // const lineItemsToAdd = [
  //       //   {
  //       //     variantId,
  //       //     quantity: 1,
  //       //     customAttributes: [{ key: 'MyKey', value: 'MyValue' }],
  //       //   },
  //       // ];
  //       // props.client.checkout.addLineItems(checkout.id, lineItemsToAdd).then(res => {
  //       //   console.log(res.webUrl);
  //       // });
  //     });
  // };

  return (
    <DefaultLayout isLoggedIn={props.state.users.isLoggedIn} cart={props.state.cart}>
      <div className="c-section--top">
        <div className="c-section__create-now">
          <div className="u-container">
            <div>
              <div className="flex w-full items-center">
                <div className="c-section--top__image">
                  <img src="/static/images/airbaloon.png" alt="hot-airbaloon" />
                </div>
                <div className="c-section__content">
                  <h1>{props.t('createnow-title')}</h1>
                  <div className="c-section__content__content">{props.t('createnow-content')}</div>
                  <a href="#create-book">
                    <Button variant="outline" color="black">
                      {props.t('createnow-button')}
                    </Button>
                  </a>
                </div>
              </div>
              <div className="c-section__create-now__book">
                <img src="/static/images/floating-book.png" alt="floating-book" />
              </div>
            </div>
          </div>
        </div>
        <div className="c-section__start-story">
          <div className="u-container">
            <div>
              <div className="flex w-full items-center">
                <div className="c-section--top__image">
                  <img src="/static/images/bubblegum-kid.png" alt="hot-airbaloon" />
                </div>
                <div className="c-section__content text-white">
                  <h2>{props.t('startstory-title')}</h2>
                  <div className="c-section__content__content">{props.t('startstory-content')}</div>
                  <a href="#create-book">
                    <Button variant="outline" color="white">
                      {props.t('startstory-button')}
                    </Button>
                  </a>
                </div>
              </div>
              <div className="c-section__start-story__socks">
                <img src="/static/images/socks.png" alt="socks" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="c-section--middle">
        <div className="c-section__jobs--top">
          {/* dummy */}
          {[1, 2, 3, 4, 5].map(job => (
            <div key={job} className="c-section__jobs__circle"></div>
          ))}
        </div>
        <div className="c-section__jobs--bottom">
          {/* dummy */}
          {[1, 2, 3, 4].map(job => (
            <div key={job} className="c-section__jobs__circle"></div>
          ))}
        </div>
        <div className="c-section__content text-white c-section__content--middle">
          <h2>{props.t('choosenow-title')}</h2>
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
          <div className="u-container">
            <TestimonialSlider />
          </div>
        </div>
        <div id="create-book" className="c-section--bottom__create-book">
          <h2>{props.t('createbook-header')}</h2>
          <BookForm />
        </div>
      </div>
      {/* <Features features={props.state.products.products} />
      <button onClick={getProducts}>get products</button>
      <button onClick={checkout}>checkout</button>
      <button onClick={login}>Login</button>
      <button onClick={loadProducts.bind(this)}>Get Products</button>
      <button onClick={register}>Register</button>
      <button onClick={logout}>Logout</button>
      <button onClick={getCart}>Get Cart</button>
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={removeFromCart}>Remove from Cart</button>
      <button onClick={checkout}>Checkout</button>
      <button onClick={loadOrder}>Get Order</button> */}
      <style jsx>{`
        .c-section {
          &--top {
            @apply bg-contain;
            background: url('/static/images/clouds.png') 0 80px no-repeat,
              linear-gradient(180deg, #ffe2b0 -7.09%, #f1d096 32.55%, #536390 70.5%);
            &__image {
              @apply w-7/12 flex justify-end mr-6;
            }
          }
          &--middle {
            @apply w-full py-48;
            background: linear-gradient(180deg, #536390 0%, #3ba99c 100%);
          }
          &--bottom {
            @apply relative z-10;
            &__testi {
              @apply overflow-hidden pb-64;
              background: linear-gradient(180deg, #3ba99c 0%, #f4c574 100%);
            }
            &__create-book {
              @apply bg-no-repeat bg-cover pt-24;
              background-color: #f4c574;
              background-image: url('/static/images/create-book-bg.png');
              height: 1019px;
              background-position: center bottom;
              h2 {
                @apply font-semibold mb-8 text-center text-white pt-56;
                font-size: 40px;
                line-height: 58px;
              }
            }
          }
          &__content {
            @apply w-5/12;
            h1 {
              @apply font-semibold mb-4;
              font-size: 44px;
              line-height: 55px;
            }
            h2 {
              @apply font-semibold mb-4;
              font-size: 40px;
              line-height: 58px;
            }
            &__content {
              @apply mb-6;
              line-height: 22px;
              width: 350px;
            }
            &--middle {
              @apply text-center w-full;
              h2 {
                @apply mb-0;
              }
              div {
                width: auto;
              }
            }
          }
          &__create-now {
            &__book {
              @apply ml-auto w-5/12 mt-12;
              img {
                width: 202px;
                height: 162px;
              }
            }
          }
          &__start-story {
            @apply mt-40;
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
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

// Index.getInitialProps = async (ctx: any): Promise<any> => {
//   try {
//     await ctx.reduxStore.dispatch(actions.thunkLoadProducts());
//   } catch (err) {
//     console.log(err.message);
//   }
//   return {};
// };

Index.getInitialProps = async () => ({
  namespacesRequired: ['common', 'page-index', 'form'],
});

export default withTranslation('page-index')(connect(mapStateToProps, mapDispatchToProps)(Index));
