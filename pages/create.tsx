import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CharCustom from 'components/organisms/CharacterCustomization/desktop';
import CharCustomMobile from 'components/organisms/CharacterCustomization/mobile';
import api from 'services/api';
import { wrapper } from 'store';
import { loadOccupations } from 'store/master/reducers';

const Create = (props: any): any => {
  const { t } = useTranslation('common');
  return (
    <div>
      <Head>
        <title>Interactive Bookshop Next.js | {t('character-customization')}</title>
      </Head>
      {props.isMobile ? <CharCustomMobile {...props} /> : <CharCustom {...props} />}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    store.dispatch(loadOccupations({ isFetching: true, data: [] }));
    const { data: occupations } = await api().master.getOccupations();
    store.dispatch(loadOccupations({ isFetching: false, data: occupations.data }));
  } catch (err: any) {
    console.log(err.message);
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'form'])),
    },
  };
});

export default Create;
