# Database Design

## User

- id
- name
- email
- password
- provider
- created_at

## Link

- id
- short_code
- long_url
- custom_alias
- expiry_time
- created_at
- user_id

## ClickEvent

- id
- link_id
- country
- browser
- device
- referrer
- clicked_at

## Webhook

- id
- user_id
- url
- event_type
- active

## ABTest

- id
- link_id
- variant_a_url
- variant_b_url
- traffic_split