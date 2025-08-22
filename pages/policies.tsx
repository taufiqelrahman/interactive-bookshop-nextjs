/* eslint-disable no-irregular-whitespace */
import dynamic from 'next/dynamic';
import Head from 'next/head';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { withTranslation } from 'i18n';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Footer = dynamic(() => import('components/organisms/Footer'));

const Policies = (props: any): any => {
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('policies')} />}
    >
      <Head>
        <title>When I Grow Up | {props.t('policies')}</title>
      </Head>
      <div className={`u-container__page ${props.isMobile ? 'pt-0' : 'u-container pb-0'}`}>
        {!props.isMobile && <Stepper title={props.t('policies')} />}
        <div className="c-policies">
          <h5 className="c-policies__heading">Curabitur</h5>
          <div className="c-policies__paragraph">
            Fusce cursus mi et magna sodales lacinia. Pellentesque accumsan commodo pellentesque. Suspendisse et mi
            augue. Cras sit amet tincidunt tortor. Mauris dolor orci, posuere eget augue eu, laoreet consectetur elit.
            Nam quis orci sed eros maximus finibus. Cras nec sem neque. Donec placerat dolor a eros cursus, mattis
            tempor ipsum vulputate. Nulla molestie augue felis, sed aliquam mi dictum vel. Morbi orci sapien, euismod
            non suscipit at, gravida quis elit. Duis dapibus tincidunt nulla, sed blandit massa ornare id. Morbi in
            blandit magna.
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
          <h5 className="c-policies__heading">Tautan Pihak Ketiga:</h5>
          <div className="c-policies__paragraph">
            Situs web ini dapat menyertakan tautan ke situs web pihak ketiga, dan aplikasi. Mengklik tautan tersebut
            atau mengaktifkan koneksi tersebut dapat memungkinkan pihak ketiga untuk mengumpulkan atau berbagi data
            tentang Anda. Kami tidak mengontrol situs web pihak ketiga ini dan oleh karenanya tidak bertanggung jawab
            atas ketentuan privasi mereka. Ketika Anda meninggalkan situs web kami, kami menganjurkan Anda untuk membaca
            pemberitahuan privasi di setiap situs web yang Anda kunjungi.
          </div>
          <h5 className="c-policies__heading">Pellentesque</h5>
          <div className="c-policies__paragraph">
            Duis dapibus tincidunt nulla, sed blandit massa ornare id. Morbi in blandit magna.
            <ol type="A">
              <li>Sed ultrices id arcu sit amet pharetra. Curabitur vestibulum vitae mauris nec tincidunt.</li>
              <li>
                Nulla sollicitudin, magna a scelerisque luctus, ipsum sem tristique mauris, a suscipit enim leo eu
                purus.
              </li>
              <li>Mauris at luctus ligula. Mauris sed velit commodo, pharetra dui nec, cursus mauris.</li>
            </ol>
          </div>
          <h5 className="c-policies__heading">
            Last update : <u>17 July 2020</u>
          </h5>
        </div>
      </div>
      {props.isMobile && <Footer isMobile={props.isMobile} />}
      <style jsx>{`
        .c-policies {
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

export default withTranslation('common')(Policies);
