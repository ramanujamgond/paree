# Pyaree Woodpressed Oils

A modern, responsive brand website for **Pyaree**, by Barik Agro Industries in Balangir, Odisha.

**Apno ke Liye, Pyar Se**

The website combines authentic product photography, an editorial visual style, and direct WhatsApp ordering.

## Features

- Homepage, product collection, seven product detail pages, brand story, philosophy, production process, FAQ and contact.
- Product sizes and INR prices sourced from client-supplied information.
- Order drawer with quantity controls, totals, local persistence and cross-tab synchronisation.
- Formatted WhatsApp order messages and an Instagram fallback.
- Responsive layouts, keyboard navigation, focus management and reduced-motion support.
- Page metadata, product structured data, sitemap and robots configuration.

## Technology

Next.js App Router · React · TypeScript · authored CSS · Motion · GSAP · Vitest

## Run locally

```sh
git clone https://github.com/ramanujamgond/paree.git
cd paree
npm ci
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International WhatsApp number, digits only. Defaults to the business number `918984868900` when missing or invalid. |
| `NEXT_PUBLIC_SITE_URL` | Production origin used for canonical URLs, structured data and sitemap. |

Configure the final site URL before deployment. Keep `.env.local` out of Git.

## Checks and production

```sh
npm test
npm run lint
npm run build
npm start
```

## Project structure

| Directory | Contents |
| --- | --- |
| `app/` | Pages, layout, styles and SEO routes. |
| `components/` | Navigation, product presentation, ordering and motion. |
| `content/` | Shared copy and FAQ content. |
| `lib/` | Catalogue, pricing, ordering, configuration and tests. |
| `public/images/` | Supplied logo, product photographs and supporting artwork. |

[PROJECT.md](PROJECT.md) preserves client information and the complete brand narrative. The product catalogue is maintained in `lib/products.ts`.

## Content notes

The catalogue includes six edible wood-pressed oils and Castor Oil separately. Castor has no supplied descriptive copy or photograph, so its page shows its name, size and price. Coconut orders are for 250 ml; the supplied photograph shows earlier 200 ml packaging.

The supplied Pyaree logo is used in the header and footer. Ordering opens a prefilled message; delivery details are confirmed directly with the business.
