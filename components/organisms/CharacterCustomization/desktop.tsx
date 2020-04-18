import Card from 'components/atoms/Card';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { withTranslation, Router } from 'i18n';
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
import { schema, showError, previewImg } from './helper';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';

const CharacterCustomization = (props: any) => {
  const methods = useForm({ mode: 'onChange' });
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  useEffect(() => {
    register({ name: 'Date of Birth' }, schema.dob);
  }, []);
  useEffect(() => {
    if (!formState.isValid) {
      showError(props.t('form-error'));
    }
  }, [errors]);
  const selected =
    props.state.cart.selected ||
    {
      // Occupations: ['Astronaut', 'Teacher', 'Librarian'],
      // Name: 'asd',
      // Age: 'kid',
      // Gender: 'girl',
      // Skin: 'light',
      // Language: 'english',
      // Dedication: 'asdasd',
      // 'Date of Birth': '03-01-2019',
      // Hair: 'short',
    };
  const onSubmit = data => {
    const PARAMS = selected && selected.id ? { ...selected, ...data } : data;
    props.saveSelected(PARAMS);
    Router.push('/preview');
  };
  const { occupations } = props.state.master;
  return (
    <DefaultLayout {...props}>
      <div className="u-container u-container__page--large">
        <Stepper
          step={1}
          totalSteps={2}
          title={props.t('common:character-customization')}
          style={{ marginBottom: 30 }}
        />
        <div className="c-char-custom">
          <div className="c-char-custom__left">
            <Card variant="border">
              <form className="c-char-custom__left__container" onSubmit={handleSubmit(onSubmit)}>
                <FieldOccupations
                  schema={schema.occupations}
                  register={register}
                  errors={errors.Occupations}
                  style={{ maxWidth: 550, marginBottom: 24 }}
                  defaultChecked={selected.Occupations}
                  occupations={occupations}
                />
                <Divider />
                <div className="flex">
                  <FormTextField
                    label={props.t('name-label')}
                    name="Name"
                    placeholder={props.t('name-placeholder')}
                    schema={schema.name}
                    register={register}
                    errors={errors.Name}
                    style={{ marginRight: 36 }}
                    defaultValue={selected.Name}
                  />
                  <FieldAge schema={schema.age} register={register} errors={errors.Age} defaultChecked={selected.Age} />
                </div>
                <FieldDob
                  name="Date of Birth"
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  errors={errors['Date of Birth']}
                  style={{ marginTop: 24 }}
                  defaultValue={selected['Date of Birth'] || null}
                />
                <FieldGender
                  schema={schema.gender}
                  register={register}
                  errors={errors.Gender}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Gender}
                />
                {!!watch('Gender') && (
                  <FieldHair
                    schema={schema.hair}
                    register={register}
                    unregister={unregister}
                    errors={errors.Hair}
                    style={{ marginTop: 24 }}
                    type={watch('Gender')}
                    defaultChecked={selected.Hair}
                  />
                )}
                <FieldSkin
                  schema={schema.skin}
                  register={register}
                  errors={errors.Skin}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultChecked={selected.Skin}
                />
                <Divider />
                <FieldLanguage
                  schema={schema.language}
                  register={register}
                  errors={errors.Language}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Language}
                />
                <FormTextArea
                  label={props.t('dedication-label')}
                  hint={props.t('dedication-hint')}
                  name="Dedication"
                  placeholder={props.t('dedication-placeholder')}
                  schema={schema.dedication}
                  register={register}
                  errors={errors.Dedication}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultValue={selected.Dedication}
                />
                <Divider />
                <Button type="submit" width="100%" style={{ marginTop: 24 }}>
                  {props.t('save-button')}
                </Button>
              </form>
            </Card>
          </div>
          <div className="c-char-custom__right">
            <img src={previewImg(selected, watch)} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-char-custom {
          @apply flex w-full flex-col;
          @screen lg {
            @apply flex-row;
          }
          &__left {
            @apply w-full;
            @screen lg {
              @apply w-3/5;
            }
            &__container {
              padding: 36px;
            }
          }
          &__right {
            padding: 0 0 0 10%;
            @apply hidden;
            @screen lg {
              @apply w-2/5;
              @apply block;
            }
            img {
              @apply w-full;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['form', 'common'])(CharacterCustomization);
