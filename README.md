# Watt Power — Landing page prototype

Premium, scroll-driven Next.js landing page for Watt Power.

## Stack
- Next.js 16 / App Router
- React 19 / TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Lenis

## Run
```bash
npm install
npm run dev
```

## Validation
```bash
npm run lint
npm run typecheck
npm run build
```

## Asset placeholders
The current version intentionally uses CSS, SVG and HTML-only placeholder artwork. Add final assets later under:
- `public/images/`
- `public/video/`
- `public/mockups/`

Replace the placeholder CTA email and final branding before production.

## Design tokens
Core colors, spacing, radii and accent color live in `app/globals.css` under `:root`.

<!-- redeploy: production alias refresh 2026-09-21 -->

## Local verification and commercial contact

Run `npm ci`, `npm run build`, `npm run typecheck`, `npm run lint`, then `npm start -- --port 4317` for a production preview. The committed lockfile also makes Docker installations reproducible.

Set `CONTACT_EMAIL` to the confirmed commercial address (see `.env.example`). It is read on the server at request time, including in Docker. Without a valid address, the site displays an honest availability message instead of a fictitious mailto. No lead submission backend is configured.

The homepage uses a locally bundled generated architectural image and a CSS/SVG scroll composition. This is an architectural illustration, not a completed installation or an interactive 3D villa. The old Three.js scenes remain in the source but are not used by this hero.
