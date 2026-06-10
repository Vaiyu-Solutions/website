# Vaiyu Solutions — website

Source for [vaiyu.solutions](https://vaiyu.solutions). Astro 5 + Tailwind 4, fully static, deployed to GitHub Pages via GitHub Actions.

## Develop

```sh
pnpm install
pnpm dev       # local dev server
pnpm build     # static build → dist/
pnpm preview   # serve the build locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages.

One-time setup: **Settings → Pages → Source: "GitHub Actions"**. The custom domain is pinned by `public/CNAME` (`vaiyu.solutions`); DNS stays unchanged. After the first successful Actions deploy, the legacy Jekyll site in `docs/` can be deleted.

## Content

- Copy and structured data (services, projects, publications, stats): `src/data/site.ts`
- Pages: `src/pages/` · layout & SEO/JSON-LD: `src/layouts/Base.astro`
- Plan and content rules: `PLAN.md` — including the **VerySafe firewall**: no VerySafe.ai / SafeCompute / attestation-product content on this site, and `sarthak@vaiyu.solutions` as the only contact address.
