# Vaiyu Solutions Website — Update Plan

Sources reviewed: portfolio (`D:\Projects\website_sarthakpati.github.io`), resume (`D:\Projects\resume_pati\main.tex`), current site (`docs/`).
Status: plan only — no implementation until approved.

---

## 1. Current state

- Jekyll + Cayman theme, GitHub Pages serving `docs/`, custom domain `vaiyu.solutions` (CNAME present).
- One page (`docs/index.md`), ~15 lines, no services detail, no proof points, no team, no work samples.
- `_config.yml` title is "Welcome to Vaiyu" (placeholder-grade).
- **Naming inconsistent:** "Vaiyu Safe Solutions" (`docs/index.md`), "Vaiyu.Solutions" (`docs/README.md`), "Vaiyu Tech" (root `README.md`), "Vaiyu Solutions" (resume, LinkedIn, GitHub org).
- `docs/README.md` duplicates index content with a slightly different (better) services list; root README is stale.
- Contact: `support@vaiyu.solutions`. LinkedIn company page exists but isn't linked from the live page. GitHub org: `Vaiyu-Solutions`.

## 2. Positioning strategy

**Recommendation: position Vaiyu as "AI operationalization for regulated industries" — not "safe AI."**

- The recent commit (`63c31b7`) moved the homepage toward safety emphasis ("Vaiyu Safe Solutions", "safe, compliant AI"). That is VerySafe.ai's territory (policy-aware compute, attestation). Two founder-owned brands pitching "safe AI" confuses buyers and cannibalizes VerySafe's wedge.
- Clean split:
  - **Vaiyu Solutions = services.** "We take AI from architecture to production in industries where it has to be right" — healthcare & pharma, finance, energy, manufacturing. Safety/compliance/reproducibility is a *quality attribute of how Vaiyu delivers*, not the headline.
  - **VerySafe.ai = product.** SafeCompute, cryptographic attestation, policy-aware compute. None of it appears on vaiyu.solutions.
- Standardize the name to **Vaiyu Solutions** everywhere (site title, H1, README, OG tags). Drop "Vaiyu Safe Solutions" and "Vaiyu Tech".

## 3. VerySafe firewall (hard content rules)

1. Zero mentions of VerySafe.ai, SafeCompute, or the product feature set (RATS attestation, SLSA provenance, HSM-signed audit chains, policy-aware LLM router) anywhere on vaiyu.solutions.
2. Founder bio on this site: Vaiyu + UPenn/Indiana/TUM/MLCommons only. The "Founder of VerySafe.ai" line stays on the personal site, not here.
3. Contact email is `support@vaiyu.solutions` everywhere — never `sarthak@verysafe.ai`.
4. "AI governance & compliance readiness" is offered as a *consulting service* (process, validation, documentation, privacy) — never as a compute/attestation *product pitch*.
5. Pre-launch lint: grep the built site for `verysafe|safecompute|attestation|RATS|SLSA|HSM` — must return zero hits.
6. (One-directional rule: the personal site mentioning both companies is fine; this firewall governs vaiyu.solutions only.)

## 4. Site map

Five pages, small and fast:

| Page | Path | Job |
|---|---|---|
| Home | `/` | Value prop, proof bar, services overview, credibility strips, CTA |
| Services | `/services` | Six offerings + engagement models |
| Work & Expertise | `/work` | Industries, public track record, open source, publications, standards |
| About | `/about` | Company story, founder bio, team, values |
| Contact | `/contact` | Email, LinkedIn, GitHub, optional calendar link |

## 5. Page-by-page content plan

### 5.1 Home

- **Hero.** H1 draft: "AI that ships — in industries where it has to be right." Sub: "Vaiyu Solutions takes AI from architecture to production — data, training, deployment, monitoring — for healthcare & pharma, finance, energy, and manufacturing." CTA: "Start a discovery sprint" → contact.
- **Proof bar** (4–5 stats; see attribution table in §6):
  - 11+ years operationalizing AI
  - $9M+ in federally funded AI R&D led
  - Up to 50% training-cost reduction for clients
  - 71-site federated learning study (largest real-world FL deployment)
  - Published in Nature Communications & Nature Machine Intelligence
- **Services overview**: six cards linking to `/services`.
- **Credibility strip** (text, no logos unless rights confirmed): "Our team's work has appeared in Nature Communications, Nature Machine Intelligence, and The Lancet Oncology, and has been covered by The Wall Street Journal." + "Vice Chair, MLCommons Medical Working Group."
- **Open-source strip**: GaNDLF · MedPerf · FeTS · OpenFL · CaPTk with one-liners + GitHub links.
- **Closing CTA**: email + (optional) calendar link.

### 5.2 Services

Six offerings (sources: resume engagement models + Vaiyu/IU bullets + old `docs/README.md` list):

1. **Discovery & AI Strategy** — 2–4 week discovery sprint: problem framing, data-readiness assessment, technical due diligence, build-vs-buy recommendation.
2. **Data Engineering for AI** — ingestion, curation, harmonization, annotation pipelines; "data as IP" strategy (the approach that helped secure a $3.5M NIH/NCI grant).
3. **Model Development & Training** — custom training pipelines; LLM fine-tuning and routing; federated and privacy-preserving learning; pre-training optimization (documented up to 50% training-cost reduction with improved accuracy).
4. **Deployment, MLOps & Optimization** — secure, low-cost deployment; API-driven integration (REST, MCP, A2A); CI/CD and monitoring; inference optimization for constrained/clinical environments (documented up to 70% latency reduction, 10–50% resource reduction).
5. **AI Governance & Compliance Readiness** — reproducibility and validation practices, audit-ready documentation, privacy-preserving design, responsible-AI reviews for regulated environments. *(Service framing only — see firewall.)*
6. **Fractional AI Leadership & Team Enablement** — fractional Chief AI Officer (strategy, hiring, vendor selection, board reporting); embedded technical advisory; team upskilling — workshops by instructors who have taught federated learning at MICCAI, AAAI, ISBI, and RSNA.

**Engagement models** (from resume): Discovery sprint → Embedded advisory → Fractional CAIO → Build-and-handover (scoped delivery with knowledge transfer).

### 5.3 Work & Expertise

- **Industries**: Healthcare & pharma (anchor — 10+ years clinical AI), financial services, energy, manufacturing. (Automotive only if confirmed — see decisions.)
- **Selected work** — lead with *public, verifiable* research outcomes (client work is likely NDA'd):
  - **Federated learning at global scale (FeTS):** 71 sites across 6 continents; 6,314 cases; 33% delineation improvement over centralized baseline; published in Nature Communications; covered by the Wall Street Journal.
  - **GaNDLF:** low-code, reproducible deep-learning framework for clinical workflows; Nature Communications Engineering *Editor's Choice*; adopted by MLCommons.
  - **MedPerf:** federated benchmarking of medical AI; Nature Machine Intelligence; MLCommons project.
  - **Inference in low-resource environments:** optimization work enabling clinical deployment on constrained hardware.
  - Anonymized client blurbs ("For a pharma client…") pending what's shareable — see decisions.
- **Open source portfolio**: GaNDLF, GaNDLF-Synth, MedPerf, FeTS, OpenFL, CaPTk, 40+ conda-forge recipes — role + link each.
- **Selected publications**: 5–8 (FeTS/Nature Comms 2022, GaNDLF/Comms Eng 2023, MedPerf/Nature MI 2023, OpenFL/PMB 2022, FeTS Challenge/Nature Comms 2025, Patterns 2024 privacy paper) + Google Scholar link. Venue-led phrasing; verify any total count against Scholar before printing it.
- **Standards & community**: Vice Chair (Algorithmic Development), MLCommons Medical WG; BraTS/FeTS challenge organization; IBSI and AI-RANO contributions; reviewer for Nature Communications, IEEE TMI, Radiology; tutorials at MICCAI/AAAI/ISBI/RSNA.

### 5.4 About

- **Story**: founded October 2023. Interdisciplinary team of 5 engineers and scientists. End-to-end ownership: architecture → training → deployment → monitoring.
- **Founder bio** (firewall-compliant): Sarthak Pati, Founder & CEO. Ph.D. Computer Science, TU Munich (*summa cum laude*); 11+ years operationalizing AI (University of Pennsylvania, Indiana University); led $9M+ in NIH/NCI-funded R&D; Vice Chair, MLCommons Medical Working Group; creator/lead of GaNDLF, CaPTk; co-lead FeTS. Headshot from portfolio assets. Optional link to sarthakpati.github.io.
- **Team**: collective description (recommended) or named profiles — see decisions.
- **Values**: rigor & reproducibility; end-to-end ownership; knowledge transfer (no black-box handoffs); built for regulated reality.

### 5.5 Contact

- `support@vaiyu.solutions` (mailto), LinkedIn `linkedin.com/company/vaiyu-solutions`, GitHub `github.com/Vaiyu-Solutions`.
- Recommended v1: mailto + optional Cal.com/Calendly embed. No backend/form service needed; add Formspree later only if spam or volume demands it.

## 6. Proof-point attribution (honesty guardrails)

| Claim | Source | Usable as |
|---|---|---|
| Up to 50% training-cost reduction | Vaiyu client work (resume) | Company outcome — "for clients" |
| 4+ clients, team of 5 | Vaiyu (resume) | Company fact |
| Up to 70% latency / 10–50% resource reduction | Founder's Indiana Univ. work | Track record — "our team has delivered" |
| $9M+ federally funded R&D led | Founder's UPenn + IU roles | Founder/team track record |
| FeTS 71 sites / 33% improvement | Public research (Nature Comms 2022) | Citable anywhere, link DOI |
| Editor's Choice, Top 25, WSJ coverage | Public recognition | Citable anywhere |
| Publication count (~90 bib entries / 45 on resume) | Portfolio bib | Verify vs. Scholar; prefer venue-led phrasing |

Rule: client-derived numbers say "for clients"; employment-derived numbers say "our team's track record"; research claims carry links/DOIs.

## 7. Tech stack & migration

**Recommendation: rebuild on Astro 5 + Tailwind, deploy to GitHub Pages via Actions, keep the domain.**

- Rationale: content-driven marketing site (Astro is the configured default); Cayman theme reads as a default GitHub project page — credibility cost for a consultancy; Astro gives full design control, zero-JS by default, trivially good Lighthouse scores. Content volume is small, so the rebuild is cheap.
- Migration mechanics:
  - Astro project at repo root (`src/`, `public/`); `public/CNAME` containing `vaiyu.solutions`.
  - `.github/workflows/deploy.yml` using `withastro/action` → GitHub Pages artifact deploy.
  - Repo settings: switch Pages source from "branch `main` /docs" to "GitHub Actions" at cutover. DNS untouched; CNAME preserved → no domain downtime.
  - Delete `docs/` after cutover; rewrite root `README.md` ("Vaiyu Solutions website — Astro, deployed via GitHub Actions").
- Fallback option (not recommended): keep Jekyll, rewrite content only, swap theme. Lower effort, much lower ceiling.

## 8. Design direction

- "Vaiyu" = Sanskrit for wind/air — brand motif: subtle flowing-line/contour patterns, airy whitespace; palette: deep ink/slate base + a single warm or aero accent; strong grotesque headings, highly readable body; light theme default.
- B2B-consulting polish: no stock photos; use abstract motif + real artifacts (publication/venue names, GitHub repo cards, stat counters).
- Wordmark: simple typographic logo for v1 (text-set "Vaiyu Solutions" + favicon); commission a proper mark later.
- Build with the `frontend-design` skill; accessibility (WCAG AA contrast, semantic landmarks, keyboard nav) and mobile-first responsive from the start.

## 9. SEO / infra

- Per-page `<title>`/meta description; canonical URLs; OG + Twitter cards with a branded OG image.
- JSON-LD: `Organization` (Vaiyu Solutions, Miami FL, founder → `Person` Sarthak Pati w/ sameAs: GitHub, LinkedIn, Scholar, ORCID) + `Service` entries.
- `sitemap.xml` (Astro integration), `robots.txt`, favicon set.
- Analytics: privacy-friendly (Plausible or GoatCounter) or none — see decisions. No cookie banner needed if cookieless.
- Performance budget: Lighthouse ≥ 95 across the board; system or self-hosted fonts only.

## 10. Implementation phases

- **Phase 0 — Decisions** (user, §11). Blocks copy.
- **Phase 1 — Content**: draft all copy as markdown per §5; run firewall lint (§3.5); user reviews copy.
- **Phase 2 — Build**: scaffold Astro + Tailwind; design system (tokens, components: header/footer, hero, stat bar, service card, project card, publication list); implement 5 pages; responsive + a11y pass.
- **Phase 3 — Launch**: deploy workflow; Pages source switch; CNAME/domain verification; Lighthouse + OG validation; firewall lint on built output; cutover; delete `docs/`; update root README.
- **Phase 4 — Post-launch**: point LinkedIn company page & GitHub org profile at the new site; confirm personal site's Vaiyu link still lands well; optional Search Console submission.

Estimated new/changed files: ~25–35 (scaffold + components + pages + workflow). Commits only on request, Conventional Commits.

## 11. Decisions (resolved 2026-06-10)

1. **Name**: "Vaiyu Solutions" everywhere ("Vaiyu Safe Solutions" / "Vaiyu Tech" dropped).
2. **Positioning**: operationalization-led; safety stays a delivery attribute, not the headline.
3. **Case studies**: generic, deliverable engagement examples ("representative engagements" on `/work`) — no client-specific claims; public research carries the proof.
4. **Industries**: healthcare & pharma, financial services, energy, manufacturing, **and automotive**.
5. **Team**: collective ("interdisciplinary team of five engineers and scientists").
6. **Contact**: `sarthak@vaiyu.solutions` only (displayed obfuscated). No calendar embed, no analytics.
7. **Stack**: Astro 5 + Tailwind 4 on GitHub Pages via Actions — implemented.

## 12. Implementation status (2026-06-10)

- Site built: 5 pages + 404, design system ("engineering journal with air": paper/ink/saffron, Fraunces + Archivo + IBM Plex Mono, wind streamlines, footnoted claims).
- `pnpm build` passes; firewall lint on `dist/` returns zero hits.
- Deploy workflow at `.github/workflows/deploy.yml`. Cutover: commit & push, switch **Settings → Pages → Source** to "GitHub Actions", then delete `docs/`.
- Known follow-up: branded OG image (`og:image`) not yet generated; commissioned wordmark/logo still open.
