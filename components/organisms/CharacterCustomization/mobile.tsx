import Card from 'components/atoms/Card';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { withTranslation, Router } from 'i18n';
import { toast } from 'react-toastify';
import FieldOccupations from 'components/molecules/FieldOccupations';
import FormTextField from 'components/molecules/FormTextField';
import FieldAge from 'components/molecules/FieldAge';
import FieldDob from 'components/molecules/FieldDob';
import FieldGender from 'components/molecules/FieldGender';
import FieldHair from 'components/molecules/FieldHair';
import FieldSkin from 'components/molecules/FieldSkin';
import FieldLanguage from 'components/molecules/FieldLanguage';
import FormTextArea from 'components/molecules/FormTextArea';
import Divider from 'components/atoms/Divider';
import Button from 'components/atoms/Button';
import { schema, showError, dummy } from './helper';

const CharacterCustomization = (props: any) => {
  const stepEnum = {
    OCCUPATIONS: 0,
    NAME_DOB: 1,
    AGE: 2,
    GENDER: 3,
    HAIR: 4,
    SKIN: 5,
    LANGUAGE: 6,
    DEDICATION: 7,
  };
  const [step, setStep] = useState(0);
  const { register, handleSubmit, errors, setValue, triggerValidation, watch, formState } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    props.saveSelected(data);
    Router.push('/preview');
  };
  const cancel = () => {
    console.log('cancel');
  };
  useEffect(() => {
    register({ name: 'dob' }, schema.dob);
  }, []);
  useEffect(() => {
    if (!formState.isValid) {
      showError(props.t('form-error'));
    }
  }, [errors]);
  const selected = props.state.cart.selected || dummy || {};
  return (
    <div>
      <form
        className="c-char-custom"
        style={{ minHeight: 'calc(100vh - 69px - 24px)' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <FieldOccupations
            ref={register(schema.occupations)}
            errors={errors.occupations}
            style={{ maxWidth: 550, marginBottom: 24 }}
            defaultChecked={selected.occupations}
          />
        </div>
        <div>
          <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
            {props.t('next-button')}
          </Button>
          <div onClick={cancel} className="c-char-custom__link">
            {props.t('cancel')}
          </div>
        </div>
      </form>
      <style jsx>{`
        .c-char-custom {
          @apply flex flex-col justify-between;
          &__link {
            @apply font-semibold cursor-pointer text-sm text-center;
            margin-bottom: 18px;
            color: #445ca4;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('form')(CharacterCustomization);
