import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
// import api from 'services/api';
import DefaultLayout from 'components/layouts/Default';
import Hero from 'components/organisms/Hero';
import Features from 'components/organisms/Features';
import actions from 'store/actions';

const Index = (props) => {
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

  return (
    <DefaultLayout>
      <Hero />
      <Features features={props.state.products.products} />
      {/* <button onClick={login}>Login</button> */}
      {/* <button onClick={loadProducts.bind(this)}>Get Products</button>
      <button onClick={register}>Register</button>
      <button onClick={logout}>Logout</button>
      <button onClick={getCart}>Get Cart</button>
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={removeFromCart}>Remove from Cart</button>
      <button onClick={checkout}>Checkout</button>
      <button onClick={loadOrder}>Get Order</button> */}
    </DefaultLayout>
  )
}

Index.getInitialProps = async (ctx) => {
  try {
    await ctx.reduxStore.dispatch(actions.thunkLoadProducts());
  } catch (err) {
    console.log(err.message);
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
