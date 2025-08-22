import Head from 'next/head';

import CharCustom from 'components/organisms/CharacterCustomization/desktop';
import CharCustomMobile from 'components/organisms/CharacterCustomization/mobile';
import { withTranslation } from 'i18n';
import api from 'services/api';
import { wrapper } from 'store';
import actions from 'store/actions';

const Create = (props: any): any => (
  <div>
    <Head>
      <title>When I Grow Up | {props.t('character-customization')}</title>
    </Head>
    {props.isMobile ? <CharCustomMobile {...props} /> : <CharCustom {...props} />}
  </div>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    store.dispatch(actions.loadOccupations(true));
    const { data: occupations } = await api().master.getOccupations();
    store.dispatch(actions.loadOccupations(false, occupations.data));
  } catch (err: any) {
    console.log(err.message);
  }

  return {
    props: {
      namespacesRequired: ['common'],
    },
  };
});

export default withTranslation('common')(Create);
