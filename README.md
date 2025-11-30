# Muslim Shopi — React Shopping Cart

A responsive shopping cart and e-commerce UI built with React, Vite, and Firebase. This project includes a small admin panel to add products, seed demo data, manage images (Firebase Storage), and run a full shopping/checkout flow with authentication.

---

## Table of Contents

- Overview
- Features
- Tech Stack
- Prerequisites
- Setup & Local Development
- Firebase Setup
- Seeding Data
- Deployment (Vercel)
- Project Structure (high level)
- Troubleshooting & Tips
- Contributing
- License

---

## Overview

This repo is a small e-commerce demo app (muslim-shopi). The app uses Firebase for Auth, Firestore, and Storage, Vite to serve & build the app, and is commonly deployed on Vercel.

## Features

- Product catalog and collections
- Product variants with images, sizes and skus
- Cart and checkout flows
- Address management and user profile
- Admin UI to create/edit products and seed demo data
- Firebase Auth (Email/Password and anonymous fallback)

## Tech Stack

- React 18
- Vite
- Firebase (Auth, Firestore, Storage)
- Vercel for hosting
- Sass for styles

## Prerequisites

- Node.js 24.x (see `.nvmrc`) — this repo uses Node 24.
- npm (or pnpm/yarn)
- A Firebase project (Auth + Firestore + Storage)

Note: Vercel can also be used to host this app — make sure you set the project Node.js version to 24 in the Vercel dashboard and the Functions runtime to Node.js.

## Setup & Local Development

1. Clone the repository

```bash
git clone https://github.com/pranantaghofar/muslim-shopi.git
cd muslim-shopi
```

2. Install dependencies

```bash
npm install
```

3. Set Node to the repository version (if using nvm)

```bash
nvm use
# or explicitly:
nvm use 24
```

4. Create your Firebase configuration file

This project expects a `firebase-config.jsx` file at `src/db/firebase-config.jsx` (this file is gitignored). Create it with your Firebase project's settings and export `firebaseConfig` like below:

```js
// src/db/firebase-config.jsx
export const firebaseConfig = {
  apiKey: '<FIREBASE_API_KEY>',
  authDomain: '<FIREBASE_AUTH_DOMAIN>',
  projectId: '<FIREBASE_PROJECT_ID>',
  storageBucket: '<FIREBASE_STORAGE_BUCKET>',
  messagingSenderId: '<FIREBASE_MESSAGING_SENDER_ID>',
  appId: '<FIREBASE_APP_ID>'
};

export default firebaseConfig;
```

Tip: if you prefer to keep secrets in environment variables, you can build this file in terms of `import.meta.env` or use `.env` files and import values accordingly.

5. Start local dev server

```bash
npm run dev
```

6. Lint

```bash
npm run lint
```

7. Build & Preview

```bash
npm run build
npm run preview
```

## Firebase Setup

1. Create a Firebase project and enable:
  - Authentication (Email/Password is required for signup/login; anonymous auth is used as a fallback)
  - Firestore (no special rules in this repository; set them securely for production)
  - Storage (for product images and uploads)

2. Create or link your Firebase credentials in `src/db/firebase-config.jsx` (see example above)

3. The admin features assume a `users` collection with user data, including boolean `isAdmin` for users allowed to access the Admin panel — edit a user document manually to set `isAdmin: true`.

## Seeding demo data

This repo contains `src/data/dummy-products.json` (seedable demo data). To seed this data:

1. Make sure you have Firebase `firebase-config.jsx` setup and Firestore rules configured.
2. Login as an admin or make your user document have `isAdmin: true`.
3. Navigate to the Admin panel in the UI and use the **Seed Data** option — the UI uses `hooks/useSeed` to write the demo products into Firestore.

Note: Firestore writeBatch has limits (500 writes per batch). When seeding a large dataset, watch for batch limits.

## Deployment (Vercel)

This project is commonly deployed on Vercel. The repo includes `vercel.json` to configure function behavior and Node runtime. Follow these steps for a successful deployment:

1. Configure project Node.js version to **24** in the Vercel dashboard (Project Settings → Build & Development Settings → Node.js Version). Vercel supports Node 24.x.
2. If your project uses Serverless Functions (API routes), make sure the Functions runtime or `vercel.json` runtime is configured properly. This project has `vercel.json` that sets `nodejs` runtime for `api/**` patterns.
3. Clear cache on Vercel and redeploy if you see warnings about Node 18:
    - Dashboard → Deployments → Select last deployment → Redeploy -> choose Clear cache.

### Common Errors
- Error: "Node.js version 18.x is discontinued" — fix by setting Node 24 in Vercel Project Settings and ensuring `package.json` includes the `engines.node` entry (already set to >=24 in this repo).
- Error: "Function Runtimes must have a valid version ..." — This usually means `vercel.json` runtime value is an invalid string; using `nodejs` (generic) is recommended (the runtime version is set by project settings or `package.json` engines). This repo uses `nodejs` in `vercel.json` to avoid invalid version tokens.

## Environment Variables

This repo doesn't store Firebase credentials in `package.json`. You must create `src/db/firebase-config.jsx` or use environment variables to provide them. If you use environment variables, the example `firebase-config.jsx` might look like:

```js
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

On Vercel, set the `VITE_*` environment variables under Project Settings → Environment Variables and redeploy.

## Project Structure (high level)

```
src/
├─ components/
│  ├─ common/ (reusable components: Button, Modal, AdminProduct, ProductCard)
│  └─ pages/ (Pages: Home, Product, Collection, Cart, Checkout, Admin)
├─ context/ (React contexts: auth, cart, checkout)
├─ hooks/ (custom hooks including useAuth, useAdmin, useSeed)
├─ db/ (Firebase config, export of db, auth, storage)
├─ data/ (dummy products JSON used by the seeder)
└─ helpers/ (formatting, error handlers)
```

## Troubleshooting & Tips

- If your Vercel deployment still uses Node 18 after upgrading settings, confirm there are no environment variables or CI configuration pinning Node to 18 (search for `NODE_VERSION`).
- If a function runtime error occurs, check `vercel.json` runtime values. Use `nodejs` in `vercel.json` and explicitly set Node version in project settings.
- For production Firestore rules, secure access carefully and allow only authorized admins to create/edit products.

## Contributing

Contributions are welcome. Suggested workflow:
1. Fork & branch
2. Implement changes
3. Run lint and tests (if added)
4. Open a PR with a detailed description

## License

This project does not include a license file. Add a LICENSE file to define the project's license.

---

If you'd like, I can also:
- Add a CI workflow (GitHub Actions) to run lint/test
- Add a `seed` script in `package.json` to seed the DB locally
- Add a `firebase-config.example.js` to help contributors set up their own credentials quickly

Let me know which you'd like next.
