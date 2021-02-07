import { withTranslation } from 'i18n';
import { useCallback, useMemo } from 'react';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import Sheet from 'components/atoms/Sheet';

// interface Props {
//   show: boolean;
//   setShow: (state: boolean) => void;
//   isMobile: boolean;
//   t: any;
// }
const MaintenanceModal = ({ show, setShow, isMobile, t }: any) => {
  const closeModal = useCallback(() => setShow(false), []);
  const renderActions = useMemo(
    () => (
      <a href={process.env.APP_URL as string} target="_blank" rel="noopener noreferrer">
        <Button width="100%">{t('open-browser-button')}</Button>
      </a>
    ),
    [t, closeModal],
  );
  return isMobile ? (
    <Sheet
      name="date-field-sheet"
      isOpen={show}
      closeSheet={closeModal}
      variant="rounded"
      content={t('open-browser-content')}
      actions={renderActions}
      stringContent={true}
    />
  ) : (
    <Modal isOpen={show} closeModal={closeModal} actions={renderActions} content={t('open-browser-content')} />
  );
};

export default withTranslation('common')(MaintenanceModal);
