# Tehillah Community Collaborative website

A website for Tehillah Community Collaborative (Elsies River, Cape Town).

- `frontend/` is the website people see (Next.js, React, Tailwind CSS).
- `backend/` is the server (Node.js, Express, TypeScript). It takes enquiries from the contact form, and it lets staff add news stories.
- `/admin` on the website is a simple staff page for reading enquiries and posting news.

## What you need

- Node.js 20.12 or newer (Node 22 is best)
- npm (comes with Node)

## First time setup

1. Open a terminal in this folder and run:

   ```
   npm install
   ```

2. Make the backend settings file:

   ```
   cp backend/.env.example backend/.env
   ```

   Open `backend/.env` and set `ADMIN_TOKEN` to a long password, at least 16 characters. You can make one with:

   ```
   node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
   ```

   This password is what staff type in at `/admin`. If it is empty or too short, the admin page stays switched off.

3. Make the frontend settings file:

   ```
   cp frontend/.env.example frontend/.env.local
   ```

## Run it while building

```
npm run dev
```

- Website: http://localhost:3000
- API: http://localhost:4000
- Admin page: http://localhost:3000/admin

## Other commands

- `npm test` runs the backend tests.
- `npm run typecheck` checks the code for type errors.
- `npm run build` builds both parts.
- `npm start` runs the built version.

## Putting it online

- Set `API_URL` (in `frontend/.env.local` or the host settings) to the address of the backend BEFORE you run `npm run build`. It is saved into the build.
- Set `NEXT_PUBLIC_SITE_URL` to the real website address (used for the sitemap).
- In `backend/.env`, set `CORS_ORIGINS` to the website address. If the backend sits behind a proxy or load balancer, set `TRUST_PROXY=1`.
- Enquiries and news are saved in `backend/data/db.json`. This is fine to start. Keep that file backed up, and move to a proper database (for example PostgreSQL) when the site grows.

## Changing things

- Words, numbers and programme details: `frontend/src/content/site.ts`
- Photos: put them in `frontend/public/images` and point to them from `site.ts`
- Colours: the top of `frontend/src/app/globals.css`
- News: use `/admin`, News tab. Changes show on the site within about a minute.

## Project layout

```
backend/
  src/        server code (routes, validation, storage)
  test/       API tests
frontend/
  src/app/        pages
  src/components/ shared pieces (header, footer, forms, admin)
  src/content/    all the written content
  public/images/  photos from the brochure
```

## Before going live, please confirm with the client

- Every figure and claim taken from the brochure is still true. We left out the "95% success rate" and the grant amount on purpose because they were not confirmed.
- They agree to the photos being used, and that everyone shown (especially children and clients) has given permission.
- The real logo file. The site uses a plain text version for now.
- The official email address (it is empty in `site.ts`), and donation or banking details.
- Who controls the domain tehillah.za.org. We have not bought or changed any domain.
- The address and phone number against official listings.
- Their current website mentions three provinces and an Arts and Culture cluster, while the brochure shows Youth. Ask which is correct.

## Good next steps

- Email the team when a new enquiry comes in
- Upload photos from the admin page
- Online donations (for example PayFast)
- Video on the pages
