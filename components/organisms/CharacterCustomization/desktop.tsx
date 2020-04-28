import Card from 'components/atoms/Card';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
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
import { schema, showError, previewImg, getJobIds } from './helper';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';

const CharacterCustomization = (props: any) => {
  const [isSticky, setSticky] = useState(false);
  const methods = useForm({ mode: 'onChange' });
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  useEffect(() => {
    if (!formState.isValid) {
      showError(props.t('form-error'));
    }
  }, [errors]);
  const selected = props.state.cart.selected || {
    // Occupations: ['Teacher', 'Pilot', 'Police'],
    // Name: 'Kalilist',
    // Age: 'kid',
    // Gender: 'girl',
    // Skin: 'light',
    // Language: 'english',
    // Dedication:
    //   '“Aku yakin kamu pasti akan menjadi guru yang sangat baik,” kata wanita berambut kuning itu. “I believe that you will be an excellent one,” said the yellow-haired woman.',
    // 'Date of Birth': '03-01-2019',
    // Hair: 'short',
  };
  const { occupations } = props.state.master;
  const onSubmit = data => {
    const jobIds = getJobIds(data.Occupations, occupations);
    props.saveSelected({ ...selected, ...data, jobIds });
    Router.push('/preview');
  };

  const ref = useRef<HTMLInputElement>(null);
  const handleScroll = () => {
    if (ref && ref.current) {
      setSticky(ref.current.getBoundingClientRect().top < 100);
    }
  };
  const stickyClassName = () => {
    return isSticky ? 'c-char-custom__char--sticky' : '';
  };
  useEffect(() => {
    setTimeout(() => {
      register({ name: 'Date of Birth' }, schema(props).dob);
      register({ name: 'Occupations' }, schema(props).occupations);
      if (selected.Occupations) setValue('Occupations', selected.Occupations);
    }, 500);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);
  const containerMargin = (window.innerWidth * 0.25) / 2;
  const containerWidth = window.innerWidth * 0.75;
  const charWidth = containerWidth * 0.3 - containerWidth * 0.08;
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
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  register={register}
                  errors={errors.Occupations}
                  style={{ maxWidth: 550, marginBottom: 24 }}
                  defaultValue={selected.Occupations}
                  occupations={occupations}
                  formState={formState}
                />
                <Divider />
                <div className="c-char-custom__name_dob">
                  <FormTextField
                    label={props.t('name-label')}
                    name="Name"
                    placeholder={props.t('name-placeholder')}
                    schema={schema(props).name}
                    register={register}
                    errors={errors.Name}
                    defaultValue={selected.Name}
                    formStyle={{ width: '50%' }}
                  />
                  <FieldAge
                    schema={schema(props).age}
                    register={register}
                    errors={errors.Age}
                    defaultChecked={selected.Age}
                  />
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
                  schema={schema(props).gender}
                  register={register}
                  errors={errors.Gender}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Gender}
                />
                {!!watch('Gender') && (
                  <FieldHair
                    schema={schema(props).hair}
                    register={register}
                    unregister={unregister}
                    errors={errors.Hair}
                    style={{ marginTop: 24 }}
                    type={watch('Gender')}
                    defaultChecked={selected.Hair}
                  />
                )}
                <FieldSkin
                  schema={schema(props).skin}
                  register={register}
                  errors={errors.Skin}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultChecked={selected.Skin}
                />
                <Divider />
                <FieldLanguage
                  schema={schema(props).language}
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
                  schema={schema(props).dedication}
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
          <div className={`c-char-custom__right ${stickyClassName()}`} ref={ref}>
            <div className="c-char-custom__char">
              <img src={previewImg(selected, watch)} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-char-custom {
          @apply flex w-full flex-col;
          @screen md {
            @apply flex-row;
          }
          &__left {
            @apply w-full;
            @screen md {
              width: 70%;
            }
            &__container {
              padding: 36px;
            }
          }
          &__right {
            @apply hidden;
            @screen md {
              padding: 0 0 0 5%;
              width: 30%;
              @apply block;
            }
            @screen lg {
              padding: 0 0 0 8%;
            }
            @screen xl {
              padding: 0 0 0 10%;
            }
            img {
              @apply w-full;
            }
          }
          &__char {
            .c-char-custom__char--sticky & {
              @apply fixed;
              top: 100px;
              right: ${containerMargin}px;
              width: ${charWidth}px;
            }
          }
          &__name_dob {
            @apply flex flex-col;
            @screen lg {
              @apply flex-row;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .c-char-custom__name_dob {
          .c-field-age {
            margin-top: 24px;
            @screen lg {
              @apply mt-0;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['form', 'common'])(CharacterCustomization);
