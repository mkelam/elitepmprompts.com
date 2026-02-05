# The Project Manager's Nexus

The Ultimate Command Center for Enterprise Project Execution.

## Overview

PM Nexus is a specialized, offline-first AI prompt repository built for enterprise project managers. It provides 50+ framework-aligned prompts covering:

- **Agile** - Sprint planning, retrospectives, velocity tracking
- **Waterfall** - Gantt charts, phase gates, milestone tracking
- **Hybrid** - Mixed methodology approaches
- **Construction** - Safety, compliance, site management
- **ITIL** - Change management, incident response, service catalogs

## Features

- **Offline-First PWA** - Works without internet after initial load
- **Variable Substitution** - Fill in `{{placeholders}}` with your data
- **Export Options** - Excel, JSON, Interactive HTML
- **Favorites & Recent** - Quick access to frequently used prompts
- **Premium Tier** - License key system for monetization

## Tech Stack

- Next.js 14 (App Router, Static Export)
- TypeScript
- Tailwind CSS (Glassmorphism design)
- Fuse.js (Client-side search)
- SheetJS (Excel export)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

Development server runs on `http://localhost:3010`

## Project Structure

```
PM-Nexus/
├── app/                    # Next.js App Router pages
│   ├── components/         # React components
│   │   ├── features/       # Feature components (PromptList, Modal, Search)
│   │   └── ui/             # UI components (GlassCard, GlassButton)
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main application page
├── data/
│   └── pm-prompts.ts       # PM-specific prompt data
├── hooks/                  # Custom React hooks
│   ├── useAnalytics.ts     # Analytics tracking
│   ├── useFavorites.ts     # Favorites management
│   ├── useLicenseKey.ts    # Premium unlock
│   └── useRecentlyViewed.ts # Recent prompts
├── lib/
│   ├── export.ts           # Export functions (Excel, JSON, HTML)
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
│   ├── icons/              # PWA icons
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker
└── __tests__/              # Test files
```

## Deployment

The project builds to a static `out/` directory suitable for any static hosting:

```bash
npm run build
# Upload contents of /out to your hosting provider
```

Tested with Hostinger static hosting.

## License Keys

Default test keys:
- `PMNEXUS-PRO-2024`
- `PMNEXUS-PREMIUM-VIP`
- `ENTERPRISE-UNLOCK-KEY`

## Related Projects

This is a standalone vertical product. See also:
- BizPrompt Vault (generic prompt library)
- Founder's Nexus (startup/VC focused - planned)
- Developer's Nexus (technical/coding focused - planned)
