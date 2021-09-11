import { withTranslation } from 'i18n';
import { useCallback, useMemo } from 'react';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import Sheet from 'components/atoms/Sheet';

const HolidayModal = ({ show, setShow, isMobile, t }: any) => {
  const closeModal = useCallback(() => setShow(false), []);
  const renderActions = useMemo(
    () => (
      <Button width="100%" onClick={closeModal}>
        {t('holiday-button')}
      </Button>
    ),
    [t, closeModal],
  );
  return isMobile ? (
    <Sheet
      name="date-field-sheet"
      isOpen={show}
      closeSheet={closeModal}
      variant="rounded"
      content={t('holiday-content')}
      actions={renderActions}
      stringContent={true}
    />
  ) : (
    <Modal isOpen={show} closeModal={closeModal} actions={renderActions} content={t('holiday-content')} />
  );
};

export default withTranslation('common')(HolidayModal);
