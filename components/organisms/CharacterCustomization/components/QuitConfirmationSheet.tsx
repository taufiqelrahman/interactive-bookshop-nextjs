import { Fragment } from 'react';

import Button from 'components/atoms/Button';
import Sheet from 'components/atoms/Sheet';

interface QuitConfirmationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  t: (key: string) => string;
}

export const QuitConfirmationSheet: React.FC<QuitConfirmationSheetProps> = ({ isOpen, onClose, onConfirm, t }) => {
  return (
    <Sheet
      name="quit-sheet"
      isOpen={isOpen}
      closeSheet={onClose}
      content={
        <Fragment>
          <h1 className="c-char-custom__sheet__title">{t('quit-customizing')}</h1>
          <div className="c-char-custom__sheet__content">{t('quit-confirmation')}</div>
        </Fragment>
      }
      actions={
        <Fragment>
          <Button width="100%" onClick={onConfirm} style={{ marginBottom: 12 }}>
            {t('yes-quit')}
          </Button>
          <Button width="100%" onClick={onClose} variant="outline" color="black">
            {t('cancel-button')}
          </Button>
        </Fragment>
      }
    />
  );
};
