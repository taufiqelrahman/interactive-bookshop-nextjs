/* eslint-disable no-irregular-whitespace */
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Footer = dynamic(() => import('components/organisms/Footer'));

const Terms = (props: any): any => {
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('terms')} />}
    >
      <Head>
        <title>When I Grow Up | {props.t('terms')}</title>
      </Head>
      <div className={`u-container__page ${props.isMobile ? 'pt-0' : 'u-container pb-0'}`}>
        {!props.isMobile && <Stepper title={props.t('terms')} />}
        <div className="c-terms">
          <div className="c-terms__paragraph">
            Selamat datang di When I Grow Up. Kita sangat berharap untuk dapat memenuhi segala bentuk pesanan dari
            Produk dan Layanan Kami yang masuk dengan memuaskan dan tepat waktu. Sekilas mengenai When I Grow Up, When I
            Grow Up merupakan buku yang personalisasinya dapat ditentukan berdasarkan nama anak, pilihan cerita dan
            karakter - karakter yang dapat disesuaikan sesuai dengan keinginan. Jika anda berkenan untuk menghubungi
            kita dan menanyakan apapun terkait apapun yang ada di dalam situs ini, anda dapat menghubungi kita melalui
            e-mail di{' '}
            <strong>
              <u>
                <a href="mailto:hello@whenigrowup.co.id">hello@whenigrowup.co.id</a>
              </u>
            </strong>
            .
            <br />
            Ini merupakan syarat dan ketentuan yang mengatur isi, konten dan termasuk tata cara penggunaan Situs
            (&quot;whenigrowup.co.id&quot; / dalam kata lain “Situs”) dan selain itu Syarat dan Ketentuan ini akan
            mengatur mengenai bagaimana kita memenuhi Produk atau Layanan yang tersedia dalam Situs. Sangat penting bagi
            anda untuk membaca dan memahami Syarat dan Ketentuan ini sebelum Anda menggunakan situs ini dan sebelum
            melakukan pemesanan Produk atau Layanan yang tertera pada Situs. Dengan menggunakan Situs ini dan/atau
            melakukan order pada Produk atau Layanan yang tertera pada Situs maka anda menjamin dan juga menandakan
            bahwa anda telah membaca,memahami dan menyetujui untuk terikat pada Syarat dan Ketentuan ini. Untuk lebih
            lanjutnya agar dapat memudahkan anda untuk memahami Syarat dan Ketentuan ini, anda dapat mencetak{' '}
            <strong>Syarat dan Ketentuan ini dengan cara mengklik logo Print pada laman ini</strong>.
            <br />
            Syarat dan Ketentuan ini berlaku untuk segala bentuk pembelian Produk atau Layanan melalui Situs ini dan
            juga akan menggantikan Syarat dan Ketentuan lain yang terkait dengan proses jual beli, kebiasaan dan praktik
            transaksi kecuali secara khusus disetujui secara tertulis oleh Kami. Untuk lebih lanjutnya jika anda tidak
            setuju dengan Syarat dan Ketentuan ini maka Anda tidak diperbolehkan mengakses Situs dan tidak dapat
            melakukan proses pembelian pada Situs.
            <br />
            Perlu diketahui bahwa seiring berjalannya waktu Kami dapat melakukan Perubahan - perubahan pada{' '}
            <strong>
              Syarat dan Ketentuan ini dan Kami akan memberikan notifikasi pada Situs terkait perubahan pada Syarat dan
              Ketentuan ini. Jika ada perubahan yang tidak Anda setujui maka Anda harus berhenti menggunakan Situs. Jika
              Anda tidak berhenti menggunakan Situs, Anda akan dianggap telah menerima perubahan
            </strong>
            .
          </div>
          <h5 className="c-terms__heading">Definisi</h5>
          <div className="c-terms__paragraph">
            “Kontrak” berarti Pemesanan dan Konfirmasi Pemesanan;
            <br />
            &quot;Kerusakan&quot; berarti mengandung kesalahan atau cacat atau tidak sempurna;
            <br />
            “Pembeli” berarti Orang yang mencantumkan namanya pada Pemesanan;
            <br />
            “Pemesanan” berarti Permintaan Pembelian yang dibuat oleh Anda untuk Produk yang tertera pada Situs;
            <br />
            “Payment Gateway” berarti gerbang atau medium transaksi yang disediakan oleh Situs yang bisa memberi
            otorisasi pemrosesan kartu kredit maupun pembayaran langsung bagi kliennya dalam aktivitas bisnis
            <br />
            “Harga” berarti jumlah yang harus dibayarkan oleh Pembeli bersama dengan biaya kirim serta pajak yang
            berlaku pada saat Pesanan (tidak termasuk pajak dan bea yang menjadi tanggung jawab Pembeli (jika ada)
            sebagaimana yang tertera pada bagian &quot;Penetapan Harga dan Pembayaran&quot; dari Syarat dan Ketentuan
            ini), dan dapat disesuaikan jika ada penawaran promosi atau diskon yang berlaku;
            <br />
            “Hari Kerja”berarti hari senin hingga Jumat, kecuali hari-hari yang ditetapkan sebagai hari libur nasional
            berdasarkan ketetapan dari pemerintah Republik Indonesia
            <br />
            “Syarat dan Ketentuan” berarti standar syarat dan ketentuan untuk penggunaan Situs, proses jual beli Produk
            dan segala bentuk tata cara terkait penggunaan Situs;
            <br />
            “Produk” berarti segala bentuk barang yang ditawarkan dan detailnya tertera pada Situs;
            <br />
            “Pernyataan Barang Dalam Keadaan Bagus” berarti Form yang berisi mengenai baik buruknya keadaan Produk.
          </div>
          <h5 className="c-terms__heading">Penggunaan Situs</h5>
          <div className="c-terms__paragraph">
            Anda tidak dapat atau tidak diperbolehkan untuk menggunakan Situs dengan cara yang tidak pantas seperti
            dengan melanggar hukum dan undang-undang atau lisensi apa pun yang berlaku. Anda dengan ini setuju untuk
            mematuhi semua instruksi yang kami berikan kepada Anda dari waktu ke waktu terkait penggunaan Situs.
            <br />
            Setelah melakukan proses Pemesanan, Anda telah mengetahui dan setuju bahwa kami dapat meninjau kembali
            pesanan Anda, termasuk didalamnya Konten atau detail data yang anda berikan, hal ini berguna untuk kepatuhan
            terhadap pedoman kami dan kepatuhan terhadap Syarat dan Ketentuan ini. Kami berhak menolak untuk memproses
            pesanan yang mana kami percayai bahwa terdapat Konten atau data dari Anda yang melanggar Syarat dan
            Ketentuan ini.
          </div>
          <h5 className="c-terms__heading">Hak Milik dan Hak Pakai</h5>
          <div className="c-terms__paragraph">
            Semua hak kekayaan intelektual (yang berarti paten, merek dagang terdaftar dan tidak terdaftar dan merek
            layanan, nama domain, desain terdaftar dan hak desain, hak cipta, hak basis data dan hak dalam program
            komputer) di dalam Situs dan termasuk semua konten ataupun bahan yang terkandung di Situs (&quot;Konten
            Situs&quot;) dimiliki oleh Kami dan akan tetap dimiliki oleh Kami atau pemberi lisensi Kami. Konten Situs
            hanya dapat digunakan untuk tujuan pribadi, non-komersial, dan tidak boleh direproduksi, dimodifikasi,
            disalin, diubah, didistribusikan, diterbitkan ulang, ditampilkan, ditransmisikan, atau dijual dalam bentuk
            apapun dengan cara apapun secara keseluruhan atau sebagian. Anda tidak boleh menghapus hak cipta atau
            pemberitahuan hak milik lainnya yang terkandung dalam Konten Situs.
          </div>
          <h5 className="c-terms__heading">Pemesanan dan Spesifikasi</h5>
          <div className="c-terms__paragraph">
            Untuk melakukan Pemesanan, Anda harus mengikuti prosedur pemesanan yang ditetapkan di Situs. Termasuk juga
            didalamnya mengenai rincian harga yang harus dibayarkan sehubungan dengan Produk dan juga prosedur
            pembayaran yang tertera pada Situs.
            <br />
            Semua Produk ditawarkan untuk dijual akan bergantung pada ketersediaan Produk dan untuk mengetahui atas
            ketersediaan Produk tergantung pada persetujuan kami atas pesanan Anda.
            <br />
            Kami memiliki hak untuk menolak Pesanan tanpa memberikan penjelasan atas penolakan tersebut. Pesanan akan
            diterima jika telah dikonfirmasi oleh Kami dengan memberikan Konfirmasi Pemesanan.
            <br />
            Konfirmasi Pesanan akan berisi perincian dari Pesanan Anda termasuk didalamnya total Harga dan perkiraan
            waktu pengiriman Pesanan, Konfirmasi Pesanan ini akan Kami kirimkan melalui email. Adalah tanggung jawab
            Anda untuk menghubungi Kami sesegera mungkin jika terdapat kesalahan atas Pemesanan.
            <br />
            <strong>
              Jika Anda tidak menghubungi Kami dalam hal terjadi kesalahan pada Pemesanan maka kesalahan tersebut tidak
              lagi menjadi tanggung jawab Kami. Waktu dan tanggal yang dinyatakan untuk pengiriman dalam Konfirmasi
              Pemesanan hanyalah berupa perkiraan saja. Kami akan melakukan upaya yang terbaik kami untuk mengirimkan
              barang dalam jangka waktu sebagaimana yang ditentukan, tetapi kami tidak menerima tanggung jawab atas
              kegagalan ataupun keterlambatan pengiriman dalam waktu tersebut.
            </strong>
            <br />
            Kami berusaha untuk menampilkan dan menjelaskan seakurat mungkin mengenai warna yang dicetak pada Produk
            yang muncul di Situs Kami, tetapi Kami tidak dapat berjanji untuk memberikan jaminan bahwa warna yang
            diberikan akan sama persis dengan warna yang ditampilkan pada monitor perangkat elektronik atau telepon
            seluler Anda.
            <br />
            Kami dapat merevisi, menghentikan atau memodifikasi Produk atau layanan kapan saja tanpa pemberitahuan
            sebelumnya dan Produk mungkin tidak tersedia tanpa pemberitahuan yang mana jika Produk tidak tersedia maka
            Anda tidak akan dapat melakukan Proses Pemesanan.
            <br />
            Kami tidak akan memiliki kewajiban apapun atas Produk atau layanan apapun yang tidak tersedia pada Situs.
          </div>
          <h5 className="c-terms__heading">Harga & Pembayaran</h5>
          <div className="c-terms__paragraph">
            Kami dapat mengubah harga Produk pada Situs sebelum Anda melakukan pemesanan.
            <br />
            Terlepas dari upaya terbaik kami, beberapa Produk yang terdaftar di Situs mungkin diberi harga yang salah
            atau harga mungkin meningkat dalam rentan waktu pesanan Anda dan penerimaan kami atas pesanan Anda. Kami
            akan berupaya untuk memverifikasi harga sebagai bagian dari prosedur pengiriman sehingga, di mana harga yang
            benar Produk kurang dari harga yang disebutkan, kami akan membebankan jumlah yang lebih rendah ketika
            mengirimkan Produk kepada Anda. Jika harga Produk yang benar lebih tinggi dari harga yang tercantum di
            Situs, Kami biasanya, atas kebijakan kami, akan menghubungi Anda untuk menginstruksi agar Anda menolak
            pesanan dan memberitahu Anda tentang penolakan tersebut sehingga Anda dapat memesan ulang dengan harga yang
            benar. jika Anda ingin.
            <br />
            Pembayaran harus dilakukan melalui Payment Gateway yang telah kami tentukan pada saat Pemesanan Anda telah
            kami konfirmasi. Pada saat Pembayaran berhasil dilakukan secara bersamaan akan terjalin Kontrak yang
            mengikat secara hukum antara Anda dan Kami. Anda akan dimintakan untuk mengisi beberapa keterangan yang
            relevan oleh Pihak Ketiga yang kami tunjuk sebagai Payment Gateway dan Anda akan dimintakan untuk menerima
            dan menyetujui beberapa syarat dan ketentuan tambahan terkait layanan dari provider Payment Gateway yang
            kami tunjuk. Atas persetujuan anda dengan syarat dan ketentuan yang diberikan Payment Gateway tersebut
            secara hukum yang berlaku bukan merupakan tanggung jawab Kami.
            <br />
            Dengan ini Anda menjamin bahwa segala detail informasi yang Anda berikan kepada kami adalah benar. Metode
            pembayaran yang Anda pilih melalui Payment Gateway yang kami tunjuk adalah sepenuhnya otorisasi Anda dan
            metode pembayaran yang anda gunakan merupakan sepenuhnya kepemilikan Anda yang tentunya memiliki dana yang
            cukup atau fasilitas kredit yang tersedia untuk melakukan pembayaran atas biaya pada Pemesanan
          </div>
          <h5 className="c-terms__heading">Pengiriman dan Penerimaan</h5>
          <div className="c-terms__paragraph">
            <strong>
              Lokasi untuk Pengiriman Produk Anda akan disesuaikan dengan detail Pemesanan yang Anda isikan dan untuk
              Proses Pengiriman akan menggunakan jasa pengiriman dari Pihak Ketiga yang mana Anda dimungkinkan untuk
              dimintakan menyetujui syarat dan ketentuan lain terkait dengan jasa Pengiriman dari Pihak Ketiga yang Kami
              tunjuk, Atas persetujuan anda dengan syarat dan ketentuan yang diberikan Pihak Ketiga terkait jasa
              pengiriman tersebut bukan merupakan tanggung jawab Kami.
            </strong>
            <br />
            <strong>
              Jika Anda melakukan Pemesanan lebih dari satu Produk, Kami memiliki hak untuk melakukan Pengiriman
              terpisah. Jika Pemesanan Produk dikirim secara terpisah maka setiap Pengiriman atas Produk akan dikenakan
              biaya.
            </strong>
            <br />
            Dengan usaha terbaik Kami, Kami akan memproses Pemesanan atas Produk yang Anda pesan sesuai dengan periode
            waktu paling lama 14 hari kerja.Periode pengiriman yang Kami sebutkan merupakan perkiraan dan bukan lah
            jaminan yang kami berikan dan Kami tidak memiliki tanggung jawab atas kerugian atau biaya tambahan yang
            mungkin Anda keluarkan terkait keterlambatan pada proses Pengiriman Produk yang ada pesan.
            <br />
            Pada saat anda menerima Produk yang ada pesan Anda diharuskan untuk melakukan pemeriksaan atas Produk
            tersebut, hal ini diperuntukan untuk melihat apakah ada cacat atau ketidaksesuaian pada Produk. Jika
            terdapat cacat atau ketidaksesuaian pada Produk yang anda Pesan maka anda disarankan untuk tidak menyetujui
            <strong>Pernyataan Barang Dalam Keadaan Bagus yang kami kirimkan melalui email</strong>.
            <br />
            Jika dalam jangka waktu 3 hari kerja anda tidak memberikan respon apapun Pernyataan Barang Dalam Keadaan
            Bagus maka akan dianggap bahwa Anda telah menyetujui Pernyataan Barang Dalam Keadaan Bagus dan telah
            menerima Produk.
            <br />
            Jika Anda dapat melihat tanda-tanda kerusakan pada paket, harap tandatangani sebagai Produk rusak dan juga
            berikan penjelasan atas kerusakan tersebut termasuk juga dengan melampirkan foto - foto sebagai bukti
            penunjang, jika tidak maka Anda tidak dapat mengembalikan atau mengganti Produk,
            <br />
            Anda harus bersedia untuk menerima pengiriman pada tanggal Produk diantarkan. Jika Anda gagal menerima
            pengiriman dari pesanan, maka Kami tidak berkewajiban untuk mengembalikan atau mengganti Produk.
          </div>
          <h5 className="c-terms__heading">Risiko dan Hak Milik</h5>
          <div className="c-terms__paragraph">
            Risiko, Kerusakan ataupun kehilangan atas Produk akan menjadi tanggung jawab Anda sepenuhnya seketika Anda
            menerima Produk yang Anda pesan dan Anda dalam jangka waktu 3 hari tidak memberikan respon apapun atas form
            Pernyataan Barang Dalam Keadaan Bagus, terlepas dari itu semua Produk baru akan menjadi hak milik Anda pada
            saat Anda telah melakukan Pembayaran atas Produk tersebut secara penuh.
          </div>
          <h5 className="c-terms__heading">Pengembalian dan Hak Untuk Melakukan Pembatalan</h5>
          <div className="c-terms__paragraph">
            Anda memiliki Hak Untuk Melakukan Pembatalan atas Pemesanan yang Anda buat dengan syarat - syarat sebagai
            berikut:
            <ul>
              <li>Jika anda tidak menerima Produk dalam jangka waktu 30 hari sejak tanggal Anda membuat Pemesanan; </li>
              <li>Dalam hal Pesanan Anda tidak sesuai pada saat Anda melakukan proses Konfirmasi Pesanan;</li>
              <li>
                Dalam hal terdapat Kerusakan pada Produk dan pada kesempatan pertama Anda melaporkan bahwa Anda telah
                menemukan cacat atau kerusakan pada Produk dengan tidak menyetujui Pernyataan Barang Dalam Keadaan
                Bagus.(Tidak berlaku untuk pembatalan)
              </li>
            </ul>
            Jika Pemesanan yang Anda buat dibatalkan disebabkan oleh alasan - alasan yang tertera diatas, Kami akan
            bertanggung jawab atas segala jumlah yang dibayarkan (termasuk juga biaya pengiriman ulang (jika ada).
            <br />
            Pemberitahuan atas Permintaan untuk Pengembalian Produk dapat diberitahukan dengan mengisi Form Pernyataan
            Barang Dalam Keadaan Bagus dan dikirimkan ke email kami{' '}
            <u>
              <a href="mailto:hello@whenigrowup.co.id">hello@whenigrowup.co.id</a>
            </u>
            .
            <br />
            Untuk menghindari keraguan,kami dapat melakukan inspeksi terhadap Produk yang artinya kecuali sehubungan
            dengan Produk yang rusak atau cacat, tidak ada dalam Syarat dan Ketentuan ini yang akan memberi Anda hak
            pembatalan sehubungan dengan Produk, yang menurut sifatnya telah dibuat menurut spesifikasi.
            <br />
            Anda harus mengembalikan Produk kepada Kami dalam kemasan aslinya (yang harus Anda pertahankan untuk tujuan
            ini). Tidak ada ketentuan dalam klausul ini yang memengaruhi hak Anda berdasarkan Undang - undang yang
            berlaku.
          </div>
          <h5 className="c-terms__heading">Disclaimers dan Pembatasan Tanggung Jawab</h5>
          <div className="c-terms__paragraph">
            Kami berusaha untuk memastikan bahwa informasi yang terkandung dalam Situs (&quot;Konten Situs”) adalah
            benar dan bebas dari kesalahan tetapi kami tidak menjamin keakuratan dan kelengkapan Konten Situs. Kami
            dapat membuat perubahan pada Konten Situs, atau terkait produk, harga atau biaya apapun yang dijelaskan di
            dalamnya, kapan saja tanpa pemberitahuan. Konten Situs mungkin saja sudah tidak relevan maupun aktual, dan
            kami tidak memiliki kewajiban atau pun tanggung jawab untuk memperbarui materi tersebut.
            <br />
            Kami akan melakukan usaha yang wajar dalam menyediakan Situs. Beberapa Konten Situs mungkin disediakan oleh
            pihak ketiga dan atas Konten Situs yang disediakan oleh Pihak Ketiga, kami tidak menjamin dan/atau
            bertanggung jawab atas keakuratan, kelengkapan,atau keandalan Konten Situs tersebut.
            <br />
            Oleh karena itu, kecuali sebagaimana ditentukan secara tegas dalam Syarat dan Ketentuan ini, semua Konten
            Situs yang disediakan melalui Situs ditampilkan &quot;sebagaimana adanya&quot; tanpa representasi atau
            jaminan dalam bentuk apapun, baik tersurat maupun tersirat (baik oleh Peraturan dan undang-undang). Sejauh
            diizinkan oleh hukum yang berlaku, kami melepaskan bertanggung jawab atas kondisi, representasi, pernyataan,
            dan jaminan apapun pada Konten Situs (termasuk, namun tidak terbatas pada, jaminan kesesuaian untuk tujuan
            tertentu pada Situs atau Konten Situs yang Anda gunakan dan juga Konten Situs tidak akan melanggar hak pihak
            ketiga mana pun).
            <br />
            Kami tidak menjamin bahwa fungsi pada Situs ataupun Konten Situs tidak akan terbebas dari kesalahan atau
            cacat yang dapat diperbaiki dan juga Kami tidak menjamin bahwa Situs atau server yang melekat pada Situs
            terbebas dari virus atau komponen berbahaya lainnya.
            <br />
            Kami tidak menjamin bahwa Situs dan Konten Situs akan sesuai dengan permintaan Anda, kami juga tidak
            menjamin atau memberikan pernyataan apapun mengenai kelengkapan, keakuratan, keandalan atas penggunaan
            Konten Situs.
            <br />
            Kami tidak akan dianggap bertanggung jawab atas keamanan Situs atau atas gangguan apapun pada Situs yang
            menyebabkan, kehilangan atau kerusakan materi apapun pada penggunaanya, atau kehilangan atau kerusakan atas
            data saat diunduh ke sistem komputer.
          </div>
          <h5 className="c-terms__heading">Kewajiban</h5>
          <div className="c-terms__paragraph">
            Kami menjamin kepada Anda bahwa Produk yang dibeli melalui Situs memiliki kualitas yang memuaskan dan cukup
            sesuai sebagaimana yang tertera pada deskripsi. Sejauh diizinkan oleh hukum yang berlaku, kami melepaskan
            bertanggung jawab atas kondisi, representasi, pernyataan, dan jaminan yang tertulis maupun tidak (sejauh
            yang diatur di undang - undang).
            <br />
            Tanggung jawab kami atas kerugian yang Anda derita karena kami melanggar Kontrak ini terbatas pada harga
            pembelian bersih Produk yang Anda beli (tidak termasuk pajak dan biaya pengiriman).
            <br />
            Tidak ada dalam Syarat dan Ketentuan ini yang akan mengecualikan atau membatasi tanggung jawab kami atas:
            kematian atau cedera yang disebabkan oleh kelalaian kami; atau kerugian yang diderita oleh Anda sebagai
            akibat dari kesalahan penyajian yang dilakukan oleh kami kepada Anda; atau tanggung jawab apa pun yang tidak
            dapat dikecualikan atau dibatasi berdasarkan hukum yang berlaku.
            <br />
            Anda secara tegas setuju bahwa penggunaan dan penelusuran Situs oleh Anda dan penggunaan Konten Situs adalah
            risiko yang Anda tanggung sendiri sepenuhnya.
            <br />
            Tunduk pada hal di atas, Anda setuju bahwa kami tidak akan bertanggung jawab atas: (a) kerusakan langsung,
            tuntutan atau kerusakan - kerusakan lainnya; (b) setiap kerugian tidak langsung, tuntutan atau kerusakan,
            atau pelanggaran terhadap hukum yang berlaku,insidental atau konsekuensial apa pun yang secara tidak
            langsung memiliki keterkaitan dengan insiden yang menyebabkan tuntutan Anda; atau (c) kerugian pada tabungan
            Anda atau penyelewengan data (apakah secara langsung atau tidak langsung), dalam hal ini apakah berdasarkan
            kontrak, kesalahan (termasuk kelalaian), tanggung jawab, atau sebaliknya, yang timbul dari atau dengan cara
            apapun berkaitan dengan (i) setiap penggunaan Situs atau Konten Situs; (ii) Syarat dan Ketentuan (iii)
            Produk (iv) setiap kegagalan atau keterlambatan dalam penggunaan informasi apapun dari Situs, Konten Situs
            atau layanan apapun termasuk, namun tidak terbatas pada, tidak tersedianya Situs, Konten Situs atau layanan
            pada Situs terlepas dari tidak tersedianya detail pada Situs; (v) setiap penggunaan pada Konten Situs apa
            pun atau informasi, materi, perangkat lunak, produk, layanan, dan grafik terkait lainnya yang diperoleh
            melalui Situs, dalam semua kasus, bahkan jika kami telah diperingatkan sebelumnya tentang kemungkinan dampak
            atas kerusakan tersebut.
            <br />
            Kami tidak akan bertanggung jawab atas kerugian, kerusakan, biaya atau pengeluaran (termasuk hilangnya
            keuntungan) yang timbul secara langsung atau tidak langsung dari kegagalan atau keterlambatan dalam
            melakukan kewajiban berdasarkan Syarat dan Ketentuan ini dengan alasan segala peristiwa atau keadaan di luar
            kendali Kami yang wajar, termasuk, tetapi tidak terbatas pada, setiap pemogokan, demonstrasi, kegagalan
            pasokan listrik atau tidak tersedianya layanan publik, tindakan pemerintah atau bencana.
            <br />
            Hukum yang berlaku di negara tempat tinggal Anda mungkin tidak mengizinkan pembatasan atau pengecualian
            tanggung jawab atau kerusakan insidental atau konsekuensial, dengan pembatasan atau pengecualian di atas
            mungkin tidak berlaku untuk Anda.
            <br />
            Atas risiko yang melekat pada penggunaan internet, kami tidak bertanggung jawab atas kerusakan, atau virus
            yang dapat merusak sistem elektronik Anda pada saat Anda mengakses Situs. Pengunduhan lain dari Konten Situs
            apapun melalui Situs ini dilakukan atas pertimbangan dan risiko Anda sendiri dan dengan persetujuan Anda
            bahwa Anda akan bertanggung jawab penuh atas segala kerusakan pada sistem elektronik Anda atau hilangnya
            data yang dihasilkan dari pengunduhan dari setiap Konten Situs tersebut.
          </div>
          <h5 className="c-terms__heading">Jaminan Ganti Rugi</h5>
          <div className="c-terms__paragraph">
            Anda setuju untuk melepaskan Kami, Induk Usaha, anak perusahaan, afiliasi, dan masing-masing pejabat,
            direktur, karyawan, pemilik, agen, kontraktor, mitra, penyedia informasi dan pemberi lisensi dari ganti rugi
            apapun, tuntutan hukum (termasuk biaya hukum) (baik dapat diperkirakan atau tidak dapat diperkirakan),
            pertanggung jawaban, yang mungkin diderita oleh salah satu pihak tertentu dari segala klaim atau proses
            hukum yang diajukan atau terancam timbul sehubungan dengan penggunaan Anda atas Situs, Konten Situs atau
            layanan yang disediakan melalui Situs, setiap pembelian, transaksi, atau pengaturan dengan pihak ketiga
            melalui Situs atau pada situs pihak ketiga, atau pelanggaran terhadap Ketentuan Penggunaan Umum ini atau
            hukum apa pun atau hak-hak pihak ketiga mana pun.
          </div>
          <h5 className="c-terms__heading">Pengakhiran</h5>
          <div className="c-terms__paragraph">
            Kami dapat menghapus Situs atau menghentikan penyediaan layanan yang tersedia melalui Situs ini kapan saja
            atas kebijakan kami sendiri dengan alasan apapun.
            <br />
            Kami dapat menghentikan akses Anda ke Situs dengan alasan apapun atas kebijakan kami sendiri kapan saja
            dengan atau tanpa pemberitahuan.
          </div>
          <h5 className="c-terms__heading">Perlindungan Data dan Privasi</h5>
          <div className="c-terms__paragraph">
            Kami hanya akan menggunakan informasi pribadi yang Anda berikan kepada Kami sesuai dengan Kebijakan Privasi
            Kami. Kebijakan ini merupakan bagian penting dari Syarat dan Ketentuan ini dan penting bagi Anda untuk
            membacanya. Dengan menerima Syarat dan Ketentuan ini, Anda juga menerima dan menyetujui Kebijakan Privasi
            kami.
          </div>
          <h5 className="c-terms__heading">Hukum yang Berlaku</h5>
          <div className="c-terms__paragraph">
            Syarat dan Ketentuan ini akan dibuat berdasarkan hukum Negara Republik Indonesia dan tunduk pada yurisdiksi
            Negara Kesatuan Republik Indonesia.
          </div>
          <h5 className="c-terms__heading">
            Update terakhir : <u>17 Juli 2020</u>
          </h5>
        </div>
      </div>
      {props.isMobile && <Footer isMobile={props.isMobile} />}
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

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Terms));
