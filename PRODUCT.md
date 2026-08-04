# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Buyers of AI consulting services in regulated and high-stakes industries: CTOs, heads of data/AI, R&D and innovation leads, and clinical/operations decision-makers. They typically arrive during vendor due diligence (from LinkedIn, a referral, a publication, or an announcement) and are evaluating whether Vaiyu is credible enough to contact. Secondary audiences: potential collaborators in academia and open-source, and press.

## Product Purpose

Marketing site for Vaiyu Solutions, an AI operationalization consultancy founded October 2023 (Miami, FL). The site's job is to establish credibility and convert visitors into inbound contact at `support@vaiyu.solutions`. Success = a qualified prospect emails after the site convinces them the team can take AI from architecture to production.

## Positioning

"AI operationalization for regulated industries": Vaiyu takes AI from architecture to production (data, training, deployment, monitoring) in industries where a wrong answer carries regulatory, clinical, or safety consequences. Safety/compliance/reproducibility is a quality attribute of how Vaiyu delivers, never the headline (that territory belongs to a separate company; see Brand Commitments). Proof rests on public, verifiable research outcomes rather than client logos.

**OpenAI Select Partner** (OpenAI Partner Network, announced 2026-07-27) is a durable trust signal to feature prominently (home/about), subject to OpenAI brand-usage rules. Confirmed 2026-08-04.

## Operating Context

- Industries served (confirmed 2026-08-04): healthcare & pharma (anchor), financial services, energy & utilities, manufacturing, automotive, hospitality, and academia. Hospitality, academia, and energy & utilities have dedicated site pages; the others are covered on `/work`.
- Site map: Home, Services, Work & Expertise, About, Contact, 404, plus Announcements (`/announcements` index + per-post pages from `src/content/announcements/`, filename = URL slug).
- Announcements serve three jobs (confirmed 2026-08-04): credibility for prospects (press releases, milestones), thought leadership (perspective pieces shareable on LinkedIn for inbound), and SEO/discoverability.
- Engagement models: discovery sprint → embedded advisory → fractional CAIO → build-and-handover.
- Copy and structured data live in `src/data/site.ts`; content rules and full history in `PLAN.md`.

## Capabilities and Constraints

- Fully static Astro + Tailwind 4 site, deployed to GitHub Pages via Actions; custom domain `vaiyu.solutions` pinned by `public/CNAME`.
- Contact is `support@vaiyu.solutions` only (displayed obfuscated). No calendar embed, no analytics, no forms, no backend.
- Performance budget: Lighthouse ≥ 95 across the board; self-hosted fonts only.
- Pre-launch gate: `pnpm verify` (build + `pnpm lint:firewall` on `dist/`) must return zero firewall hits.
- New announcements via `pnpm new:announcement "Headline"`; files starting with `_` and `draft: true` posts are unpublished.
- Open items: branded OG image not yet generated; commissioned wordmark/logo still open (v1 uses a typographic wordmark).

## Brand Commitments

- Name is **Vaiyu Solutions** everywhere. "Vaiyu Safe Solutions" and "Vaiyu Tech" are retired. "Vaiyu" is Sanskrit for wind/air.
- **VerySafe firewall (hard rule):** zero mentions of VerySafe.ai, SafeCompute, attestation products, or that feature set anywhere on this site. Founder bio here covers Vaiyu + UPenn/Indiana/TUM/MLCommons only. Contact never uses `sarthak@verysafe.ai`. "AI governance & compliance readiness" is framed as a consulting service, never a compute/attestation product pitch. Enforced by `scripts/firewall-lint.mjs`.
- Team presented collectively: "interdisciplinary team of five engineers and scientists" (no named profiles beyond the founder).
- Founder: Sarthak Pati, Founder & CEO. Ph.D. Computer Science, TU Munich (summa cum laude); 11+ years operationalizing AI (UPenn, Indiana University); led $9M+ in NIH/NCI-funded R&D; Vice Chair, MLCommons Medical Working Group.

## Evidence on Hand

- Public research (citable with DOIs): FeTS federated learning study (71 sites, 6 continents, 6,314 cases, 33% improvement; Nature Communications 2022; WSJ coverage), GaNDLF (Nature Communications Engineering Editor's Choice; MLCommons-adopted), MedPerf (Nature Machine Intelligence 2023), OpenFL (PMB 2022), FeTS Challenge (Nature Communications 2025), Patterns 2024 privacy paper.
- Open source: GaNDLF, GaNDLF-Synth, MedPerf, FeTS, OpenFL, CaPTk, 40+ conda-forge recipes.
- Standards & community: MLCommons Medical WG Vice Chair; BraTS/FeTS challenge organization; IBSI and AI-RANO contributions; tutorials at MICCAI, AAAI, ISBI, RSNA.
- OpenAI Select Partner press release (`src/content/announcements/20260727-openai-select-partner.md`) with cover image `public/img/openai-select-partner.png`.
- **Attribution rule (do not fabricate beyond it):** client-derived numbers say "for clients" (e.g. up to 50% training-cost reduction); employment-derived numbers say "our team's track record" (e.g. up to 70% latency reduction); research claims carry links/DOIs. No client names, no invented testimonials, no logos without confirmed rights.

## Product Principles

- Proof over promises: every claim is attributable (client outcome, team track record, or cited research); public research carries the credibility that NDA'd client work cannot.
- Brand separation is non-negotiable: the VerySafe firewall protects both companies' positioning and must survive every future edit.
- Small, fast, static: no backend, no trackers; performance and privacy are part of the pitch to regulated-industry buyers.
- Knowledge transfer, not black boxes: the consultancy's values (rigor, reproducibility, end-to-end ownership) should be legible in how the site itself is built.

## Accessibility & Inclusion

WCAG AA contrast, semantic landmarks, and keyboard navigation are committed baseline (PLAN.md §8); mobile-first responsive.
