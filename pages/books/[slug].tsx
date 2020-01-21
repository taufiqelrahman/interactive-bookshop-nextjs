import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import DefaultLayout from 'components/layouts/Default';
import actions from 'store/actions';

const Slug = () => {
  return (
    <DefaultLayout className="container mx-auto my-5">
      <div className="book-preview book-preview--heidelberg">
      </div>
      <style jsx>{`
      `}</style>
    </DefaultLayout>
  )
};

Slug.getInitialProps = async (ctx) => {
  try {
    await ctx.reduxStore.dispatch(actions.thunkShowProduct(ctx.query.slug));
  } catch (err) {
    console.log(err.message);
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Slug);