/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, PropsFromRedux } from 'lib/with-redux-store';
import { withTranslation, Router } from 'i18n';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { useForm } from 'react-hook-form';
import { WithTranslation } from 'next-i18next';

const FormTextField = dynamic(() => import('components/molecules/FormTextField'));
const Button = dynamic(() => import('components/atoms/Button'));
const Card = dynamic(() => import('components/atoms/Card'));

const orderNumberIsValid = (value: string) => {
  return value.match(/^\d{4}$/) || value.match(/^WIGU-\d{4}$/);
};
interface CheckProps extends WithTranslation, PropsFromRedux {
  isMobile: boolean;
}
const Check = (props: CheckProps) => {
  const [keyword, setKeyword] = useState('WIGU-');
  const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' });
  const schema = {
    keyword: {
      validate: (value: string) => {
        if (orderNumberIsValid(value)) {
          return true;
        } else {
          return props.t('order-number-invalid');
        }
      },
    },
  };
  const onSearch = () => {
    if (!orderNumberIsValid(keyword)) return;
    if (keyword.length === 4) {
      Router.push(`/orders/WIGU-${keyword}`);
    } else {
      Router.push(`/orders/${keyword}`);
    }
  };
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const Wrapper = props.isMobile ? 'div' : Card;
  const screenHeight = '100vh - 59px';
  return (
    <DefaultLayout
      {...props}
      navbar={
        props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('check-order')} />
      }
    >
      <Head>
        <title>When I Grow Up | {props.t('check-order')}</title>
      </Head>
      <div className="u-container" style={props.isMobile ? {} : { padding: '61px 0 ' }}>
        <div className="c-check-order">
          <Wrapper variant="border">
            <div className="c-check-order__container" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
              <div>
                {!props.isMobile && <h1 className="c-check-order__title">{props.t('check-order')}</h1>}
                <img
                  alt="check-order"
                  className="c-check-order__image"
                  src={`/static/images/airbaloon${props.isMobile ? '-sm' : ''}.png`}
                />
                <div className="c-check-order__subtitle">{props.t('check-order-subtitle')}</div>
                <form className="c-check-order__form" onSubmit={handleSubmit(onSearch)}>
                  <FormTextField
                    variant={props.isMobile ? 'full-width' : 'medium'}
                    onChange={onTextChange}
                    style={props.isMobile ? {} : { marginRight: 16 }}
                    defaultValue={keyword}
                    name="keyword"
                    schema={schema.keyword}
                    register={register}
                    errors={errors.keyword}
                  />
                  <Button
                    type="submit"
                    width={props.isMobile ? '100%' : '140px'}
                    disabled={!formState.isValid}
                    height="44px"
                  >
                    {props.t('check-order-button')}
                  </Button>
                </form>
              </div>
            </div>
          </Wrapper>
        </div>
      </div>
      <style jsx>{`
        .c-check-order {
          @apply mx-auto w-full;
          &__container {
            @apply text-center flex flex-col justify-between;
            padding-top: 12px;
            @screen md {
              padding: 42px;
            }
          }
          &__image {
            @apply mx-auto;
            width: 120px;
            margin-top: 12px;
            margin-bottom: 24px;
            @screen md {
              width: 220px;
            }
          }
          &__title {
            @apply font-semibold;
            font-size: 20px;
            line-height: 30px;
            margin: 12px 0;
            @screen md {
              @apply font-bold;
              font-size: 28px;
              line-height: 42px;
            }
          }
          &__subtitle {
            @apply font-opensans mx-auto text-sm;
            line-height: 20px;
            max-width: 320px;
            @screen md {
              @apply text-base;
              max-width: 600px;
              line-height: 22px;
            }
          }
          &__form {
            @apply flex justify-center flex-col mt-6 mb-4;
            @screen md {
              @apply flex-row;
            }
          }
        }
        li {
          margin-bottom: 8px;
          line-height: 30px;
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Check));
