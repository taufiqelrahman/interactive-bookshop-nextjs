import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
// import api from 'services/api';
import DefaultLayout from 'components/layouts/Default';
import { withTranslation } from 'i18n';
// import Hero from 'components/organisms/Hero';
// import Features from 'components/organisms/Features';
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
                <div className="c-section--top__content">
                  <h1>{props.t('createnow-title')}</h1>
                  <div>{props.t('createnow-content')}</div>
                  {/* <Button variant="ghost" color="black">{props.t('createnow-button')}</Button> */}
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
                <div className="c-section--top__content text-white">
                  <h1>{props.t('startstory-title')}</h1>
                  <div>{props.t('startstory-content')}</div>
                  {/* <Button variant="ghost" color="black">{props.t('startstory-button')}</Button> */}
                </div>
              </div>
              <div className="c-section__start-story__socks">
                <img src="/static/images/socks.png" alt="socks" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Hero /> */}
      {/* <Features features={props.state.products.products} /> */}
      {/* <button onClick={getProducts}>get products</button> */}
      {/* <button onClick={checkout}>checkout</button> */}
      {/* <button onClick={login}>Login</button> */}
      {/* <button onClick={loadProducts.bind(this)}>Get Products</button>
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
            background: url('/static/images/clouds.png') 0 80px no-repeat,
              linear-gradient(180deg, #ffe2b0 -7.09%, #f1d096 32.55%, #536390 70.5%);
            background-size: 95%;
            &__image {
              @apply w-7/12 flex justify-end mr-6;
            }
            &__content {
              @apply w-5/12;
              h1 {
                @apply font-semibold mb-4;
                font-size: 44px;
                line-height: 55px;
              }
              div {
                line-height: 22px;
                width: 350px;
              }
            }
          }
          &__clouds {
            @apply h-full;
            background: url('/static/images/clouds.png');
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
  namespacesRequired: ['common', 'page-index'],
});

export default withTranslation('page-index')(connect(mapStateToProps, mapDispatchToProps)(Index));
