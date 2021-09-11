/* eslint-disable no-irregular-whitespace */
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, PropsFromRedux } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { WithTranslation } from 'next-i18next';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Footer = dynamic(() => import('components/organisms/Footer'));

interface PoliciesProps extends WithTranslation, PropsFromRedux {
  isMobile: boolean;
}
const Policies = (props: PoliciesProps) => {
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
          <h5 className="c-policies__heading">Pendahuluan</h5>
          <div className="c-policies__paragraph">
            Kebijakan Privasi ini bersama - sama dengan syarat dan ketentuan penggunaan yang sebagaimana tercantum di
            halaman web kami <strong>whenigrowup.co.id</strong> (&quot;Situs Web&quot;) saat anda menggunakan Situs Web
            atau pada saat Anda mengunjungi situs yang menggunakan teknologi periklanan kami. Kebijakan ini ditetapkan
            berdasarkan data pribadi yang kami kumpulkan dari Anda yang Anda berikan kepada kami, dan diproses oleh
            kami. Anda diharapkan untuk membaca ketentuan berikut dengan seksama untuk memahami pandangan dan
            pelaksanaan atas penggunaan data pribadi Anda dan bagaimana kami akan memperlakukannya.
            <br />
            Dengan menyetujui untuk menggunakan layanan pada Situs Web artinya Anda menerima, mengakui, dan memberikan
            persetujuan yang tidak dapat dicabut bahwa Anda menerima praktik, persyaratan, dan/atau kebijakan yang
            diuraikan dalam Kebijakan Privasi ini, dan Anda dengan ini mengizinkan kami untuk mengumpulkan, menggunakan,
            mengungkapkan dan/atau mengolah data pribadi Anda seperti yang dijelaskan di sini. Kami dapat setiap saat
            merevisi dan/atau memperbaharui Kebijakan Privasi ini. Oleh karenanya Anda dianggap telah menerima dan
            menyetujui revisi dan/atau pembaharuan Kebijakan Privasi tanpa batasan atau kualifikasi. APABILA ANDA TIDAK
            MENGIZINKAN PENGOLAHAN DATA PRIBADI ANDA SEPERTI YANG DIJELASKAN DALAM KEBIJAKAN PRIVASI INI, MOHON JANGAN
            MENGGUNAKAN LAYANAN KAMI ATAU MENGAKSES Situs Web KAMI.
          </div>
          <h5 className="c-policies__heading">Tautan Pihak Ketiga:</h5>
          <div className="c-policies__paragraph">
            Situs web ini dapat menyertakan tautan ke situs web pihak ketiga, dan aplikasi. Mengklik tautan tersebut
            atau mengaktifkan koneksi tersebut dapat memungkinkan pihak ketiga untuk mengumpulkan atau berbagi data
            tentang Anda. Kami tidak mengontrol situs web pihak ketiga ini dan oleh karenanya tidak bertanggung jawab
            atas ketentuan privasi mereka. Ketika Anda meninggalkan situs web kami, kami menganjurkan Anda untuk membaca
            pemberitahuan privasi di setiap situs web yang Anda kunjungi.
          </div>
          <h5 className="c-policies__heading">Definisi</h5>
          <div className="c-policies__paragraph">
            &quot;Hari Kerja&quot;​ berarti hari senin hingga Jumat, kecuali hari-hari yang ditetapkan sebagai hari
            libur nasional berdasarkan ketetapan dari pemerintah Republik Indonesia;
            <br />
            &quot;Informasi Pribadi&quot; berarti segala bentuk informasi yang Anda berikan kepada kami tentang
            Informasi yang Anda isi pada formulir di Situs Web atau dengan berkorespondensi dengan kami melalui email,
            telepon atau lainnya. Ini termasuk informasi yang Anda berikan saat mendaftar untuk menggunakan Situs web,
            memesan di Situs web kami, atau informasi yang lebih rinci yang diperlukan untuk produk tertentu,
            partisipasi dalam papan diskusi atau fungsi media sosial lainnya di Situs Web kami, mengikuti kompetisi,
            promosi, atau survei dan termasuk Informasi ketika Anda melaporkan masalah pada Situs web kami. Informasi
            yang Anda berikan kepada kami dapat meliputi nama Anda, alamat penagihan, alamat pengiriman, alamat email,
            nomor telepon, usia, tanggal lahir, jenis kelamin, foto, nama pengguna, kata sandi dan informasi pendaftaran
            lainnya, serta nama penerima buku, tanggal kelahiran, usia, jenis kelamin, dan alamat. Setiap informasi yang
            Anda berikan kepada kami dapat digunakan secara independen atau bersamaan dengan informasi lain yang Anda
            berikan kepada kami.
            <br />
            &quot;Konten&quot; berarti teks, data, informasi, angka, gambar, grafik, foto, audio, video, nama pengguna,
            informasi, aplikasi, tautan, komentar, peringkat, desain, atau materi lainnya yang ditampilkan dalam Situs
            Web.
            <br />
            &quot;Peraturan Yang Berlaku&quot; berarti​ peraturan perundang-undangan yang berlaku di Republik Indonesia
            mengenai perlindungan data pribadi; &quot;Produk&quot; berarti sebagaimana yang diuraikan pada Syarat dan
            Ketentuan kami​;
            <br />
            &quot;Halaman&quot; berarti halaman yang berisi dokumen atau informasi yang dapat diakses melalui peramban
            web. Halaman tersebut dapat dimunculkan di layar monitor atau telepon pintar.
          </div>
          <h5 className="c-policies__heading">Cara Pengumpulan Informasi Pribadi</h5>
          <div className="c-policies__paragraph">
            Kami akan/mungkin mengumpulkan Informasi Pribadi Anda berdasarkan Peraturan Yang Berlaku pada saat Anda:
            <ol type="A">
              <li>
                berinteraksi dengan Kami, seperti melalui sambungan telepon (yang mungkin direkam), surat, faks,
                pertemuan tatap muka, platform media sosial dan/atau email;
              </li>
              <li>
                membuka dan/atau menggunakan dan/atau berinteraksi dan/atau mendaftar Situs Web, termasuk namun tidak
                terbatas pada melalui cookies yang mungkin Kami gunakan saat Anda berinteraksi dengan Situs Web;
              </li>
              <li>
                mengirimkan formulir apapun, termasuk, namun tidak terbatas pada formulir permohonan atau formulir
                lainnya yang berkaitan dengan produk Kami;
              </li>
              <li>
                membuat perjanjian dan/atau memberikan dokumen dan/atau informasi lainnya sehubungan dengan interaksi
                Anda dengan Kami;
              </li>
              <li>melakukan transaksi melalui Situs Web;</li>
              <li>menyampaikan kritik dan saran atau keluhan kepada Kami;</li>
              <li>
                mendaftar untuk acara yang diselenggarakan oleh Kami, termasuk namun tidak terbatas pada acara
                kompetisi, kontes, seminar, workshop; dan/atau;
              </li>
              <li>mengirimkan Informasi Pribadi Anda kepada Kami dalam bentuk dan dengan alasan apapun.</li>
            </ol>
          </div>
          <h5 className="c-policies__heading">Bentuk Informasi Pribadi</h5>
          <div className="c-policies__paragraph">
            Informasi Pribadi yang Kami kumpulkan merupakan informasi dan data sesuai Peraturan Yang Berlaku,
            diantaranya data dan informasi yang Anda berikan melalui Situs Web, Dokumen Identitas, informasi yang
            dikirim oleh atau terhubung dengan perangkat-perangkat yang digunakan untuk mengakses Situs Web dan seluruh
            data dan informasi tentang Konten yang digunakan oleh Anda.
            <br />
            Apabila Situs Web Kami memungkinkan akun media sosial Anda dapat berinteraksi dengan Situs Web,
            menghubungkan akun Anda dalam Situs Web dengan akun media sosial Anda dan/atau menggunakan setiap fitur
            media sosial Situs Web, maka informasi yang terdapat dalam akun media sosial Anda dapat dimungkinkan
            akan/mungkin digunakan oleh Kami sesuai Kebijakan Privasi ini, untuk tujuan meningkatkan layanan Kami kepada
            Anda.
            <br />
            Sebagaimana layaknya situs web dan aplikasi Seluler, perangkat Anda mengirimkan informasi yang mungkin
            mencakup data dan informasi mengenai Anda yang dapat dicatat oleh server web apabila Anda menggunakan Situs
            Web, termasuk namun tidak terbatas pada alamat Internet Protocol (IP) perangkat Anda, sistem operasi
            komputer / perangkat mobile, dan jenis browser, jenis perangkat mobile, karakteristik perangkat mobile,
            unique device identifier (UDID) atau mobile equipment identifier (MEID) untuk perangkat mobile anda, alamat
            dari Situs yang merekomendasikan (apabila ada), halaman yang anda kunjungi di situs web kami dan aplikasi
            mobile dan waktu kunjungan anda, dan kadang &quot;cookie&quot; (yang dapat dinonaktifkan dengan menggunakan
            preferensi browser Anda) untuk membantu situs mengingat kunjungan Anda yang terakhir. Jika Anda log in
            (masuk), informasi ini dikaitkan dengan akun pribadi Anda. Informasi tersebut juga disertakan dalam
            statistik anonim untuk memungkinkan kami memahami cara pengunjung menggunakan situs kami.
            <br />
            Kami dapat mengimplementasikan &quot;cookie&quot; atau fitur lain sehingga memungkinkan Kami mengumpulkan
            atau berbagi informasi agar dapat membantu Kami memperbaiki Situs Web atau membantu Kami menawarkan layanan
            serta fitur baru. “Cookie” adalah pengenal yang kami alihkan ke komputer atau perangkat mobile Anda yang
            memungkinkan kami mengenali komputer atau perangkat Anda dan memberi tahu kami mengenai bagaimana dan kapan
            Situs Web digunakan atau dikunjungi, oleh berapa banyak orang, dan untuk melacak aktifitas di dalam Situs
            Web kami. Kami dapat menautkan informasi cookie ke data pribadi. Cookie juga tertaut ke informasi mengenai
            item apa yang sudah Anda pilih untuk halaman dan pembelian yang Anda lihat. Informasi ini juga digunakan
            untuk melacak aktifitas investasi Anda, misalnya. Cookie juga digunakan untuk menyampaikan konten spesifik
            sesuai minat Anda dan untuk memantau penggunaan layanan Kami.
            <br />
            Anda boleh menolak penggunaan cookie dengan memilih pengaturan yang sesuai pada browser Anda. Bagaimanapun,
            harap diperhatikan bahwa jika Anda melakukan ini, Anda tidak dapat menggunakan fungsionalitas penuh Situs
            Web Kami.
            <br />
            Untuk lebih jelasnya, Setiap Anda mengunjungi Situs Web, Kami secara otomatis akan mendapatkan Informasi -
            informasi sebagai berikut:
            <ul>
              <li>
                Informasi teknis, termasuk Alamat IP yang biasa digunakan untuk menghubungkan Sistem Elektronik Anda ke
                Internet, Informasi Log in Anda, Tipe dan Versi Browser yang Anda gunakan, pengaturan Zona waktu,
                Browser Plug-in types dan versinya, Operating System dan Platform.
              </li>
              <li>
                Informasi terkait kunjungan Anda ke Situs Web, termasuk Uniform Resource Locators (URL) dan clickstream
                juga, Informasi terkait Produk apa saja yang anda lihat atau anda beli ataupun yang anda cari dalam
                Situs Web, Informasi terkait durasi respon, unggahan yang error, seberapa lama anda mengakses halaman
                tertentu pada Situs Web, Informasi atas interaksi pada Halaman (seperti scrolling, klik dan pergerakan
                Mouse), dan nomor telepon yang digunakan untuk menelpon layanan konsumen Kami.
              </li>
              <li>
                Informasi yang kami dapatkan dari Anda melalui Iklan, yang mana dari mungkin saja dari waktu ke waktu
                Kami menempatkan iklan melalui Pihak Ketiga (seperti YouTube). Pada saat anda melihat Iklan tersebut
                atau interaksi atas Iklan Kami. Kami dan Pihak yang bekerjasama dengan Kami mungkin saja menggunakan
                semacam teknologi (contohnya cookies) untuk mendapatkan informasi dan menyimpan informasi tentang Anda
                termasuk cookie data & ID anonim untuk tujuan atribusi & iklan. Kami menggunakan teknologi untuk
                menolong Kami untuk lebih memahami tentang Konsumer Kami dan sejauh mana efektifitas iklan kami.
              </li>
              <li>
                Informasi yang kami kumpulkan dari beberapa sumber, kami mungkins aja mendapatkan informasi tentang Anda
                jika Anda mengakses situs lain yang Kami operasikan atau layanan lain yang kami berikan. Kami juga
                berkerjasama dengan Pihak Ketiga lainnya (termasuk, seperti Partner bisnis, sub - kontraktor dalam
                pelaksanaan teknis, layanan sistem pembayaran dan pengiriman, jaringan iklan, analytics provider, search
                information provider, agen referensi kredit) yang mungkin saja dari Mereka lah kami mendapatkan
                Informasi tentang Anda.
              </li>
              <li>
                Informasi terkait Lokasi, kami mungkin saja mendapatkan informasi terkait Lokasi keberadaan anda,
                seperti IP Addres dari Sistem Elektronik yang anda gunakan untuk mengakses Situs Web
              </li>
              <li>
                Data Komunikasi Marketing terkait preferensi iklan dari Kami dan preferensi cara berkomunikasi dengan
                Anda.
              </li>
              <li>
                Kami tidak akan mengakses Informasi terkait keadaan finansial anda, dikarnakan informasi ini dikumpulkan
                dan disimpan oleh Pihak Ketiga yang mengelola Pembayaran.
              </li>
            </ul>
            Dengan menggunakan Situs Web, Anda setuju untuk memberikan data dan informasi yang akurat, benar, sah dan
            terkini, serta tidak menyerahkan setiap informasi yang tidak akurat atau menyesatkan, dan Anda setuju untuk
            selalu memberitahukan ketidakakuratan atau perubahan dari data dan informasi tersebut. Kami memiliki hak
            atas kebijaksanaan kami untuk mensyaratkan dokumentasi yang lebih lanjut untuk melakukan verifikasi atas
            informasi yang diserahkan oleh anda.
          </div>
          <h5 className="c-policies__heading">Penggunaan Informasi Pribadi</h5>
          <div className="c-policies__paragraph">
            Kami akan mengumpulkan beberapa informasi pribadi Anda sebagai identifikasi Anda. Informasi pribadi tersebut
            juga mungkin akan Kami sampaikan kepada Pihak Ketiga untuk tujuan pemrosesan aktivitas yang berhubungan
            dengan layanan yang kami berikan dalam Situs Web. Dengan Anda telah memberikan informasi pribadi, berarti
            Anda menerima dan menyetujui bahwa Anda melakukan pengajuan atas diri pribadi dan tanpa ada paksaan ataupun
            tekanan dari pihak manapun, dan hanya digunakan untuk kepentingan tersebut di atas.
            <br />
            Kami juga menggunakan informasi pribadi Anda dalam kapasitas Kami untuk memberikan layanan kepada Anda,
            termasuk diantaranya: memberikan akses kepada Anda untuk dapat mendaftar keanggotaan dan berpartisipasi
            dalam forum Kami dan/atau forum media sosial Kami, mengakses dan mendapatkan informasi terkait Produk,
            meningkatkan mutu layanan dan informasi yang Kami sampaikan di Situs Web, menyampaikan informasi atau
            pemberitahuan Produk terbaru, atau layanan mendatang yang akan Kami sampaikan Situs Web, memungkinkan pihak
            ketiga untuk menghubungi dan membantu Anda pada saat Anda tertarik terhadap suatu Produk dan menyatakan
            minat dengan mengirimkan informasi pribadi kepada Kami, dan memproses transaksi antara Anda.
            <br />
            Informasi yang Kami dapatkan dari Anda dapat kami gunakan untuk hal - hal sebagai berikut:
            <ul>
              <li>
                Menjalankan Kontrak dengan Anda untuk dapat menyediakan Produk kami dan Layanan lainnya yang tertera
                pada Situs Web
              </li>
              <li>
                Melegitimasikan tujuan Anda untuk berinteraksi pada Situs Web pada saat Anda memilih untuk
                berpartisipasi pada fitur interaktif pada Situs Web kami
              </li>
              <li>
                Menjalankan Kontrak dengan Anda untuk memenuhi ketentuan - ketentuan terkait Promosi dan hadiah (jika
                ada)
              </li>
              <li>
                Menjalankan Kontrak dengan Anda untuk memenuhi produk atau layanan kami yang Anda mintakan secara khusus
                (jika memungkinkan)
              </li>
              <li>
                Untuk dapat memberikan jaminan kepada Anda terkait pemberitahuan perubahan pada Situs Web, Produk, dan
                layanan yang kami tawarkan.
              </li>
              <li>
                Melegitimasikan kegiatan bisnis kami, ketentuan dari administrasi dan servis IT, keamanan jaringan,
                untuk menghindari penipuan dan pada konteks reorganisasi bisnis atau pelaksanaan grup restrukturisasi
              </li>
              <li>
                Melegitimasikan riset Kami terkait bagaimana Anda / konsumen menggunakan Produk Kami / Layanan Kami dan
                untuk mengembangkan Produk dan Layanan dari Kami dan juga untuk mengenmbangkan bisnis yang juga untuk
                dapat menginformasikan strategi Marketing Kami, Guna menilai atau memahami seefektif apa iklan yang kami
                berikan kepada Anda, dan juga untuk dapat memberikan iklan yang relevan kepada Anda
              </li>
              <li>
                Melegitimasikan tujuan kami untuk membedakan tipe - tipe konsumen terkait Produk atau Layanan Kami dan
                untuk menjaga Situs Web kami tetap terupdate dan relevan dengan Permintaan Konsumen yang mana terkait
                hal tersebut Kami akan menggunakan Informasi dari Anda untuk memperbaiki Situs Web termasuk juga
                Produk/Layanan, Pemasaran, hubungan dengan konsumen dan pengalaman Konsumen mengakses Situs Web Kami.
              </li>
              <li>
                Melegitimasikan Kami untuk memenuhi permintaan Anda agar selalu diberikan informasi terkini terkait
                Produk dan Layanan Kami, oleh karenanya kami dapat mengingatkan Anda terkait Layanan dan Produk Kami di
                waktu tertentu.
              </li>
              <li>
                Melegitimasikan Kami untuk memenuhi permintaan Anda agar selalu diberikan informasi terkini yang mana
                hal tersebut bertujuan untuk memperbolehkan Kami untuk memberikan informasi lain, Produk/Layanan yang
                Anda pesan atau yang Anda mungkin saja tertarik dimana hal tersebut dapat dilakukan jika memang sudah
                terdapat persetujuan Anda untuk dihubungi terkait tujuan pemberitahuan Informasi sebagaimana tersebut
                sebelumnya.
              </li>
              <li>
                Melegitimasikan Tujuan Kami untuk mengembangkan Produk dan Layanan kami termasuk juga mengembangkan
                bisnis kami dan untuk memperbaiki penawaran Kami guna untuk dapat menghubungi Anda melalui email atau
                telepon seluler Anda (melalui Pesan Singkat) dan untuk menjamin bahwa produk telah terkirim dengan baik
              </li>
            </ul>
          </div>
          <h5 className="c-policies__heading">Keamanan Informasi Pribadi</h5>
          <div className="c-policies__paragraph">
            Kami berkomitmen untuk selalu menjaga informasi pribadi Anda secara rahasia dan tidak membuka atau
            memberikan informasi tersebut kepada atau memungkinkan akses oleh pihak lain selain pihak berikut:
            <ol type="a">
              <li>Afiliasi Kami;</li>
              <li>
                Pihak ketiga yang fungsinya mendukung pemrosesan transaksi di Situs Web, termasuk diantaranya pihak
                lainnya yang dapat mendukung peningkatan layanan Kami kepada Anda;
              </li>
              <li>Pihak lainnya yang dipersyaratkan oleh Peraturan Yang Berlaku.</li>
            </ol>
            Sesuai Peraturan Yang Berlaku, Kami berkewajiban untuk selalu menyimpan dan menjaga informasi pribadi Anda
            setiap waktu, dan menggunakan informasi pribadi Anda hanya untuk kepentingan layanan yang Kami berikan
            kepada Anda.
            <br />
            Untuk dapat menentukan waktu yang pantas perihal menyimpan personal data Anda, Kami mendasari hal tersebut
            dengan mempertimbangkan jumlah, sifat, dan sensitivitas dari Data Personal tersebut, Potensi Risiko
            pengrusakan dari penggunaan yang tidak diijinkan dari pengungkapan Data Personal, tujuan dari penggunaan
            Data Personal yang mana untuk apa Data Personal tersebut akan digunakan, ketentuan hukum yang berlaku.
            Sebagai contoh kami akan menyimpan data dari pemesanan Anda selama kami dapat menyimpan data tersebut dengan
            tujuan untuk mematuhi hukum yang berlaku, yang pada umumnya data tersebut akan disimpan untuk jangka waktu 5
            tahun kecuali diisyaratkan lain oleh hukum yang berlaku.
            <br />
            Pada Kondisi tertentu kami akan meng-anonimkan data personal Anda (oleh karenanya data tersebut tidak bisa
            lagi dikaitkan dengan data yang Anda miliki) untuk kepentingan riset atau tujuan pembuatan statistik yang
            pada kasus tersebut kami dimungkinkan untuk menggunakan informasi tersebut secara tidak terbatas tanpa
            pemberitahuan terlebih dahulu kepada Anda.
          </div>
          <h5 className="c-policies__heading">
            Update terakhir : <u>17 Juli 2020</u>
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

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Policies));
