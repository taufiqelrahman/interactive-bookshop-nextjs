import React from 'react';
import Button from 'components/atoms/Button';
import { useForm } from 'react-hook-form';
// import { withTranslation } from 'i18n';
import FormTextField from 'components/molecules/FormTextField';

interface BookingCodeProps {
  onUpdate: (data: any) => any;
  currentValue?: string;
}

const BookingCode = (props: BookingCodeProps) => {
  const { handleSubmit, register, watch, formState } = useForm({ mode: 'onChange' });
  const updateBookingCode = () => {
    props.onUpdate([{ key: 'bookingCode', value: watch('booking-code') }]);
  };
  const disableButton = !formState.dirty || watch('booking-code') === props.currentValue;
  return (
    <form onSubmit={handleSubmit(updateBookingCode)} className="c-booking-code">
      <FormTextField
        label="Punya kode booking?"
        register={register}
        name="booking-code"
        formStyle={{ marginRight: 12, width: '100%' }}
        style={{ marginBottom: 26 }}
        defaultValue={props.currentValue}
        variant="full-width"
      />
      <Button width="120px" disabled={disableButton} height="44px" type="submit">
        {disableButton ? 'Tersimpan' : 'Simpan'}
      </Button>
      <style jsx>{`
        .c-booking-code {
          @apply flex items-center;
          padding: 20px 17px;
          @screen md {
            padding: 0;
          }
        }
      `}</style>
    </form>
  );
};

export default BookingCode;
