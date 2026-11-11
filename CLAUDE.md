# CLAUDE.md: Crowned Women and Family Community Services

Women-led, culturally responsive non-profit in the Peel Region (women, families, community).

- Live domain: https://crownedwomenandfamilycommunityservices.org (HostGator folder of the same name). The old code assumed crowned.org, which is not on this account: changed everywhere 11 Nov 2026.
- Host: HostGator (server `gator3095.hostgator.com`, cPanel user `irineashu`)
- Design and audience: see `brand-dna.md`. Placeholders: `PLACEHOLDERS.md` (create it when you find one).

## Studio rules (Jacques' web studio: apply to every task)
- This site must look custom-made for this client, never like a template. Never reuse another client's palette, font pairing, layout rhythm or signature element. No generic AI layout (centered hero + 3 icon cards + testimonial slider + CTA band) unless Jacques asks for it.
- Read `brand-dna.md` in this repo before any design or content change. Items marked ❓ are not confirmed: ask, don't invent.
- Real copy and real photos only. Never invent reviews, testimonials, statistics, people or partner logos. Every placeholder goes in `PLACEHOLDERS.md`.
- Done means: `npm ci && npm run build` passes, you checked desktop and mobile yourself, alt text, AA contrast, page titles/descriptions, compressed images.
- Push to the deploy branch only after the build passes and the change is verified (pushing deploys the live site). Never commit secrets.
- Report to Jacques in plain language, no jargon, with the live link. Anything he must do himself (secrets, DNS, accounts): click-by-click steps.
- Studio stack (zero recurring cost): client's own host via GitHub Actions FTP deploy; Cloudflare free in front; images in Cloudinary or the repo; video on YouTube or Mux (store the public Playback ID, never the Asset ID); forms via Web3Forms; editing via Pages CMS + Sveltia at `/admin`. No Vercel Hobby or Netlify for client sites.

## Stack and build
- Originally a Readdy export: Vite + React + TypeScript + Tailwind + React Router, i18next installed.
- Install and build: `npm ci && npm run build` → output in `out/`.
- Dev preview: `npm run dev`.
- Routes: `/`, `/404`, `/about`, `/cgirls`, `/contact`, `/events`, `/get-involved`, `/partners`, `/services`.

## Deploy
- `.github/workflows/deploy.yml` (studio standard since 11 Nov 2026): push to `main` → `npm ci && npm run build` → FTPS upload of `out/` → live check of the site and every sitemap address.
- Secrets `FTP_SERVER` (= gator3095.hostgator.com), `FTP_USERNAME`, `FTP_PASSWORD`. The workflow finds the site folder itself (FTP account rooted at the site folder → `./`; at the top of the hosting account → `/crownedwomenandfamilycommunityservices.org/`). Optional variables: `SITE_URL`, `FTP_SERVER_DIR`, `FTP_PROTOCOL`.
- `public/.htaccess`: https, clean addresses, one share-preview page per address, SPA fallback, caching. (`out/` is no longer committed.)

## Share previews and SEO
- `src/content/seo.json` → `scripts/social-pages.mjs` (inside `npm run build`): one HTML file per page (e.g. `out/about.html`) with that page's title, description, canonical and 1200×630 picture, plus `sitemap.xml`. Social apps never run JavaScript, so this is what they show.
- In the browser, `src/hooks/usePageMeta.ts` sets the same tags per page and language from `src/seo/site.ts` (domain, per-page pictures) and `meta.*` in the i18n files. Keep the English text in `seo.json` in step.
- Pictures: logo card (home and most pages); Marita (About), pantry volunteers (Services), smiling volunteer (Get Involved), all Cloudinary crops.

## Where things live
- Pages: `src/pages/<page>/` (one folder per page, sections in `components/`). Routes: `src/router/`.
- Text, images and links are mostly hard-coded inside the page components (`src/pages/<page>/components/*.tsx`) and in `src/mocks/`; some content already lives in `src/content/`.
- Next studio step for this site: move client-facing content into `src/content/*.json` and wire up both editors (Pages CMS + Sveltia at `/admin`), exactly like `jacquesmofa/CAWAP` (see its CLAUDE.md and `scripts/studio-tools/` for `extract.mjs`, `snapshot.mjs`, `compare.mjs`). Verify with before/after snapshots that visitors see no change.

## Known issues (found 10 Nov 2026)
- 35 Readdy AI placeholder image URLs (`readdy.ai/api/search-image`) are still in the code. Replace them with real photos and track the rest in `PLACEHOLDERS.md`.
- Some forms post to Readdy's form service (`readdy.ai/api/form`). Move them to Web3Forms with the client's email (studio standard) and test that a message actually arrives.
- Stripe/checkout code exists: check whether it is actually connected before telling anyone that payments work.
- Food Pantry video reel (10 Nov, commit 7b20ec8): 4 Mux videos, Playback IDs in `src/content/videos.json` (never Asset IDs); component `src/components/feature/VideoReel.tsx`; EN/FR text under `films.*` in i18n.
- Team names/photos and most images are still Readdy placeholders.
- Design overlap with other clients: Same font stack (Futura/Jost + JetBrains Mono) as ACCAH and NNAYA: all three came from the same Readdy template. Must diverge.
