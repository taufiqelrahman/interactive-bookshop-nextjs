import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Facebook = (props: any): any => {
  const router = useRouter();
  useEffect(() => {
    const { code, state } = router.query;
    const DATA = { code, state };
    props.thunkLoginFacebook(DATA);
  }, []);
  return <div />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);
