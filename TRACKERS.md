# Trackers

## 1. GA Pageview Tracker

Tracker is sent everytime a user access a page.

## 2. GA Event Tracker

Here is list of action events:

```
click_create
  - event_category: engagement
  - event_label: '/' | '/create' | '/preview'

login
  - event_category: engagement
  - event_label: 'google' | 'facebook' | 'email'

click_landing
  - event_category: engagement
  - event_label: 'desktop' | 'mobile'

add_to_cart
  - event_category: ecommerce
  - event_label: 'desktop' | 'mobile'

testimonials
  - event_category: engagement
  - event_label: 'desktop'

click_book_page
  - event_category: engagement
  - event_label: 'desktop'

toggle_lang
  - event_category: engagement
  - event_label: 'en' | 'id'

checkout
  - event_category: ecommerce
  - event_label: 'desktop' | 'mobile'
  - value: price
```

## 3. Pixel Tracker

```
PageView

ViewContent
  - cartItems
  - isLoggedIn
  - path

AddToCart
  - cartItem
  - isLoggedIn

InitiateCheckout
  - price
  - cartItems
  - isLoggedIn

```
