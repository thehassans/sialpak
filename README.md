# BuySial — Next.js Storefront + Premium Admin Panel

A complete, production-shaped Next.js 14 (App Router + TypeScript) e-commerce project:
a fast, SEO-optimized storefront and a full **admin panel** with dashboard analytics,
banner management with live preview, order & fulfillment management, products &
categories, SEO/pixel controls, and Pakistan-based payment & courier integrations.

## Stack

- **Next.js 14** (App Router, Server Components, Route Handlers, `sitemap.ts` / `robots.ts`)
- **TypeScript** + **Tailwind CSS**
- **Prisma + SQLite** (swap the `DATABASE_URL` for Postgres/MySQL in production — schema is provider-agnostic aside from the `Json` workaround)
- **JWT session auth** (`jose`) via HTTP-only cookie — no third-party auth vendor required
- **Recharts** for dashboard analytics
- Zero external network calls required to run locally

## 1. Install

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="generate-a-long-random-string"
ADMIN_EMAIL="admin@buysial.com"
ADMIN_PASSWORD="ChangeMe123!"
NEXT_PUBLIC_SITE_URL="https://www.yourdomain.com"
```

## 2. Set up the database

```bash
npx prisma migrate dev --name init
npm run seed
```

This creates the SQLite DB, your **admin login**, demo categories, collections
(`Best Offers`, `Beauty Essentials Sale`, `New Goods`), demo products, and default
settings for SEO/pixels/payments/logistics.

## 3. Run

```bash
npm run dev
```

- Storefront: `http://localhost:3000`
- Admin login: `http://localhost:3000/adminlogin` (use the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`)

## What's included in the Admin Panel (`/admin/*`)

| Page | What it does |
|---|---|
| **Dashboard** | Revenue (7-day chart), pending/delivered orders, avg order value, order-status breakdown, top-selling products, low-stock alerts — all computed live from the database. |
| **Banners** | Full CRUD for homepage banners with **instant live preview** (gradient, image, copy, button, position, schedule) — changes reflect on the storefront immediately. |
| **Orders** | Filterable/searchable order list, order detail view, update order status, payment status, assign a courier + tracking number. |
| **Products** | Add/edit products: price, compare-at price, cost price, SKU, stock, multi-image upload, category, and **collections** (tag products into "Beauty Essentials Sale", "The Best Offers", etc. — create new collections inline). |
| **Categories** | CRUD with category images, ordering, active/hidden toggle. |
| **SEO & Pixels** | Global meta title/description/OG image, robots indexing toggle, auto sitemap — plus GA4, GTM, Meta Pixel, TikTok Pixel, Snap Pixel IDs, injected site-wide. |
| **Payments** | Pakistan payment gateways: **JazzCash**, **EasyPaisa**, **PayFast**, Bank Transfer, and Cash on Delivery — each with its own enable toggle, credentials, and sandbox/live mode. |
| **Logistics** | Pakistan courier integrations: **Leopards Courier**, **TCS**, **PostEx**, **M&P** — API credentials, default courier, and webhook endpoints for status sync. |
| **Settings** | Store name, tagline, support phone, currency, shipping message. |

Admin auth is a signed JWT stored in an HTTP-only cookie; `middleware.ts` protects
every `/admin/*` route and redirects unauthenticated visitors to `/adminlogin`.

## Payment gateway & courier integration notes

This project ships the **full settings UI, database schema, checkout order-creation
flow, and webhook endpoints** for JazzCash, EasyPaisa, PayFast, and Leopards/TCS/PostEx/M&P.

What you still need to do to go fully live (these require your real merchant
credentials, which only you can obtain from each provider):

1. Get your Merchant ID / API keys from JazzCash, EasyPaisa, PayFast, and your
   chosen courier(s), and enter them in **Admin → Payments / Logistics**.
2. In `src/app/api/checkout/route.ts`, add the redirect/HPP (hosted payment page)
   request for the selected gateway using the saved credentials — each gateway's
   integration guide gives the exact hashing/signature steps.
3. Point each gateway's "return/webhook URL" at
   `/api/webhooks/jazzcash`, `/api/webhooks/easypaisa`, etc. (already scaffolded in
   `src/app/api/webhooks/*`) so payment status updates automatically.
4. Point each courier's status webhook at `/api/webhooks/{courier}` to auto-sync
   order status + tracking.

This structure keeps all secrets in your database (never hard-coded) and keeps the
storefront checkout, admin order view, and courier/payment status all in sync.

## Performance & SEO

- Server-rendered storefront with `next/image`, streaming, and zero client JS for
  read-only pages
- `generateMetadata` per page (home, category, product) driven by your SEO settings
- `sitemap.ts` / `robots.ts` generated from live product & category data
- JSON-LD `Product` structured data on product pages
- Pixel scripts injected via `next/script` with `afterInteractive` strategy (non-blocking)

## Project structure

```
src/
  app/
    page.tsx                     storefront home
    category/[slug]/page.tsx
    product/[slug]/page.tsx
    adminlogin/page.tsx
    admin/                       protected admin panel (see middleware.ts)
      dashboard/ orders/ products/ categories/ banners/ seo/ payments/ logistics/ settings/
    api/
      auth/                      login/logout
      admin/                     protected CRUD for banners/products/categories/orders/settings/upload
      checkout/route.ts          creates orders from the storefront cart
      webhooks/                  jazzcash/easypaisa/leopards status callbacks
  components/
    storefront/                  Header, Footer, HeroBanners, CategoryGrid, ProductGrid, PixelScripts
    admin/                       Sidebar, StatCard, BannerManager, ProductForm, OrdersTable, ...
  lib/                           prisma client, auth, settings, utils
prisma/
  schema.prisma
  seed.ts
```

## Deploying

Any Node host works (Vercel, Railway, a VPS). For production:

- Swap SQLite for Postgres/MySQL: change the `datasource` provider in
  `prisma/schema.prisma` and `DATABASE_URL`, then `npx prisma migrate deploy`.
- Set a strong `JWT_SECRET` and real `ADMIN_EMAIL`/`ADMIN_PASSWORD` before seeding.
- Set `NEXT_PUBLIC_SITE_URL` to your real domain (used by the sitemap and OG tags).
