# Travel Agency Website Template

A Next.js (App Router) template for travel agency websites. **Website only** — no backend, no admin panel, no database.

---

## Features

- **Public website** – Home, about, blog, tours, contact, gallery
- **Static content** – All content in `app/*Content.ts` files; edit there to change copy and data
- **Booking form** – Opens the user’s email client with a pre-filled message (no server required)

---

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd marwa-design-develop
npm install
```

### 2. Run

```bash
npm run dev
```

- Website: [http://localhost:3000](http://localhost:3000)

Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_APP_NAME` and `NEXT_PUBLIC_BASE_URL` for branding.

---

## Deployment

1. **Build:** `npm run build`
2. **Start:** `npm start` (or your host’s start command)
3. No database or API keys required.

---

## Project structure

- `app/` – Pages: home, about, blog, tours, contact, gallery. Each uses sections and content from `app/sections/` and `app/*Content.ts`.
- `app/content/` – Barrel file re-exporting all page content.
- `app/sections/` – Reusable UI sections (Header, Footer, Hero, etc.).
- `lib/` – `utils` only. No database or auth.

No `(admin)`, `(auth)`, or `api/` folders — website only.

---

## License

Private / as per your license.
