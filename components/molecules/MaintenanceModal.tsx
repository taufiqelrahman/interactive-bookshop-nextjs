import { useCallback, useMemo } from 'react';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import Sheet from 'components/atoms/Sheet';

interface Props {
  show: boolean;
  setShow: (state: boolean) => void;
  isMobile: boolean;
}
const maintenanceContent =
  'Dear customer, sementara waktu kita close order sampai bulan ini.<br /><br />Sekarang kami sedang mengembangkan team produksi untuk memberikan service dan pelayanan yang jauh lebih memuaskan.<br /><br />Jika ada pertanyaan Hub admin untuk info lanjutan yah, makasih!';
const maintenanceButtonText = 'Oke, semangat ya!';
const MaintenanceModal: React.FC<Props> = ({ show, setShow, isMobile }: Props) => {
  const closeModal = useCallback(() => setShow(false), []);
  const renderActions = useMemo(
    () => (
      <Button width="100%" onClick={closeModal}>
        {maintenanceButtonText}
      </Button>
    ),
    [maintenanceButtonText, closeModal],
  );
  return isMobile ? (
    <Sheet
      name="date-field-sheet"
      isOpen={show}
      closeSheet={closeModal}
      variant="rounded"
      content={maintenanceContent}
      actions={renderActions}
      stringContent={true}
    />
  ) : (
    <Modal isOpen={show} closeModal={closeModal} actions={renderActions} content={maintenanceContent} />
  );
};

export default MaintenanceModal;
