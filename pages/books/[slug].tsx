import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import DefaultLayout from 'components/layouts/Default';

const Slug = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="book-preview book-preview--heidelberg">
      </div>
      <style jsx>{`
      `}</style>
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout(Slug));