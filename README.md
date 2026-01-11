# donation-qr-netlify

Angular single-page app (SPA) for collecting donations via QR code, hosted on **Netlify**.

## Features
- **Donate form** with 3 fields: Fullname, Cellphone, Amount
- Submissions captured by **Netlify Forms** (no database you manage)
- Admin can review submissions in Netlify dashboard + enable email notifications
- Public **Progress** page shows **donor count** + **total amount** (no personal info) via a Netlify Function

---

## 1) Prerequisites
- Node.js LTS (recommended)
- Angular CLI

Install Angular CLI:
```bash
npm i -g @angular/cli
```

---

## 2) Install & run locally
```bash
npm install
npm start
```

Local dev runs at http://localhost:4200

> Netlify Forms processing only happens on Netlify deploys (not in local dev).

---

## 3) Build
```bash
npm run build
```

Output: `dist/donation-qr-netlify/browser`

---

## 4) Deploy to Netlify
### A) Create a new Netlify site
- New site from Git (recommended) or drag-and-drop the build output.

### B) Build settings
- Build command: `npm run build`
- Publish directory: `dist/donation-qr-netlify/browser`

### C) Enable Forms
- Netlify Dashboard → Forms → ensure **Form detection** is enabled.

### D) Admin Email notifications
- Netlify Dashboard → Forms → donation → Notifications → Add email notification.

---

## 5) Enable Progress totals (serverless function)
This repo includes a Netlify Function: `/.netlify/functions/stats`

### Required environment variables
Set these in Netlify:
- `NETLIFY_SITE_ID` (Site settings → Site details → API ID)
- `NETLIFY_ACCESS_TOKEN` (Netlify user settings → Applications → Personal access tokens)

The function returns:
```json
{ "count": 12, "total": 250.50 }
```

---

## Routes
- `/donate` (default)
- `/progress`
- `/thank-you`

---

## Notes
- The donate form is detected by Netlify using:
  - a real form on `/donate`
  - plus a hidden static form in `src/index.html` (important for SPAs)

# ccl
