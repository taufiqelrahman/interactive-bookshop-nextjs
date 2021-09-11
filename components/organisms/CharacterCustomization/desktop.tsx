import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation, Router } from 'i18n';
import {
  schema,
  showError,
  previewImg,
  getJobIds,
  loadImg,
  addDedicationToLS,
  retrieveDedication,
  CharacterCustomizationProps,
} from './helper';
import { useRouter } from 'next/router';
import * as gtag from 'lib/gtag';
import detectIt from 'detect-it';
import { CustomAttributes } from 'store/cart/types';
import { cartItem } from '_mocks/cartItem';
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
const Modal = dynamic(() => import('components/atoms/Modal'));

const CharacterCustomization = (props: CharacterCustomizationProps) => {
  const router = useRouter();
  const [isSticky, setSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const methods = useForm({ mode: 'onChange' });
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  useEffect(() => {
    if (!formState.isValid) {
      showError(props.t('form-error'));
    }
  }, [errors]);
  const isDev = process.env.NODE_ENV === 'development';
  const defaultSelected = isDev
    ? cartItem
    : {
        Dedication: retrieveDedication(),
      };
  const selected = props.state.cart.selected || (defaultSelected as CustomAttributes);
  const { occupations } = props.state.master;
  const onSubmit = (data: any) => {
    if (!router.query.edit) {
      gtag.event({
        action: 'click_create',
        category: 'engagement',
        label: '/create',
      });
    }
    const jobIds = getJobIds(data.Occupations, occupations || []);
    props.saveSelected({ ...selected, ...data, jobIds });
    addDedicationToLS(data.Dedication);
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
    // setTimeout(() => {
    //   register({ name: 'Date of Birth' }, schema(props).dob);
    loadImg(previewImg(selected, watch));
    Router.prefetch('/preview');
    register({ name: 'Occupations' } as any, schema(props).occupations as any);
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
                <FormTextField
                  label={props.t('nickname-label')}
                  name="Name"
                  placeholder={props.t('name-placeholder')}
                  schema={schema(props).name}
                  register={register}
                  errors={errors.Name}
                  defaultValue={selected.Name}
                />
                <FieldGender
                  schema={schema(props).gender}
                  register={register}
                  errors={errors.Gender}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Gender}
                />
                <FieldAge
                  schema={schema(props).age}
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
                    schema={schema(props).hair}
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
                  schema={schema(props).skin}
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
                  style={{ maxWidth: 550, marginBottom: 20 }}
                  defaultValue={selected.Occupations}
                  occupations={occupations}
                  formState={formState}
                  gender={watch('Gender')}
                />
                <div className="c-char-custom__info__wrapper">
                  <span className="icon-info" />
                  <div className="c-char-custom__info">
                    {props.t('occupations-info')}
                    <span className="c-char-custom__info__example" onClick={() => setShowModal(true)}>
                      {props.t('see-example')}
                    </span>
                  </div>
                </div>
                <Divider />
                <FormTextField
                  label={props.t('daddy-label')}
                  name="Daddy"
                  placeholder={props.t('daddy-placeholder')}
                  schema={schema(props).daddy}
                  register={register}
                  errors={errors.Daddy}
                  defaultValue={selected.Daddy}
                />
                <FormTextField
                  label={props.t('mommy-label')}
                  name="Mommy"
                  placeholder={props.t('mommy-placeholder')}
                  schema={schema(props).mommy}
                  register={register}
                  errors={errors.Mommy}
                  defaultValue={selected.Mommy}
                  formStyle={{ marginTop: 24 }}
                />
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
                  clear={() => setValue('Dedication', '')}
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
              <img id="preview-char" src="/static/images/empty.png" alt="character preview" />
            </div>
          </div>
        </div>
        <Modal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
          image="/static/images/occupations-example.png"
        />
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
          &__info {
            &__wrapper {
              @apply text-sm flex items-start;
              margin-top: 12px;
              padding: 12px;
              background: #f6f5f8;
              border-radius: 12px;
              margin-bottom: 32px;
              .icon-info {
                font-size: 20px;
                margin-right: 8px;
              }
            }
            line-height: 20px;
            &__example {
              @apply font-bold cursor-pointer;
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

export default withTranslation(['form', 'common'])(CharacterCustomization);
