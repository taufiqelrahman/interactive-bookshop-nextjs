import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Google = (props: any): any => {
  const router = useRouter();
  useEffect(() => {
    const { code, state } = router.query;
    const DATA = { code, state };
    props.thunkLoginGoogle(DATA);
  }, []);
  return <div />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Google);
