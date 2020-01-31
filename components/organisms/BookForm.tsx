import { withTranslation, Router } from 'i18n';
import { useForm } from 'react-hook-form';
import Card from 'components/atoms/Card';
import Button from 'components/atoms/Button';
import FieldOccupations from 'components/molecules/FieldOccupations';
import FieldName from 'components/molecules/FieldName';
import FieldAge from 'components/molecules/FieldAge';
import { useState, useEffect } from 'react';

const BookForm = (props: any) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    console.log(data);
    Router.push('/create');
  };
  const schema = {
    occupations: {
      required: true,
      validate: value => value.length === 3,
    },
    name: { required: true },
    gender: { required: true },
  };

  useEffect(() => {
    setIsFormValid(formState.isValid);
  }, [watch()]);

  return (
    <div>
      <div className="c-book-form">
        <Card>
          <form className="c-book-form__container" onSubmit={handleSubmit(onSubmit)}>
            <FieldOccupations ref={register(schema.occupations)} errors={errors.occupations} />
            <div className="c-book-form__second-row">
              <FieldName ref={register(schema.name)} errors={errors.name} />
              <FieldAge ref={register(schema.gender)} errors={errors.gender} />
              <Button type="submit" width={308} disabled={!isFormValid}>
                {props.t('continue-button')}
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <style jsx>{`
        .c-book-form {
          @apply mx-auto;
          max-width: 920px;
          &__container {
            padding: 36px;
          }
          &__second-row {
            @apply flex mt-6 flex-col;
            @screen md {
              @apply items-end justify-between flex-row;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('form')(BookForm);
