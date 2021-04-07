# TODOS:

<!-- - storefront graphQL apis
- laravel admin graphQL api for orders
- reform tables and models
- handle shopify webhooks for order updates -->

# tables

- wigu

  - cart
    - user_id
    - checkout_id (for shopify)
      <!-- - cart_items
    - cart_id
    - product_id
    - quantity
    - price -->
  - orders
    - order_id
    - user_id
    - status
    - shipping_number
  - children
    - name
    - cover
    - gender (boy, girl)
    - age (toddler, kid)
    - skin (light, medium, dark)
    - hair (curly, straight, no-hijab, hijab)
    - birthdate
    - message
  - book_contents
    - value
    - style
    - book_page_id
  - book_pages

    - order
    - occupation_id

  - occupations
    - name
    - description
    - page_count
  - users
    - existing
  - address
    - existing
  -

- shopify
  - checkout (cart)
  - products
  - collections
  - order
  - order_items

# FE BLOCKED

<!-- - google forms -->
<!-- - sampel testimoni -->
<!-- - konten TnC -->
<!-- - konten FAQ -->
<!-- - book desc -->
<!-- - revisi konten (nunggu final) -->
<!-- - revisi showcase (nunggu mz dhana) -->
<!-- - alamat kantor -->
<!-- - copy EN -->
<!-- - desain showcase dari vandi -->
<!-- - empty cart/orders (vandi) -->
<!-- - about us -->
<!-- - help illus -->
<!-- - contents (teks masih ikut) -->

# LATER TODOS

- discount info pages (GRATISONGKIR)

- billing account google maps API
  <!-- - admin dashboard: book-contents -->
  <!-- - emails (tinggal desain) -->
- internal url (for ssr part)
  <!-- - create job to set order to state-done after x days (maybe?) -->
  <!-- - preview mobile (modal like wonderbly) -->
  <!-- - download bookcontents while adding to home screen -->
  <!-- - add loading screen to /facebook & /google -->

# FE TODOS

<!-- - install next-optimized-images -->
<!-- - showcase on / -->
<!-- - book desc on /preview -->
<!-- - nama anak jgn huruf kecil depannya -->
<!-- - SEO (monitoring) -->
<!-- - preview mobile with IG dots -->
<!-- - radio color button -->
<!-- - bug preview mobile -->
<!-- - event tracker -->
<!-- - google tracker -->
<!-- - fb tracker -->
<!-- - testimonial garis aneh -->
<!-- - kenapa kadang default ke EN -->
<!-- - admin dashboard: phone-numbers -->
<!-- - deploy admin -->
<!-- - book double-flip -->
<!-- - pwa for /en -->
<!-- - tnc layout -->
<!-- - qb edit cart -->
<!-- - qb add quantity in cart -->
<!-- - qb add cart then back -->
<!-- - Router.prefetch('/dashboard') -->
<!-- - after login (convert localstorage cart into DB cart) -->
<!-- - wording -->
<!-- - pas logout, lupa clear cart -->
<!-- - whatsapp -->
<!-- - quick buyer -->
<!-- - ubah flow jobs -->
<!-- - cover tetep 2 baris (jika lebih dari 5) -->
<!-- - rule nama anak (max 10 dan no-space) -->
<!-- - when midtrans exists, edit url -->
<!-- - success page button to point to orderdetail (from params) -->
<!-- - order-detail => status-order ikut ke scroll naik (bug) -->
<!-- - sanity check -->
<!-- - kasih hint bahwa buku preview bisa diklik -->

# BE TODOS

<!-- - quick buyer (testing) -->
<!-- - get midtrans url and add to order-detail -->
<!-- - kurang hook updated deh? -->
<!-- - jalankan queue worker di docker -->

<!-- - Orders page 500 -->
<!-- - Loading screen for book contents (desktop done)
- Lazyload page contents (desktop done)
 - mobile => lazyload dikeluarkan
 - custom img component with lazyload -->
<!-- - Test pembayaran di prod -->
<!-- - register webhooks -->
<!-- - Field dob dikasih max today -->
<!-- - Loading child avatar -->
<!-- - Input kebawahen dikit -->
<!-- - Mengubah redirect fb dan google jadi ke home saja (from=google/facebook) kalo fail, reload -->
<!-- - Help submit button -->
<!-- - Mobile sidebar cart link to home -->
<!-- - Ketika klik sidebar (cart) bisa bikin css rusak -->
<!-- - Cart item ga nampilin occupations -->
<!-- - Remove cart item, button text gak keload -->
<!-- - Shopify address2 dan first name kok optional? -->
<!-- - order item img -->
<!-- - jangan bisa zoom pd mobile -->
<!-- - field name nya ga katut -->
<!-- - copy mweb style of wonderbly -->
<!-- - ubah flow custom on mobile -->
<!-- - auto image height on preview -->
<!-- - add notice to change phone number (cant change, but can add) -->
<!-- - update flow login -->
<!-- - pwa -->
<!-- - child avatars -->
<!-- - books
  - 12 job done, 1 to go -->
<!-- - socmed login google -->
  <!-- - checkout -->
<!-- - /create is user-route -->
<!-- - protect user-routes -->
<!-- - checkout favicon -->
<!-- - use scripttags to customize checkout (https://shopify.dev/docs/admin-api/rest/reference/online-store/scripttag) -->
<!-- - redirect after checkout (https://community.shopify.com/c/Payments-Shipping-Fulfillment/Redirect-User-back-to-My-Domain-After-payment-success-or-fails/td-p/354483) (done) -->
<!-- - index page (asset grouping) -->
<!-- - char-custom (jobs, gender, hair) -->
<!-- - save data when adding to cart
  - ??? -->
<!-- - >> test order-webhooks
  - delete cart after trx successfull (also save shippingline) (done)
  - orders -> show name instead of order_number (done) -->
<!-- - 2 type of order-detail: use order_number (WIGO-XXX) or use checkout_id. different endpoint for detail -->
