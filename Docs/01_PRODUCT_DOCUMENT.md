# ElitePMPrompts — Product Document

**Version:** 1.0
**Date:** February 2026
**Product URL:** https://elitepmprompts.com

---

## 1. Product Overview

ElitePMPrompts (The Project Manager's Nexus) is a B2B SaaS-style web application that provides enterprise project managers with **agentic AI workflow blueprints** — multi-step, methodology-compliant prompt sequences that produce complete PM artifacts in 60-90 minutes instead of days.

The platform serves as a bridge between enterprise PM frameworks (SAFe, PMBOK, Agile) and modern Large Language Models (Claude, ChatGPT, Gemini), giving PMs structured, repeatable workflows that output production-ready deliverables.

### Value Proposition

> "Multi-step AI workflows that produce complete, methodology-compliant artifacts in 60 minutes instead of days."

**Before ElitePMPrompts:** A Release Train Engineer spends 2-3 days preparing PI Planning artifacts manually — spreadsheets, slide decks, risk registers, dependency maps.

**After ElitePMPrompts:** The same RTE runs the PI Planning Copilot blueprint through any AI model and produces 16 complete, SAFe 6.0-compliant artifacts in under 90 minutes.

---

## 2. Product Architecture

### 2.1 Two-Tier Product Model

| Tier | Description | Access | Price |
|------|-------------|--------|-------|
| **Free Prompt Library** | 50+ individual PM prompts across 12 frameworks | Email-gated | $0 |
| **Premium Blueprints** | 12 multi-step agentic workflows organized into 3 methodology suites | Purchase-gated | $297-$897 |

### 2.2 Free Prompt Library (50+ Prompts)

The free tier serves as a lead-generation and trust-building tool. It includes:

- **50+ prompts** spanning 12 PM frameworks
- **Variable substitution** — prompts use `{{variable}}` placeholders that users fill in
- **Framework coverage:** PMBOK, Agile, Scrum, Kanban, SAFe, Lean, Scrumban, PRINCE2, Six Sigma, COBIT, ITIL, Hybrid
- **5 canonical phases** per framework (mapped to: Initiating → Planning → Executing → Monitoring → Closing)
- **Export formats:** Excel, Markdown, JSON, Interactive HTML
- **Features:** Fuzzy search (Fuse.js), framework filtering, phase filtering, favorites, recently viewed, analytics tracking

**Gating:** Users must provide their email (Mailchimp integration) to access the library.

### 2.3 Premium Blueprint System (12 Blueprints)

Each blueprint is a **complete, multi-step agentic workflow** containing:

| Component | Description |
|-----------|-------------|
| **Steps** | 4-8 sequential prompts, each building on the previous step's output |
| **Required Inputs** | Context the user must provide upfront (e.g., team roster, backlog, velocity data) |
| **Checkpoint Gates** | Quality verification checklists between steps — all items must pass before proceeding |
| **Artifact Templates** | Structured output specifications (tables, matrices, lists, text) with column definitions |
| **Expected Outputs** | Description of what each step should produce |
| **Estimated Time** | Per-step and total time estimates |

**Interactive Wizard:** Purchased blueprints include a step-by-step wizard interface that:
- Collects required inputs before starting
- Shows one step at a time with the full prompt
- Substitutes user inputs into prompt variables
- Displays checkpoint gates between steps
- Tracks progress (persisted to localStorage)
- Allows downloading the complete blueprint pack (Markdown + Claude Projects setup)

---

## 3. Blueprint Catalog

### 3.1 SAFe 6.0 Methodology Suite

| Blueprint | Steps | Time | Artifacts |
|-----------|-------|------|-----------|
| **PI Planning Copilot** | 8 | 80-95 min | 16 artifacts (Capacity Matrix, Feature Breakdown, Dependency Register, Program Board, ROAM Risk Register, Confidence Vote, PI Planning Pack) |
| **Inspect & Adapt Engine** | 5 | 45-60 min | 10 artifacts (PI Metrics, Velocity Trends, Root Cause Analysis, Problem-Solution Matrix, Improvement Backlog) |
| **ART Sync Orchestrator** | 4 | 30-45 min | 4 artifacts (Dependency Status Board, Impediment Register, PI Objectives Dashboard, Escalation Brief) |
| **Portfolio Kanban Builder** | 5 | 45-60 min | 8 artifacts (Epic Hypothesis Canvas, Lean Business Cases, Kanban Board, WIP Limits, Strategic Theme Alignment) |

**Suite Total:** 22 steps, ~200-260 minutes, 38 artifacts
**Individual Price:** $297 per blueprint
**Suite Price:** $697 (save $491)

### 3.2 Agile & Scrum Methodology Suite

| Blueprint | Steps | Time | Artifacts |
|-----------|-------|------|-----------|
| **Sprint Planning & Refinement Copilot** | 6 | 60-75 min | 11 artifacts (Prioritized Backlog, Capacity Matrix, Sprint Goal Canvas, Task Breakdown, Commitment Vote) |
| **Sprint Review & Retrospective Engine** | 5 | 50-65 min | 12 artifacts (Delivery Matrix, Velocity Report, Stakeholder Feedback Register, Retrospective Board, Sprint Health Dashboard) |
| **Release Planning & Roadmap Builder** | 5 | 60-75 min | 14 artifacts (Feature Matrix, Release Timeline, Burnup Projection, Dependency Map, Communication Calendar) |
| **Kanban Flow Optimizer** | 5 | 45-60 min | 9 artifacts (Flow Metrics Dashboard, CFD Analysis, Bottleneck Matrix, WIP Recommendations, SLE Matrix) |

**Suite Total:** 21 steps, ~215-275 minutes, 46 artifacts
**Individual Price:** $297 per blueprint
**Suite Price:** $797 (save $391)

### 3.3 PMBOK 7th Edition Methodology Suite

| Blueprint | Steps | Time | Artifacts |
|-----------|-------|------|-----------|
| **Project Initiation & Planning Copilot** | 7 | 75-90 min | 22 artifacts (Project Charter, Stakeholder Register, WBS, Critical Path, Risk Register, PMP) |
| **Execution & Monitoring Copilot** | 5 | 60-75 min | 14 artifacts (EVM Dashboard, Status Report, Change Request Register, Corrective Action Register) |
| **Risk & Procurement Manager** | 5 | 60-75 min | 18 artifacts (Monte Carlo Inputs, EMV Analysis, Make-or-Buy Matrix, Vendor Scorecard, Procurement Plan) |
| **Closure & Lessons Learned** | 5 | 45-60 min | 14 artifacts (Deliverable Acceptance Matrix, Final EVM, Lessons Learned Register, Closure Report) |

**Suite Total:** 22 steps, ~240-300 minutes, 68 artifacts
**Individual Price:** $297 per blueprint
**Suite Price:** $897 (save $291)

### 3.4 Aggregate Product Metrics

| Metric | Value |
|--------|-------|
| Total Blueprints | 12 |
| Total Steps | 65 |
| Total Artifacts Produced | 152 |
| Total Estimated Time (all blueprints) | ~655-835 minutes (~11-14 hours) |
| Average Time per Blueprint | ~55 minutes |
| Methodologies Covered | 3 (SAFe 6.0, Agile/Scrum, PMBOK 7th Ed.) |
| Framework Definitions in Prompt Library | 12 |

---

## 4. User Journeys

### 4.1 Free User Journey

1. Lands on homepage → sees hero + 3 suite showcases
2. Clicks "Explore Blueprints" or "Free Prompt Library"
3. Prompted for email (Mailchimp gate) → enters email
4. Browses 50+ prompts with search, framework filter, phase filter
5. Opens a prompt → fills in variables → copies to AI tool
6. Exports prompts (Excel, Markdown, interactive HTML)
7. Sees upsell banners for premium blueprints

### 4.2 Blueprint Buyer Journey

1. Browses blueprints page → sees 3 suites side by side
2. Clicks into individual blueprint detail page
3. Reviews: steps overview, required inputs, artifacts produced, estimated time
4. Clicks "Buy" → redirected to PayFast checkout
5. Completes payment → redirected back with success params
6. Payment recorded to localStorage
7. Clicks "Run Blueprint" → enters interactive wizard
8. Provides required inputs → works through steps sequentially
9. Passes checkpoint gates → downloads artifact pack

### 4.3 Dev Mode (localhost)

On localhost, all blueprints are automatically unlocked for development/testing purposes. This is handled by the `useBlueprintAccess` hook checking `window.location.hostname`.

---

## 5. Feature Inventory

### 5.1 Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| Blueprint Wizard | Step-by-step interactive executor with checkpoint gates | Live |
| Prompt Library | 50+ free prompts with search, filter, favorites | Live |
| Variable Substitution | Template variables in prompts and blueprints | Live |
| PayFast Checkout | South African payment gateway integration | Live (Sandbox) |
| Blueprint Export | Download Markdown guide + Claude Projects setup | Live |
| Prompt Export | Excel, Markdown, JSON, Interactive HTML exports | Live |
| Email Gate | Mailchimp-integrated email collection for free tier | Live |
| PWA | Installable progressive web app with offline support | Live |
| Analytics | Event tracking for views, copies, exports, favorites | Live |
| Progress Persistence | Blueprint wizard progress saved to localStorage | Live |

### 5.2 UI/UX Features

| Feature | Description |
|---------|-------------|
| Glassmorphism Design | 4-tier glass system (content, modal, chrome, input) with WCAG AA compliance |
| Responsive Layout | Mobile-first with xs/sm/md/lg/xl breakpoints |
| Dark Theme | Slate-900/950 background with circuit-board imagery |
| Methodology Colors | SAFe = cyan (#06B6D4), Agile = emerald-400, PMBOK = violet (#8B5CF6) |
| Animations | Fade-in-up, slide-up, bounce (respects prefers-reduced-motion) |
| Accessibility | Skip links, ARIA roles, focus-visible outlines, forced-colors support, safe-area insets |

---

## 6. Content & Methodology Quality

### 6.1 Framework Alignment

Each blueprint is built to the official methodology standard:

- **SAFe 6.0** — Scaled Agile Framework, aligned to SAFe Implementation Roadmap
- **PMBOK 7th Edition** — PMI's latest principle-based standard with 10 knowledge areas
- **Agile/Scrum** — Scrum Guide 2020, PMI Agile Practice Guide, Kanban Method (David Anderson)

### 6.2 Prompt Engineering Standards

All prompts follow consistent patterns:
- **Role assignment** — "You are a [role] with expertise in [methodology]"
- **Structured output** — Markdown tables, numbered lists, clear headings
- **Variable substitution** — `[variable_name]` or `{{variable}}` patterns
- **Quality gates** — Checkpoint items verify output completeness
- **Fail actions** — Each checkpoint includes guidance for what to do if verification fails

---

## 7. Roadmap Candidates

### Near-Term
- PRINCE2 Methodology Suite (4 blueprints)
- COBIT Governance Suite (4 blueprints)
- Team/enterprise licensing with shared access

### Medium-Term
- AI model API integration (run blueprints directly through Claude/GPT APIs)
- Blueprint output storage and versioning
- Collaboration features (share blueprints with team members)
- Custom blueprint builder

### Long-Term
- Enterprise SSO and role-based access control
- Integration with Jira, Azure DevOps, Confluence
- Blueprint marketplace (community-contributed blueprints)
- AI-powered artifact analysis and recommendations
