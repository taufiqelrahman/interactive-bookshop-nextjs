import Card from 'components/atoms/Card';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
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

const CharacterCustomization = (props: any) => {
  const { register, handleSubmit, errors, setValue, triggerValidation, watch, formState } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    console.log(data);
    Router.push('/preview');
  };
  const schema = {
    occupations: {
      required: true,
      validate: value => value.length === 3,
    },
    name: { required: true },
    age: { required: true },
    dob: { required: true },
    gender: { required: true },
    hair: { required: true },
    skin: { required: true },
    language: { required: true },
    dedication: { required: true },
  };
  useEffect(() => {
    register({ name: 'dob' }, schema.dob);
  }, []);
  useEffect(() => {
    if (!formState.isValid) {
      window.scrollTo(0, 0);
      toast.error(props.t('form-error'));
    }
  }, [errors]);
  return (
    <div>
      <div className="c-char-custom">
        <Card variant="border">
          <form className="c-char-custom__container" onSubmit={handleSubmit(onSubmit)}>
            <FieldOccupations
              ref={register(schema.occupations)}
              errors={errors.occupations}
              style={{ maxWidth: 550, marginBottom: 24 }}
            />
            <Divider />
            <div className="flex">
              <FormTextField
                label={props.t('name-label')}
                name="name"
                placeholder={props.t('name-placeholder')}
                ref={register(schema.name)}
                errors={errors.name}
                style={{ marginRight: 36 }}
              />
              <FieldAge ref={register(schema.age)} errors={errors.age} />
            </div>
            <FieldDob
              name="dob"
              setValue={setValue}
              triggerValidation={triggerValidation}
              errors={errors.dob}
              style={{ marginTop: 24 }}
            />
            <FieldGender ref={register(schema.gender)} errors={errors.gender} style={{ marginTop: 24 }} />
            {!!watch('gender') && (
              <FieldHair
                ref={register(schema.hair)}
                errors={errors.hair}
                style={{ marginTop: 24 }}
                type={watch('gender')}
              />
            )}
            <FieldSkin ref={register(schema.skin)} errors={errors.skin} style={{ marginTop: 24, marginBottom: 24 }} />
            <Divider />
            <FieldLanguage ref={register(schema.language)} errors={errors.language} style={{ marginTop: 24 }} />
            <FormTextArea
              label={props.t('dedication-label')}
              hint={props.t('dedication-hint')}
              name="dedication"
              placeholder={props.t('dedication-placeholder')}
              ref={register(schema.dedication)}
              errors={errors.dedication}
              style={{ marginTop: 24, marginBottom: 24 }}
            />
            <Divider />
            <Button type="submit" width="100%" style={{ marginTop: 24 }}>
              {props.t('save-button')}
            </Button>
          </form>
        </Card>
      </div>
      <style jsx>{`
        .c-char-custom {
          margin-top: 30px;
          &__container {
            padding: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('form')(CharacterCustomization);
