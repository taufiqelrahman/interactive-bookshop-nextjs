import Card from 'components/atoms/Card';
import { useForm } from 'react-hook-form';
import FieldOccupations from 'components/molecules/FieldOccupations';
import FieldName from 'components/molecules/FieldName';
import FieldAge from 'components/molecules/FieldAge';
import FieldDob from 'components/molecules/FieldDob';
import Divider from 'components/atoms/Divider';
import Button from 'components/atoms/Button';
import { useEffect } from 'react';

const CharacterCustomization = () => {
  const { register, handleSubmit, errors, formState, watch, setValue, triggerValidation } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    console.log(data);
  };
  const schema = {
    occupations: {
      required: true,
      validate: value => value.length === 3,
    },
    name: { required: true },
    age: { required: true },
    dob: { required: true },
  };
  useEffect(() => {
    register({ name: 'dob' }, schema.dob);
  }, []);

  return (
    <div>
      <div className="c-char-custom">
        <Card variant="border">
          <form className="c-char-custom__container" onSubmit={handleSubmit(onSubmit)}>
            <FieldOccupations
              ref={register(schema.occupations)}
              errors={errors.occupations}
              style={{ maxWidth: 450, marginBottom: 24 }}
            />
            <Divider />
            <div className="flex">
              <FieldName ref={register(schema.name)} errors={errors.name} style={{ marginRight: 36 }} />
              <FieldAge ref={register(schema.age)} errors={errors.age} />
            </div>
            <FieldDob
              name="dob"
              setValue={setValue}
              triggerValidation={triggerValidation}
              errors={errors.dob}
              style={{ marginTop: 24 }}
            />
            <Button type="submit" width={308}>
              Submit
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

export default CharacterCustomization;
