# ElitePMPrompts — Technical Architecture Document

**Version:** 1.0
**Date:** February 2026

---

## 1. Architecture Overview

ElitePMPrompts is a **statically-exported Next.js 14 application** — a fully client-side SPA with no backend server. All data is embedded at build time, all state is persisted to browser localStorage, and payments are handled via redirect-based integration with PayFast.

### 1.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Static Host                        │
│              (Vercel / S3 / GitHub Pages)            │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │           Next.js 14 Static Export            │   │
│  │          (output: 'export' → /out)            │   │
│  │                                               │   │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────────┐  │   │
│  │  │  Pages  │ │Components│ │  Static Data  │  │   │
│  │  │ (6 routes)│ │(18 comps)│ │(12 blueprints)│ │   │
│  │  └─────────┘ └──────────┘ └──────────────┘  │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  PWA/SW  │  │ manifest │  │  Static Assets   │  │
│  │  (sw.js) │  │  (.json) │  │(images, icons)   │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
           │                    │
           ▼                    ▼
    ┌─────────────┐     ┌──────────────┐
    │   PayFast    │     │  Mailchimp   │
    │  (Payments)  │     │  (Email)     │
    │  Redirect    │     │  Iframe      │
    └─────────────┘     └──────────────┘
```

### 1.2 Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Static Export** | Zero server costs, global CDN distribution, maximum performance |
| **No Database** | localStorage for all state — purchases, progress, favorites, analytics |
| **No API Routes** | Eliminates server management; PayFast uses redirect flow |
| **Client-Side Only** | All rendering happens in browser; no SSR complexity |
| **PWA** | Offline-first capability for enterprise environments with restricted networks |

---

## 2. Technology Stack

### 2.1 Core Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.1.0 | React framework with App Router and static export |
| React | 18.2.0 | UI component library |
| TypeScript | 5.3.3 | Type safety across entire codebase |
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| PostCSS | 8.4.35 | CSS processing pipeline |

### 2.2 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| lucide-react | 0.300.0 | Icon library (Zap, ArrowRight, Lock, Shield, etc.) |
| fuse.js | 7.1.0 | Client-side fuzzy search for prompt library |
| file-saver | 2.0.5 | Browser file download triggers |
| xlsx | 0.18.5 | Excel file generation for prompt exports |
| clsx | 2.1.0 | Conditional CSS class composition |
| tailwind-merge | 2.2.0 | Tailwind class conflict resolution |

### 2.3 Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Jest | 30.2.0 | Unit testing framework |
| @testing-library/react | 16.3.2 | React component testing |
| ESLint | 8.56.0 | Code linting |
| Autoprefixer | 10.4.17 | CSS vendor prefixing |
| ts-node | 10.9.2 | TypeScript execution for scripts |

---

## 3. Project Structure

```
PM-Nexus/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (meta, fonts, navbar, footer)
│   ├── page.tsx                      # Landing page
│   ├── globals.css                   # Global styles + glassmorphism system
│   ├── prompts/
│   │   └── page.tsx                  # Free prompt library
│   ├── blueprints/
│   │   ├── page.tsx                  # Blueprint catalog + suites
│   │   └── [slug]/
│   │       ├── page.tsx              # Blueprint detail (server wrapper)
│   │       ├── BlueprintDetailClient.tsx  # Blueprint detail (client)
│   │       └── run/
│   │           ├── page.tsx          # Blueprint run (server wrapper)
│   │           └── BlueprintRunClient.tsx  # Interactive wizard (client)
│   ├── pricing/
│   │   └── page.tsx                  # Pricing tiers + FAQ
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx            # Sticky navigation
│       │   └── Footer.tsx            # Site footer
│       ├── ui/
│       │   ├── GlassButton.tsx       # Button component (3 variants)
│       │   ├── GlassCard.tsx         # Card container (3 tiers)
│       │   └── GlassInput.tsx        # Input field
│       ├── features/
│       │   ├── PromptSearch.tsx       # Fuzzy search + framework filters
│       │   ├── PromptList.tsx         # Prompt grid display
│       │   ├── PromptModal.tsx        # Prompt detail + variable editor
│       │   ├── UnlockModal.tsx        # License key entry
│       │   └── EmailCapture.tsx       # Email gate (Mailchimp)
│       ├── blueprints/
│       │   ├── BlueprintCard.tsx      # Blueprint card for grids
│       │   ├── BlueprintWizard.tsx    # Step-by-step executor
│       │   ├── StepView.tsx          # Individual step renderer
│       │   ├── CheckpointGate.tsx    # Quality gate checklist
│       │   ├── ProgressBar.tsx       # Progress indicator
│       │   ├── RequiredInputs.tsx    # Input collection form
│       │   ├── ArtifactPreview.tsx   # Artifact metadata display
│       │   └── CopyPromptButton.tsx  # Copy-to-clipboard
│       ├── marketing/
│       │   └── EmailCapture.tsx       # Mailchimp form
│       └── PWARegister.tsx           # Service worker + install banner
├── data/
│   ├── pm-prompts.ts                 # 50+ free prompts
│   ├── framework-phases.ts           # 12 framework definitions
│   └── blueprints/
│       ├── index.ts                  # Blueprint registry + suite definitions
│       ├── safe-pi-planning.ts       # SAFe PI Planning (8 steps)
│       ├── safe-inspect-adapt.ts     # SAFe Inspect & Adapt (5 steps)
│       ├── safe-art-sync.ts          # SAFe ART Sync (4 steps)
│       ├── safe-portfolio-kanban.ts  # SAFe Portfolio Kanban (5 steps)
│       ├── agile-sprint-planning.ts  # Agile Sprint Planning (6 steps)
│       ├── agile-sprint-review-retro.ts  # Agile Review & Retro (5 steps)
│       ├── agile-release-planning.ts # Agile Release Planning (5 steps)
│       ├── agile-kanban-optimization.ts  # Kanban Optimizer (5 steps)
│       ├── pmbok-initiation-planning.ts  # PMBOK Init & Plan (7 steps)
│       ├── pmbok-execution-monitoring.ts # PMBOK Exec & Monitor (5 steps)
│       ├── pmbok-risk-procurement.ts     # PMBOK Risk & Procurement (5 steps)
│       └── pmbok-closure-lessons.ts      # PMBOK Closure (5 steps)
├── hooks/
│   ├── useBlueprintAccess.ts         # Purchase tracking + dev mode
│   ├── useBlueprintProgress.ts       # Wizard progress persistence
│   ├── useFavorites.ts               # Prompt favorites
│   ├── useRecentlyViewed.ts          # Recently viewed prompts
│   ├── useEmailGate.ts               # Email capture state
│   ├── useLicenseKey.ts              # Premium unlock (legacy)
│   └── useAnalytics.ts               # Event tracking
├── lib/
│   ├── types.ts                      # TypeScript interfaces
│   ├── utils.ts                      # cn() utility
│   ├── export.ts                     # Prompt export (MD, Excel, JSON, HTML)
│   ├── payfast.ts                    # PayFast payment integration
│   └── blueprint-export.ts           # Blueprint export (MD + Claude setup)
├── public/
│   ├── manifest.json                 # PWA manifest
│   ├── sw.js                         # Service worker
│   ├── favicon.svg                   # Site icon
│   ├── icons/                        # PWA icons (8 sizes)
│   └── images/                       # Background images
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
└── jest.config.js
```

---

## 4. Data Architecture

### 4.1 Type System

All data types are defined in `lib/types.ts`:

```typescript
// Core prompt type
interface Prompt {
  id: string;
  title: string;
  description: string;
  template: string;              // Contains {{variable}} placeholders
  variables: PromptVariable[];
  framework: Framework;          // 12 supported frameworks
  phase: string;
  canonicalPhase: CanonicalPhase; // 1-5 standardized phases
  tier: 'free' | 'premium';
  tags: string[];
  estimatedTimeSaved: string;
}

// Blueprint type
interface Blueprint {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  methodology: 'SAFe' | 'PRINCE2' | 'PMBOK' | 'COBIT' | 'Agile';
  version: string;
  estimatedTime: string;
  stepCount: number;
  steps: BlueprintStep[];
  requiredInputs: { name: string; description: string; format: string }[];
  artifactsProduced: string[];
  tier: 'free' | 'premium';
  price: number;                 // In cents (29700 = $297)
  suiteId: string;
}

// Blueprint step with checkpoint
interface BlueprintStep {
  id: number;
  title: string;
  purpose: string;
  estimatedTime: string;
  prompt: string;               // Multi-paragraph prompt with [variable] substitution
  expectedOutput: string;
  artifacts: ArtifactTemplate[];
  checkpoint: {
    title: string;
    items: CheckpointItem[];
    failAction: string;
  };
}

// Suite bundle
interface BlueprintSuite {
  id: string;
  name: string;
  methodology: string;
  description: string;
  blueprints: string[];         // Array of blueprint IDs
  price: number;                // Suite price in cents
}
```

### 4.2 Data Flow

```
Build Time                          Runtime (Browser)
─────────                           ─────────────────
data/blueprints/*.ts  ──build──►  Static JS bundles
data/pm-prompts.ts    ──build──►  (embedded in page chunks)
data/framework-phases.ts ─build─►

                                    localStorage
                                    ├── pmnexus_purchases      (PurchaseRecord[])
                                    ├── pmnexus_blueprint_progress_{id} (BlueprintProgress)
                                    ├── pmnexus_favorites      (string[])
                                    ├── pmnexus_recently_viewed (RecentItem[])
                                    ├── pmnexus_email_captured  (boolean)
                                    ├── pmnexus_license_unlocked (boolean)
                                    ├── pmnexus_analytics_queue (AnalyticsEvent[])
                                    └── pmnexus_pwa_dismissed   (boolean)
```

### 4.3 State Management

**No global state library** (no Redux, Zustand, or Context). All state is managed through:

1. **React `useState`** — Component-level state
2. **Custom hooks with localStorage** — Persistent cross-session state
3. **URL parameters** — PayFast return params for payment verification

**Hook Architecture:**

| Hook | Storage Key | Hydration Strategy |
|------|------------|-------------------|
| `useBlueprintAccess` | `pmnexus_purchases` | `useState(false)` + `useEffect` to avoid SSR mismatch |
| `useBlueprintProgress` | `pmnexus_blueprint_progress_{id}` | Same pattern |
| `useFavorites` | `pmnexus_favorites` | Same pattern |
| `useRecentlyViewed` | `pmnexus_recently_viewed` | Same pattern |
| `useEmailGate` | `pmnexus_email_captured` | Same pattern |
| `useAnalytics` | `pmnexus_analytics_queue` | Queue-based, max 100 events |

**Hydration Safety:** All hooks use a `useState(initialValue)` + `useEffect(() => readLocalStorage())` pattern to prevent Next.js hydration mismatches between server-rendered HTML and client state.

---

## 5. Payment Integration

### 5.1 PayFast Flow

```
User clicks "Buy"
    │
    ▼
initiatePayFastPayment()
    │ Creates hidden <form> with:
    │   - merchant_id, merchant_key
    │   - item_name, item_description
    │   - amount (ZAR)
    │   - return_url (back to blueprint page)
    │   - cancel_url (back to blueprint page)
    │
    ▼
Form.submit() → Redirect to PayFast
    │
    ▼
User completes payment on PayFast
    │
    ▼
PayFast redirects to return_url with params
    │
    ▼
checkPayFastReturn() detects URL params
    │
    ▼
recordPurchase() saves to localStorage:
    {
      blueprintId: "safe-suite",
      paymentRef: "from-url-params",
      purchasedAt: "ISO-date",
      email: "user-email"
    }
```

### 5.2 Environment Configuration

```javascript
// next.config.js
env: {
  NEXT_PUBLIC_PAYFAST_MERCHANT_ID: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID,
  NEXT_PUBLIC_PAYFAST_MERCHANT_KEY: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY,
  NEXT_PUBLIC_PAYFAST_SANDBOX: process.env.NEXT_PUBLIC_PAYFAST_SANDBOX || 'true',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://elitepmprompts.com',
}
```

**Sandbox Mode:** When `NEXT_PUBLIC_PAYFAST_SANDBOX=true`, uses test merchant credentials and sandbox URL.

### 5.3 Access Control

The `useBlueprintAccess` hook determines access:

1. **Dev Mode:** If `window.location.hostname` is `localhost`, all blueprints are unlocked
2. **Individual Purchase:** Check if `blueprintId` exists in purchases array
3. **Suite Purchase:** Check if the corresponding suite ID exists (e.g., `safe-suite` unlocks all 4 SAFe blueprints)

---

## 6. Design System

### 6.1 Glassmorphism Tiers

Defined in `globals.css` as CSS utilities:

| Tier | Class | Use Case | Background | Blur |
|------|-------|----------|------------|------|
| Base | `.glass` | Legacy | `rgba(255,255,255, 0.04)` | 16px |
| Content | `.glass-content` | Cards, links | `linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.10))` | 16px + saturate(1.5) |
| Modal | `.glass-modal` | Overlays, detail views | `rgba(255,255,255, 0.07)` | 30px + saturate(1.3) |
| Chrome | `.glass-chrome` | Nav, toolbars | `rgba(255,255,255, 0.04)` | 20px + saturate(1.1) |
| Input | `.glass-input-field` | Form fields | `rgba(255,255,255, 0.05)` | 12px |
| Button | `.glass-btn` | Interactive elements | `rgba(255,255,255, 0.12)` | 12px |

### 6.2 Color Palette

```
Primary Dark:    #0F172A (Slate-900)
Accent Cyan:     #06B6D4 (nexus-cyan) — SAFe methodology
Accent Violet:   #8B5CF6 (nexus-violet) — PMBOK methodology
Accent Emerald:  emerald-400 — Agile methodology
Background:      bg-black/65 overlay on background image
Text Primary:    text-white/90
Text Secondary:  text-white/60
Text Muted:      text-white/30
```

### 6.3 Responsive Breakpoints

```
xs:    475px  (custom — small mobile)
sm:    640px  (default Tailwind)
md:    768px
lg:    1024px
xl:    1280px
2xl:   1536px
```

### 6.4 Accessibility

| Feature | Implementation |
|---------|---------------|
| Skip Links | `.skip-link` class with sr-only + focus states |
| Focus Indicators | `:focus-visible` outline (cyan/60) |
| Reduced Motion | `prefers-reduced-motion` disables all animations |
| Reduced Transparency | `prefers-reduced-transparency` removes backdrop-filter |
| Forced Colors | Windows High Contrast mode support |
| Touch Targets | Minimum 44x44px on interactive elements |
| ARIA | Roles, labels, and states on interactive components |
| Safe Areas | `env(safe-area-inset-*)` for notched devices |

---

## 7. Build & Deployment

### 7.1 Build Process

```bash
npm run build
# → next build
# → Generates /out directory with static HTML/JS/CSS
# → 31 pages generated (including dynamic [slug] routes)
# → All blueprint slugs pre-rendered via generateStaticParams()
```

**Build Output:**

| Route | Size |
|-------|------|
| `/` (landing) | 175 B |
| `/blueprints` | 3.5 kB |
| `/blueprints/[slug]` (×12) | 5.02 kB each |
| `/blueprints/[slug]/run` (×12) | 7.92 kB each |
| `/pricing` | 4.71 kB |
| `/prompts` | 592 kB |
| Shared JS | 87.5 kB |

### 7.2 Static Params Generation

Dynamic routes use `generateStaticParams()` to pre-render all blueprint pages:

```typescript
// app/blueprints/[slug]/page.tsx
export function generateStaticParams() {
  return allBlueprints.map((bp) => ({ slug: bp.slug }));
}
```

This generates 12 detail pages and 12 run pages at build time.

### 7.3 Deployment Targets

| Platform | Configuration | Notes |
|----------|--------------|-------|
| Vercel | Zero config (Next.js native) | Recommended; automatic static export detection |
| GitHub Pages | Copy `/out` to `gh-pages` branch | Add `.nojekyll` file |
| AWS S3 + CloudFront | Upload `/out` to S3 bucket | Enable static website hosting |
| Netlify | Set build command and publish directory | Works with static exports |

### 7.4 PWA Configuration

- **manifest.json:** App name, icons (8 sizes), display: standalone, orientation: portrait
- **Service Worker:** Registered via `PWARegister` component
- **Install Banner:** Appears after 3-second delay if app isn't installed; dismissible (localStorage)
- **Offline Support:** Static export is fully cacheable by service worker

---

## 8. Testing

### 8.1 Test Infrastructure

```bash
npm test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

**Configuration:**
- Framework: Jest 30.2.0 with jsdom environment
- React Testing: @testing-library/react 16.3.2
- Coverage Scope: `lib/**`, `hooks/**`, `app/components/**`
- Module Aliases: `@/` mapped to project root

### 8.2 Test Strategy

| Layer | What to Test | Tools |
|-------|-------------|-------|
| **Unit** | Hooks (favorites, progress, access), utilities (cn, export) | Jest + RTL |
| **Component** | Card rendering, modal interactions, form validation | Jest + RTL |
| **Integration** | Blueprint wizard flow, payment return handling | Jest + RTL |
| **E2E** (future) | Full user journeys, cross-page navigation | Playwright/Cypress |

---

## 9. Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_PAYFAST_MERCHANT_ID` | Yes (prod) | Test: 10000100 | PayFast merchant identifier |
| `NEXT_PUBLIC_PAYFAST_MERCHANT_KEY` | Yes (prod) | Test: 46f0cd694581a | PayFast API key |
| `NEXT_PUBLIC_PAYFAST_SANDBOX` | No | 'true' | Toggle sandbox/production |
| `NEXT_PUBLIC_SITE_URL` | No | 'https://elitepmprompts.com' | Base URL for return URLs |
| `NEXT_PUBLIC_MAILCHIMP_URL` | No | — | Mailchimp form action URL |

---

## 10. Security Considerations

### 10.1 Current Security Model

| Aspect | Implementation | Risk Level |
|--------|---------------|------------|
| **Authentication** | None (localStorage-based purchase records) | Medium — purchases can be spoofed via localStorage manipulation |
| **Payment Verification** | Client-side URL param detection | Medium — no server-side ITN verification |
| **Content Protection** | Blueprint content embedded in JS bundles | Low — determined users can extract from bundle |
| **XSS Prevention** | React's built-in escaping; no dangerouslySetInnerHTML on user input | Low |
| **CSRF** | N/A (no API routes, no forms posting to own server) | None |

### 10.2 Recommended Security Improvements

1. **PayFast ITN (Instant Transaction Notification):** Add server-side webhook to verify payments independently of client-side redirect
2. **Purchase Verification API:** Lightweight serverless function to validate purchase tokens
3. **Content Encryption:** Encrypt premium blueprint content and decrypt only with valid purchase token
4. **Rate Limiting:** If adding API routes, implement rate limiting on payment endpoints

---

## 11. Performance Profile

### 11.1 Optimization Features

| Feature | Implementation |
|---------|---------------|
| Static Generation | All pages pre-rendered at build time |
| Code Splitting | Next.js automatic per-route splitting |
| Font Loading | `next/font/google` with Inter — prevents FOIT/FOUT |
| Image Handling | Static images in `/public` — no runtime processing |
| CSS | Tailwind purges unused styles at build time |
| Bundle Size | Shared JS: 87.5 kB (gzipped ~30 kB) |
| Caching | Static assets fully cacheable with long TTL headers |
| PWA Caching | Service worker caches all static assets for offline use |

### 11.2 Largest Bundle

The `/prompts` page at 592 kB is the largest due to the 50+ embedded prompt definitions. Consider lazy-loading or paginating if this grows significantly.
