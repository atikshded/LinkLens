# API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/oauth/google

---

## Link Management

POST /api/links

GET /api/links

GET /api/links/{id}

DELETE /api/links/{id}

GET /r/{shortCode}

---

## Analytics

GET /api/analytics/{linkId}

GET /api/analytics/{linkId}/countries

GET /api/analytics/{linkId}/devices

GET /api/analytics/{linkId}/browsers

GET /api/analytics/{linkId}/referrers

---

## QR Code

GET /api/links/{id}/qr

---

## Webhooks

POST /api/webhooks

GET /api/webhooks

DELETE /api/webhooks/{id}

---

## A/B Testing

POST /api/abtests

GET /api/abtests/{id}

---

## AI Insights

GET /api/ai/summary/{linkId}
