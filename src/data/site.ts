export const SITE = {
  name: 'Vaiyu Solutions',
  url: 'https://vaiyu.solutions',
  email: 'support@vaiyu.solutions',
  emailDisplay: 'support [at] vaiyu [dot] solutions',
  tagline: 'AI from architecture to production, for industries where it has to be right.',
  location: 'Worldwide',
  linkedin: 'https://www.linkedin.com/company/vaiyu-solutions',
  github: 'https://github.com/Vaiyu-Solutions',
  scholar: 'https://scholar.google.com/citations?user=lL5jPysAAAAJ',
  mlcommons: 'https://mlcommons.org/working-groups/data/medical/',
};

export const NAV = [
  { href: '/services/', label: 'Services' },
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

/** Home proof bar. `fn` indexes into the home page footnotes. */
export const STATS = [
  { value: '15+', label: 'years operationalizing AI, prototype to production' },
  { value: '$9M+', label: 'federally funded AI R&D led', fn: 1 },
  { value: '50%', prefix: 'up to', label: 'training cost cut for clients', fn: 2 },
  { value: '71', label: 'sites in one federated learning study', fn: 3 },
  { value: '90%', prefix: 'up to', label: 'inference latency removed', fn: 4 },
];

export interface ServiceBullet {
  text: string;
  fn?: string;
}

export const SERVICES: {
  slug: string;
  num: string;
  title: string;
  tag: string;
  bullets: ServiceBullet[];
  get: string;
}[] = [
  {
    slug: 'discovery',
    num: '01',
    title: 'Discovery & AI Strategy',
    tag: 'A 2–4 week sprint that turns a fuzzy mandate into a costed, de-risked plan.',
    bullets: [
      { text: 'Problem framing and use-case triage against business value' },
      { text: 'Data-readiness and infrastructure assessment' },
      { text: 'Technical due diligence on vendors, models, and architectures' },
      { text: 'Build-vs-buy analysis with a costed roadmap' },
    ],
    get: 'A plan your board and your engineers both believe.',
  },
  {
    slug: 'data',
    num: '02',
    title: 'Data Engineering for AI',
    tag: 'Ingestion, curation, harmonization — data your models and your auditors can trust.',
    bullets: [
      { text: 'Pipelines for ingestion, curation, and quality control' },
      { text: 'Harmonization across sites, formats, and legacy systems' },
      { text: 'Annotation workflows and dataset versioning' },
      {
        text: '“Data as IP” strategy for licensing and collaboration — the approach that contributed to a $3.5M NIH/NCI award',
        fn: 'a',
      },
    ],
    get: 'Datasets that are an asset on the balance sheet, not a liability in the audit.',
  },
  {
    slug: 'models',
    num: '03',
    title: 'Model Development & Training',
    tag: 'Custom pipelines, LLM adaptation, federated learning — built for your domain.',
    bullets: [
      { text: 'Architecture selection and custom training pipelines: vision, language, multimodal' },
      { text: 'Fine-tuning open and frontier models on proprietary data' },
      { text: 'Federated and privacy-preserving training when data cannot move' },
      {
        text: 'Pre-training cost optimization — up to 50% lower training spend with accuracy maintained or improved',
        fn: 'b',
      },
    ],
    get: 'Models that earn their place in production.',
  },
  {
    slug: 'deployment',
    num: '04',
    title: 'Deployment, MLOps & Optimization',
    tag: 'Secure, observable, affordable AI in production — new builds and stalled pilots alike.',
    bullets: [
      { text: 'API-driven integration with your stack: REST, MCP, A2A' },
      { text: 'CI/CD for models, monitoring, and drift detection' },
      {
        text: 'Inference optimization for constrained and clinical hardware — up to 70% latency reduction, 10–50% fewer resources',
        fn: 'c',
      },
      { text: 'Cloud, VPC, on-premises, and edge deployment' },
    ],
    get: 'AI your own ops team can run.',
  },
  {
    slug: 'governance',
    num: '05',
    title: 'AI Governance & Compliance Readiness',
    tag: 'Reproducibility, validation, and documentation that stand up to scrutiny.',
    bullets: [
      { text: 'Reproducible pipelines and experiment lineage' },
      { text: 'Validation protocols and audit-ready documentation' },
      { text: 'Privacy-preserving design: de-identification, federation, access control' },
      { text: 'Responsible-AI reviews calibrated to regulated environments, built on a decade of healthcare-grade rigor' },
    ],
    get: 'Confidence that the system you ship is the system you can defend.',
  },
  {
    slug: 'leadership',
    num: '06',
    title: 'Fractional AI Leadership & Enablement',
    tag: 'Senior AI leadership — strategy, hiring, board reporting — without the full-time hire.',
    bullets: [
      { text: 'Fractional Chief AI Officer engagements' },
      { text: 'Embedded technical advisory alongside your team' },
      { text: 'Hiring support and vendor selection' },
      { text: 'Workshops and upskilling, from instructors who have taught federated learning at MICCAI, AAAI, ISBI, and RSNA' },
    ],
    get: 'Your team, levelled up — not a dependency on ours.',
  },
];

export const MODELS = [
  {
    num: '01',
    title: 'Discovery Sprint',
    desc: '2–4 weeks. Framing, feasibility, and a costed plan. The default way to start.',
  },
  {
    num: '02',
    title: 'Build & Handover',
    desc: 'Scoped delivery with documentation, training, and knowledge transfer. No black-box handoffs.',
  },
  {
    num: '03',
    title: 'Embedded Advisory',
    desc: 'Recurring senior engineering and product leadership inside your team.',
  },
  {
    num: '04',
    title: 'Fractional CAIO',
    desc: 'Strategy, hiring, vendor selection, and board reporting — on a fractional basis.',
  },
];

export const INDUSTRIES: { name: string; tag: string; blurb: string; href?: string }[] = [
  {
    name: 'Healthcare & Pharma',
    tag: 'anchor domain',
    blurb:
      'Our anchor. A decade building AI that runs in hospitals: imaging pipelines, multi-site collaboration without data sharing, validation that satisfies clinical review.',
  },
  {
    name: 'Academia & Research',
    tag: 'lab to clinic',
    blurb:
      'Universities, research hospitals, and consortia. We turn grant-funded prototypes into sustainable, validated software — and carry research models the last mile into clinical deployment.',
    href: '/academia/',
  },
  {
    name: 'Financial Services',
    tag: 'audit-ready',
    blurb:
      'Document intelligence, risk models, and LLM workflows — deployed with the lineage and audit trail your regulators expect.',
  },
  {
    name: 'Energy',
    tag: 'always-on',
    blurb: 'Forecasting, monitoring, and optimization for infrastructure that cannot go down.',
  },
  {
    name: 'Manufacturing',
    tag: 'line speed',
    blurb:
      'Defect detection and predictive maintenance that hold up at line speed, on the hardware you already run.',
  },
  {
    name: 'Automotive',
    tag: 'safety-critical',
    blurb: 'Perception and analytics built under hard latency, safety, and certification constraints.',
  },
];

export const ENGAGEMENTS = [
  {
    title: 'The pilot that stalled before production',
    desc: 'The model that wowed in a demo and then stalled — or the prototype you inherited and can’t trust. We re-engineer it into something your ops team can run and your auditors can sign off: hardened pipelines, lineage, monitoring, drift detection, and the tests that got skipped.',
  },
  {
    title: 'Research model → clinical deployment',
    desc: 'Take a promising model from the lab to validated deployment on hospital infrastructure: data harmonization, retraining, and inference optimization for the hardware you actually have.',
  },
  {
    title: 'Learning across sites — without moving data',
    desc: 'Stand up federated training across hospitals, partners, or geographies, so consortia can build shared models while every record stays home.',
  },
  {
    title: 'Private LLMs on your data',
    desc: 'Adapt open or frontier language models to your domain inside your own environment — fine-tuning, evaluation harnesses, and guardrails included.',
  },
  {
    title: 'Document intelligence for regulated back offices',
    desc: 'Extraction, classification, and review workflows for finance and compliance teams, with every model decision logged and reviewable.',
  },
  {
    title: 'AI at the edge of the plant',
    desc: 'Defect detection and predictive maintenance under real latency, bandwidth, and hardware budgets — production lines, vehicles, substations.',
  },
  {
    title: 'The AI cost-down audit',
    desc: 'A focused pass over your training and inference spend. Our track record: training costs cut by up to 50%, inference latency by up to 70% — without giving up accuracy.',
    fn: 2,
  },
];

export const PROJECTS = [
  {
    name: 'GaNDLF',
    desc: 'Low-code, reproducible deep learning for clinical workflows.',
    meta: 'Communications Engineering (Nature) Editor’s Choice · an MLCommons project',
    role: 'Created and led by our founder',
    href: 'https://github.com/mlcommons/GaNDLF',
  },
  {
    name: 'MedPerf',
    desc: 'Federated benchmarking of medical AI at global scale.',
    meta: 'Nature Machine Intelligence · an MLCommons project',
    role: 'Core team',
    href: 'https://github.com/mlcommons/MedPerf',
  },
  {
    name: 'FeTS',
    desc: 'Real-world federated tumor segmentation across 71 sites on 6 continents.',
    meta: 'Nature Communications · covered by The Wall Street Journal',
    role: 'Co-led by our founder',
    href: 'https://github.com/FETS-AI/Front-End',
  },
  {
    name: 'OpenFL',
    desc: 'An open framework for federated learning, hardened in healthcare.',
    meta: 'Physics in Medicine & Biology',
    role: 'Core contributor',
    href: 'https://github.com/securefederatedai/openfl',
  },
  {
    name: 'CaPTk',
    desc: 'Quantitative cancer-imaging platform for radiomics and ML phenotyping.',
    meta: 'Journal of Medical Imaging',
    role: 'Co-led by our founder',
    href: 'https://github.com/CBICA/CaPTk',
  },
  {
    name: 'GaNDLF-Synth',
    desc: 'Democratizing generative AI for medical imaging — autoencoders to diffusion.',
    meta: 'MLCommons ecosystem',
    role: 'Created by our founder',
    href: 'https://github.com/mlcommons/GaNDLF-Synth',
  },
];

export const PUBS = [
  {
    title: 'Federated learning enables big data for rare cancer boundary detection',
    venue: 'Nature Communications',
    year: '2022',
    note: '71 sites, 6 continents — the largest real-world federated learning study to date',
    href: 'https://doi.org/10.1038/s41467-022-33407-5',
  },
  {
    title: 'GaNDLF: a generally nuanced deep learning framework for scalable end-to-end clinical workflows',
    venue: 'Communications Engineering (Nature)',
    year: '2023',
    note: 'Editor’s Choice',
    href: 'https://gandlf.org',
  },
  {
    title: 'Federated benchmarking of medical artificial intelligence with MedPerf',
    venue: 'Nature Machine Intelligence',
    year: '2023',
    href: 'https://www.medperf.org',
  },
  {
    title: 'OpenFL: the open federated learning library',
    venue: 'Physics in Medicine & Biology',
    year: '2022',
    href: 'https://github.com/securefederatedai/openfl',
  },
  {
    title: 'Towards fair decentralized benchmarking of healthcare AI with the FeTS Challenge',
    venue: 'Nature Communications',
    year: '2025',
  },
  {
    title: 'Privacy preservation for federated learning in health care',
    venue: 'Patterns (Cell Press)',
    year: '2024',
  },
];

export const COMMUNITY = [
  {
    text: 'Vice Chair, Algorithmic Development — MLCommons Medical Working Group',
    href: 'https://mlcommons.org/working-groups/data/medical/',
  },
  { text: 'Organizers of leading benchmarks: the BraTS and FeTS challenges (MICCAI)' },
  { text: 'Contributors to imaging standards: IBSI and AI-RANO' },
  { text: 'Reviewers for Nature Communications, IEEE Transactions on Medical Imaging, and Radiology' },
  { text: 'Tutorial faculty at MICCAI, AAAI, ISBI, and RSNA' },
];
