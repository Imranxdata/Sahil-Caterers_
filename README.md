# Sahil Caterers — Catering Services Website (Serving Since 2010)

Official website for **Sahil Caterers**, serving freshly prepared vegetarian and non-vegetarian catering from **Badlapur, Maharashtra 421503, India** since **2010**.

- **Calling Number:** `9284850021` (`+91 92848 50021`)
- **WhatsApp Inquiries:** `9503068188` (`+91 95030 68188`)
- **Primary Location:** Badlapur, Maharashtra 421503, India
- **Areas Served:** Badlapur East, Badlapur West, Kalyan, Dombivli, Ambernath, Ulhasnagar, Vitthalwadi, Shahad, Vangani, Shelu, Karjat, and Khopoli

---

## Key Features

- **Menu & Category Showcase:** Dedicated cards for Biryani & Pulao, Customizable Veg & Non-Veg Thalis, Starters, Traditional Indian Desserts, Fresh Juices & Beverages, and Catering & Buffet Services.
- **Filterable Culinary Gallery & Lightbox:** Interactive category tabs and keyboard-accessible modal preview.
- **Occasions & Events:** Coverage for Weddings, Haldi Ceremonies, Engagements, Birthday Parties, Religious Gatherings, Corporate Events, Office Lunches, and Bulk Food Orders.
- **4-Step Interactive WhatsApp Catering Inquiry:** Captures customer details, event date/venue/guest count, dietary preferences, and opens WhatsApp (`9503068188`) pre-filled with a formatted summary (plus clipboard copy and direct call option `9284850021`).
- **Local Service Area Landing Pages:** Clean routes (`/catering-in-badlapur-east`, `/catering-in-shelu`, etc.) with unique SEO titles, meta descriptions, canonical links, and pre-filled inquiry context.
- **SEO & Performance Ready:** Progressive JPEG + responsive mobile/desktop WebP `<picture>` images, explicit dimensions (CLS prevention), Schema.org `LocalBusiness` + `FoodEstablishment` JSON-LD, `robots.txt`, `sitemap.xml`, and static host SPA fallbacks.

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (`motion/react`, respects `prefers-reduced-motion`)
- **Icons:** Lucide React

---

## Local Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server (port 3000):**
   ```bash
   npm run dev
   ```

3. **Type-check & lint:**
   ```bash
   npm run lint
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   The static production bundle is generated in `dist/`.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## Custom Domain Configuration (`VITE_SITE_URL`)

This project is a **100% static website** (no server runtime required) and works on Vercel, Netlify, Cloudflare Pages, or any static host without code changes.

To automatically populate full canonical URLs (`sitemap.xml`, `robots.txt`, `<link rel="canonical">`, and OpenGraph metadata) at build time, add the following environment variable in your hosting dashboard before deploying:

```env
VITE_SITE_URL=https://your-custom-domain.com
```

*(See `.env.example` — do not commit `.env` files with secrets.)*

---

## Hosting Settings Reference

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **SPA Routing Fallback:** Pre-configured via `vercel.json` (Vercel) and `public/_redirects` (Netlify / Cloudflare Pages) so direct refreshes on `/catering-in-*` pages resolve cleanly.
