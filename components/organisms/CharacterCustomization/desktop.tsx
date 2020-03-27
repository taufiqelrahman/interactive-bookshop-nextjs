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
import { schema, showError } from './helper';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';

const CharacterCustomization = (props: any) => {
  const { register, handleSubmit, errors, setValue, triggerValidation, watch, formState } = useForm({
    mode: 'onChange',
  });
  useEffect(() => {
    register({ name: 'dob' }, schema.dob);
  }, []);
  useEffect(() => {
    if (!formState.isValid) {
      showError(props.t('form-error'));
    }
  }, [errors]);
  const selected =
    props.state.cart.selected ||
    {
      // occupations: ['Astronaut', 'Teacher', 'Librarian'],
      // name: 'asd',
      // age: 'kid',
      // gender: 'girl',
      // skin: 'light',
      // language: 'english',
      // dedication: 'asdasd',
      // dob: '03-01-2019',
      // hair: 'short',
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
        <Stepper step={1} totalSteps={2} title={props.t('character-customization')} style={{ marginBottom: 30 }} />
        <div className="c-char-custom">
          <div className="c-char-custom__left">
            <Card variant="border">
              <form className="c-char-custom__left__container" onSubmit={handleSubmit(onSubmit)}>
                <FieldOccupations
                  ref={register(schema.occupations)}
                  errors={errors.occupations}
                  style={{ maxWidth: 550, marginBottom: 24 }}
                  defaultChecked={selected.occupations}
                  occupations={occupations}
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
                    defaultValue={selected.name}
                  />
                  <FieldAge ref={register(schema.age)} errors={errors.age} defaultChecked={selected.age} />
                </div>
                <FieldDob
                  name="dob"
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  errors={errors.dob}
                  style={{ marginTop: 24 }}
                  defaultValue={selected.dob}
                />
                <FieldGender
                  ref={register(schema.gender)}
                  errors={errors.gender}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.gender}
                />
                {!!watch('gender') && (
                  <FieldHair
                    ref={register(schema.hair)}
                    errors={errors.hair}
                    style={{ marginTop: 24 }}
                    type={watch('gender')}
                    defaultChecked={selected.hair}
                  />
                )}
                <FieldSkin
                  ref={register(schema.skin)}
                  errors={errors.skin}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultChecked={selected.skin}
                />
                <Divider />
                <FieldLanguage
                  ref={register(schema.language)}
                  errors={errors.language}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.language}
                />
                <FormTextArea
                  label={props.t('dedication-label')}
                  hint={props.t('dedication-hint')}
                  name="dedication"
                  placeholder={props.t('dedication-placeholder')}
                  ref={register(schema.dedication)}
                  errors={errors.dedication}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultValue={selected.dedication}
                />
                <Divider />
                <Button type="submit" width="100%" style={{ marginTop: 24 }}>
                  {props.t('save-button')}
                </Button>
              </form>
            </Card>
          </div>
          <div className="c-char-custom__right">
            <img src="/static/images/dummy.png" />
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
              @apply w-4/5;
            }
            @screen xl {
              @apply w-3/5;
            }
            &__container {
              padding: 36px;
            }
          }
          &__right {
            @apply hidden;
            padding: 0 100px;
            @screen lg {
              @apply w-1/5;
            }
            @screen xl {
              @apply w-2/5;
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

export default withTranslation('form')(CharacterCustomization);
