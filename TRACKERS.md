# Trackers

## 1. Pageview Tracker

Tracker is sent everytime a user access a page.

## 2. Event Tracker

Here is list of action events:

```
click_create
  - event_category: engagement
  - event_label: '/' | 'create' | 'preview'

login
  - event_category: engagement
  - method: 'google' | 'facebook' | 'email'

register
  - event_category: engagement
  - method: 'email'

click_landing
  - event_category: engagement
  - event_label: 'desktop' | 'mobile'

add_to_cart
  - event_category: engagement
  - event_label: 'desktop' | 'mobile'

testimonials
  - event_category: engagement
  - event_label: 'desktop' | 'mobile'

toggle_lang
  - event_category: engagement
  - event_label: 'en' | 'id'

checkout
  - event_category: engagement
  - event_label: 'desktop' | 'mobile'
  - value: price
```
