---


# Technical Sewa & Solution

> **Production-ready Next.js 13+ web app for Technical Sewa & Solution.**
>
> Robust, CDN-optimized, and scalable. Built for speed, SEO, and maintainability.

---

## 🚀 Features

- **Next.js 13+ App Directory**: Modern routing, layouts, and server components.
- **Tailwind CSS**: Utility-first, purged and minified for production.
- **jsDelivr CDN Integration**: All static assets (images, scripts, styles) are served via CDN in
  public deployments. See [`lib/cdn.ts`](lib/cdn.ts).
- **CDN-aware Components**: Use `CdnImage`, `CdnScript`, `CdnStyle` for automatic asset resolution.
- **Universal Image Fallback**: All images use `ImageWithFallback` for robust placeholder handling.
- **Dynamic Imports & Code Splitting**: Heavy components (sliders, maps, MUI) are loaded only when
  needed.
- **SEO & Analytics**: Integrated with Google Analytics, Facebook Pixel, and best-practice meta
  tags.
- **Skeleton Loaders**: Universal skeletons for all major loading states.
- **Bundle Analysis**: Built-in analyzer for bundle size optimization.
- **Font & CSS Optimization**: Loads only required Inter font weights/styles, purges unused CSS.
- **Environment-based Asset Handling**: Always uses local assets for private repos, CDN for public.
- **Production-Ready**: All configs, environment variables, and static assets are ready for Vercel
  or custom deployment.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js v18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://gitlab.com/supremeitonline/technicalsewa.git
   cd technicalsewa
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   ```sh
   cp .env.example .env.local
   # Edit .env.local as needed
   ```

### Development

Start the local dev server:

```sh
npm run dev
# or
yarn dev
```

### Production

Build and start the production server:

```sh
npm run build
npm start
# or
For support, contact info@flowrage.com

```

---

## 📦 CDN & Static Assets

- All static assets (images, scripts, styles) are served via
  [jsDelivr CDN](https://www.jsdelivr.com/) when the repo is public.
- For private/local development, assets are always loaded from the local `/public` directory.
- See [`lib/cdn.ts`](lib/cdn.ts) for asset resolution logic.
- Use provided CDN-aware components for all static asset references.

**Best Practices:**

- Add new static assets to `/public/assets/` and reference them via `getAssetUrl` or CDN-aware
  components.
- For reliable placeholders, use `/image/placeholder.png` via `ImageWithFallback`.

---

## 🧩 Project Structure

- `app/` — Next.js app directory (routes, layouts, pages)
- `components/` — Reusable UI components
- `features/` — Feature modules (home, dashboard, etc.)
- `lib/` — Utilities (API, CDN, analytics, etc.)
- `public/` — Static assets (images, scripts, manifest, etc.)
- `styles/` — Global and component CSS
- `@types/` — TypeScript type definitions
- `store/` — State management (if used)

---

## 📝 Environment Variables

See `.env.example` for all required and optional environment variables. Always keep secrets out of
version control.

---

## 🧪 Testing & Quality

- Bundle analysis: `npm run analyze`
- Linting: `npm run lint`
- Type checking: `npm run type-check`
- (Add or improve automated tests as needed)

---

## 🛡️ Security & Best Practices

- No sensitive files are tracked in version control.
- All environment variables are managed via `.env.local` and Vercel dashboard.
- No manual polyfills or deprecated dependencies.
- All analytics/scripts loaded non-blocking with `next/script`.
- Accessibility and security audits recommended before major releases.

---

## 📚 Documentation & Support

- For detailed CDN usage, see [`lib/cdn.ts`](lib/cdn.ts).
- For help, open an issue or contact [info@technicalsewa.com](mailto:info@technicalsewa.com).

---

## 📝 License

© 2025 Technical Sewa & Solution Pvt Ltd. All rights reserved.

Unauthorized copying, distribution, or use of this source code, via any medium, is strictly
prohibited. This code is confidential and proprietary to Technical Sewa & Solution Pvt Ltd.

For support, contact [info@technicalsewa.com](mailto:info@technicalsewa.com)
