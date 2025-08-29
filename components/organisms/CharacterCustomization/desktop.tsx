import detectIt from 'detect-it';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as gtag from 'lib/gtag';
import actions from 'store/actions';

import { schema, showError, previewImg, getJobIds, loadImg } from './helper';

// import Card from 'components/atoms/Card';
// import FieldDob from 'components/molecules/FieldDob';
// import DefaultLayout from 'components/layouts/Default';

const DefaultLayout = dynamic(() => import('components/layouts/Default'));
const Card = dynamic(() => import('components/atoms/Card'));
const FieldOccupations = dynamic(() => import('components/molecules/FieldOccupations'));
const FormTextField = dynamic(() => import('components/molecules/FormTextField'));
const FieldAge = dynamic(() => import('components/molecules/FieldAge'));
const FieldGender = dynamic(() => import('components/molecules/FieldGender'));
const FieldHair = dynamic(() => import('components/molecules/FieldHair'));
const FieldSkin = dynamic(() => import('components/molecules/FieldSkin'));
const FieldLanguage = dynamic(() => import('components/molecules/FieldLanguage'));
const FormTextArea = dynamic(() => import('components/molecules/FormTextArea'));
const Button = dynamic(() => import('components/atoms/Button'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const Stepper = dynamic(() => import('components/atoms/Stepper'));

const CharacterCustomization = (props: any) => {
  const { t } = useTranslation('form');
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const master = useSelector((state: any) => state.master);
  const router = useRouter();
  const [isSticky, setSticky] = useState(false);
  const methods = useForm({ mode: 'onChange' });
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  useEffect(() => {
    if (!formState.isValid) {
      showError(t('form-error'));
    }
  }, [errors]);
  const isDev = process.env.NODE_ENV === 'development';
  const defaultSelected = isDev
    ? {
        Occupations: ['Teacher', 'Pilot', 'Police'],
        Name: 'Kadhgihbkt',
        Age: 'kid',
        Gender: 'girl',
        Skin: 'light',
        Language: 'english',
        Dedication:
          '“Aku yakin kamu pasti akan menjadi guru yang sangat baik,” kata wanita berambut kuning itu. “I believe that you will be an excellent one,” said the yellow-haired woman.',
        'Date of Birth': '03-01-2019',
        Hair: 'short',
      }
    : {};
  const selected = cart.selected || defaultSelected;
  const { occupations } = master;
  const onSubmit = (data) => {
    if (!router.query.edit) {
      gtag.event({
        action: 'click_create',
        category: 'engagement',
        label: '/create',
      });
    }
    const jobIds = getJobIds(data.Occupations, occupations);
    dispatch(actions.saveSelected({ ...selected, ...data, jobIds }));
    router.push('/preview');
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
    // setTimeout(() => {
    //   register({ name: 'Date of Birth' }, schema(t).dob);
    router.prefetch('/preview');
    register({ name: 'Occupations' }, schema(t).occupations);
    if (selected.Occupations) setValue('Occupations', selected.Occupations);
    // }, 500);
    window.addEventListener('scroll', handleScroll, detectIt.passiveEvents ? { passive: true } : false);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);
  useEffect(() => {
    loadImg(previewImg(selected, watch));
  }, [previewImg(selected, watch)]);
  const containerWidth = window.innerWidth > 1023 ? window.innerWidth * 0.75 : (window.innerWidth * 11) / 12;
  const containerMargin = (window.innerWidth - containerWidth) / 2;
  const charWidth = containerWidth * 0.3 - containerWidth * 0.08;
  return (
    <DefaultLayout {...props}>
      <div className="u-container u-container__page--large">
        <Stepper step={1} totalSteps={2} title={t('common:character-customization')} style={{ marginBottom: 30 }} />
        <div className="c-char-custom">
          <div className="c-char-custom__left">
            <Card variant="border">
              <form className="c-char-custom__left__container" onSubmit={handleSubmit(onSubmit)}>
                <FormTextField
                  label={t('nickname-label')}
                  name="Name"
                  placeholder={t('name-placeholder')}
                  schema={schema(t).name}
                  register={register}
                  errors={errors.Name}
                  defaultValue={selected.Name}
                />
                <FieldGender
                  schema={schema(t).gender}
                  register={register}
                  errors={errors.Gender}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Gender}
                />
                <FieldAge
                  schema={schema(t).age}
                  register={register}
                  errors={errors.Age}
                  fieldStyle={{ marginTop: 24 }}
                  defaultChecked={selected.Age}
                />
                {/* <FieldDob
                  name="Date of Birth"
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  errors={errors['Date of Birth']}
                  style={{ marginTop: 24 }}
                  defaultValue={selected['Date of Birth'] || null}
                /> */}
                {!!watch('Gender') && (
                  <FieldHair
                    schema={schema(t).hair}
                    register={register}
                    unregister={unregister}
                    errors={errors.Hair}
                    style={{ marginTop: 24 }}
                    type={watch('Gender')}
                    age={watch('Age') || selected.Age}
                    defaultChecked={selected.Hair}
                  />
                )}
                <FieldSkin
                  schema={schema(t).skin}
                  register={register}
                  errors={errors.Skin}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultChecked={selected.Skin}
                />
                <Divider />
                <FieldOccupations
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  register={register}
                  errors={errors.Occupations}
                  style={{ maxWidth: 550, marginBottom: 24 }}
                  defaultValue={selected.Occupations}
                  formState={formState}
                  gender={watch('Gender')}
                />
                <Divider />
                <FieldLanguage
                  schema={schema(t).language}
                  register={register}
                  errors={errors.Language}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Language}
                />
                <FormTextArea
                  label={t('dedication-label')}
                  hint={t('dedication-hint')}
                  name="Dedication"
                  placeholder={t('dedication-placeholder')}
                  schema={schema(t).dedication}
                  register={register}
                  errors={errors.Dedication}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultValue={selected.Dedication}
                />
                <Divider />
                <Button type="submit" width="100%" style={{ marginTop: 24 }}>
                  {t('save-button')}
                </Button>
              </form>
            </Card>
          </div>
          <div className={`c-char-custom__right ${stickyClassName()}`} ref={ref}>
            <div className="c-char-custom__char">
              <img id="preview-char" src="/static/images/empty.png" alt="character preview" />
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
              @apply w-full object-contain;
              background: url('/static/images/loading.gif') 50% no-repeat;
              min-height: 330px;
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
          &__name_gender {
            @apply flex flex-col;
            @screen lg {
              @apply flex-row;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .c-char-custom__name_gender {
          .c-field-gender {
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

export default CharacterCustomization;
