/* eslint-disable no-irregular-whitespace */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Footer = dynamic(() => import('components/organisms/Footer'));

const Terms = (props: any): any => {
  const { t } = useTranslation('common');
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={t('terms')} />}
    >
      <Head>
        <title>Interactive Bookshop Next.js | {t('terms')}</title>
      </Head>
      <div className={`u-container__page ${props.isMobile ? 'pt-0' : 'u-container pb-0'}`}>
        {!props.isMobile && <Stepper title={t('terms')} />}
        <div className="c-terms">
          <div className="c-terms__paragraph">
            Fusce cursus mi et magna sodales lacinia. Pellentesque accumsan commodo pellentesque. Suspendisse et mi
            augue. Cras sit amet tincidunt tortor. Mauris dolor orci, posuere eget augue eu, laoreet consectetur elit.
            Nam quis orci sed eros maximus finibus. Cras nec sem neque. Donec placerat dolor a eros cursus, mattis
            tempor ipsum vulputate. Nulla molestie augue felis, sed aliquam mi dictum vel. Morbi orci sapien, euismod
            non suscipit at, gravida quis elit. Duis dapibus tincidunt nulla, sed blandit massa ornare id. Morbi in
            blandit magna.{' '}
            <strong>
              <u>
                <a href="mailto:hello@lorem.co.id">bibendum@lorem.co.id</a>
              </u>
            </strong>
            .
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet ligula tempor, malesuada sem a,
            ultrices nulla. <strong>Phasellus</strong> eleifend ex nulla, in posuere felis porta ultrices. Integer porta
            lorem non congue venenatis. Nulla facilisi. Curabitur odio velit, pulvinar vitae dui vel, pharetra pretium
            velit. Etiam bibendum ipsum eget vulputate semper. In in blandit quam, quis tincidunt justo. Quisque
            volutpat arcu posuere lectus semper dapibus. Cras imperdiet mauris a lacus condimentum, sed blandit augue
            gravida. Integer euismod feugiat eleifend. Nam ut consectetur lorem. Phasellus tincidunt commodo magna, a
            vestibulum dolor ultrices vitae. Nullam libero eros, (&quot;pretium&quot;) elementum ipsum ut, elementum
            rutrum nibh. Quisque tempor bibendum sodales. Nullam malesuada molestie turpis interdum pharetra.
          </div>
        </div>
      </div>
      {props.isMobile && <Footer />}
      <style jsx>{`
        .c-terms {
          @apply mb-5 p-6;
          @screen md {
            @apply mb-24;
            padding: 0 36px;
            margin-top: 48px;
          }
          &__heading {
            @apply mb-6 font-semibold;
          }
          &__paragraph {
            @apply mb-6 text-sm;
            line-height: 30px;
            @screen md {
              @apply text-base;
            }
            br {
              display: block;
              margin: 15px 0;
              line-height: 30px;
              content: ' ';
            }
            strong {
              @apply font-semibold;
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

export default Terms;
