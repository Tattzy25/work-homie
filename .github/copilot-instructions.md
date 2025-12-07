# Bridgit AI - Workshop Repository - Copilot Instructions

## Repository Overview

**Project Name:** Bridgit AI Workshop  
**Type:** Next.js 15 web application with React 19  
**Purpose:** Custom SHADCN UI component registry and showcase with AI-powered search capabilities and dashboard widgets  
**Size:** ~15K lines of code (excluding dependencies), 1.7MB source  
**Runtime:** Node.js v20.19.6, npm 10.8.2

This is a Next.js application showcasing reusable UI components built with SHADCN UI library and Radix UI primitives. It includes a dashboard, component showroom, search functionality powered by Upstash, and various AI-related UI elements.

## Tech Stack

- **Framework:** Next.js 15.5.6 with App Router and Turbopack
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS v4, tw-animate-css
- **UI Components:** SHADCN UI (shadcn/ui) with Radix UI primitives
- **Icons:** Lucide React, Tabler Icons
- **State Management:** React hooks (no external state library)
- **Search:** Upstash Search (@upstash/search v0.1.7)
- **Forms:** React Hook Form with Zod validation
- **Charts:** Recharts
- **Additional:** React Flow (@xyflow/react), DnD Kit, Next Themes

## Project Structure

```
/app                    # Next.js App Router pages
  /api                  # API routes
    /components         # Component catalog API
    /search             # Search API (⚠️ has known build error)
    /upstash            # Upstash index management APIs
  /dashboard            # Main dashboard page with charts and tables
  /embedded             # Embedded view page
  /indexed              # Indexed components page
  /metadata             # Metadata page
  /showroom             # Component showroom page
  /testshop             # Test shop page
  /workflow             # Workflow page
  /workshop             # Workshop page
  globals.css           # Global styles with Tailwind v4 imports
  layout.tsx            # Root layout with theme provider
  page.tsx              # Home page (emoji button linking to dashboard)

/components             # React components
  /ai-elements          # AI-related UI components (30+ components)
  /ui                   # SHADCN UI components (50+ components)
  app-sidebar.tsx       # Application sidebar
  site-header.tsx       # Site header
  theme-provider.tsx    # Theme provider wrapper
  [other components]    # Specialized components

/hooks                  # Custom React hooks
  use-mobile.ts         # Mobile detection hook

/lib                    # Utility libraries
  /search               # Upstash search implementations
    components-search.ts   # Component search index
    dashboard-metrics.ts   # Dashboard metrics
  upstash-config.ts     # Upstash configuration
  utils.ts              # Utility functions (cn helper)

/public                 # Static assets
  /data                 # JSON data files
  *.svg                 # Icon files

Configuration files:
- components.json       # SHADCN UI configuration
- tsconfig.json         # TypeScript configuration
- next.config.ts        # Next.js configuration (minimal)
- eslint.config.mjs     # ESLint configuration
- .stylelintrc.json     # Stylelint configuration
- postcss.config.mjs    # PostCSS configuration
- package.json          # Dependencies and scripts
```

## Critical Project Constraints

**⚠️ IMPORTANT - UI Component Rules:**
- **ONLY USE SHADCN COMPONENTS** - This is a custom SHADCN UI component registry
- **NO CUSTOM HTML COMPONENTS** - Do not create custom div-based components
- **NO UNAPPROVED COMPONENTS** - All UI must use existing components from `/components/ui`
- If you need a component not in `/components/ui`, use the SHADCN CLI to add it
- All components use Radix UI primitives wrapped with SHADCN styling conventions

## Build, Test, and Development Commands

### Prerequisites
- Node.js v20.19.6 or compatible
- npm 10.8.2 or compatible
- No lock file preference (package-lock.json is gitignored but generated)

### Environment Setup
```bash
# Optional environment variables (stored in .env.local, not committed):
UPSTASH_SEARCH_REST_URL=<your-upstash-url>
UPSTASH_SEARCH_REST_TOKEN=<your-upstash-token>
```

### Dependency Installation
```bash
# ALWAYS run npm install after cloning or pulling changes
npm install
# Takes ~40-50 seconds, installs 552+ packages
# Expect security warnings about deprecated packages (node-domexception)
# Note: Next.js 15.5.6 has a known security vulnerability (CVE-2025-66478)
```

### Development Server
```bash
# Start development server with Turbopack (fast refresh enabled)
npm run dev
# Server starts on http://localhost:3000 in ~1 second
# Hot reload works automatically for all file changes
# No need to restart server for most changes
```

### Linting
```bash
# Run ESLint on the codebase
npm run lint
# Passes with 27 warnings (unused imports, img tags, etc.)
# Warnings are acceptable and don't block builds
# ESLint config: eslint.config.mjs (extends next/core-web-vitals, next/typescript)
# Ignores: node_modules, .next, out, build, next-env.d.ts
```

### Building for Production
```bash
# Clean build (optional but recommended)
rm -rf .next

# Build with Turbopack
npm run build
# ⚠️ KNOWN ISSUE: Build currently FAILS with type error
# Error location: ./app/api/search/route.ts:12:42
# Error: Property 'query' does not exist on type 'SearchIndex<ComponentContent, ComponentMetadata>'
# Root cause: componentIndex.query() should be componentIndex.search()
# The @upstash/search API uses .search() method, not .query()
# Build takes ~7-8 seconds before failing at type check
# Linting passes with warnings before type checking

# WORKAROUND: To fix the build error, change in app/api/search/route.ts:
# Line 12: const results = await componentIndex.query({ query, topK: 20 })
# To: const results = await componentIndex.search({ query, limit: 20 })
# Note: The method name changes from .query() to .search()
# And the parameter changes from topK to limit
# See lib/search/components-search.ts for correct search API usage examples
```

### Production Server
```bash
# After successful build, start production server
npm start
# Serves the built application on http://localhost:3000
# Note: Cannot test this currently due to build error
```

### Testing
**No test framework is configured in this project.**  
There are no test files, no test scripts, and no testing dependencies (Jest, Vitest, Playwright, Cypress, etc.). If you need to add tests, you'll need to set up the testing infrastructure first.

## Known Issues and Workarounds

### 1. Build Failure - Type Error in Search API
**Issue:** `npm run build` fails at type checking with error in `app/api/search/route.ts`  
**Error Message:** `Property 'query' does not exist on type 'SearchIndex<ComponentContent, ComponentMetadata>'`  
**Location:** `./app/api/search/route.ts:12:42`  
**Root Cause:** The Upstash Search API doesn't have a `.query()` method; it uses `.search()` instead  
**Fix:** Replace `componentIndex.query({ query, topK: 20 })` with `componentIndex.search({ query, limit: 20 })`  
**Reference:** See `lib/search/components-search.ts` for correct search method usage examples

### 2. Security Vulnerabilities
**Issue:** npm install reports 1 critical severity vulnerability  
**Package:** Next.js 15.5.6 has CVE-2025-66478  
**Recommendation:** Upgrade to a patched Next.js version when available  
**Impact:** Low for development; assess before production deployment

### 3. Lint Warnings
The codebase has 27 ESLint warnings that are non-blocking:
- Unused imports/variables (safe to ignore or clean up)
- `<img>` tags instead of `next/image` (performance suggestion)
- React hooks dependency warnings (functional but could be optimized)

## Architecture and Conventions

### Path Aliases
The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to project root
- `@/components` for components
- `@/lib` for utilities
- `@/hooks` for custom hooks
- `@/app` for app router pages

### Styling Conventions
- Uses Tailwind CSS v4 with custom theme in `app/globals.css`
- Custom fonts: "Roboto Condensed" (sans-serif), "Nova Mono" (monospace)
- Dark mode support via `next-themes` with system preference detection
- CSS custom properties for theming (colors, radius, spacing)
- Utility function `cn()` in `lib/utils.ts` for className merging (clsx + tailwind-merge)

### Component Conventions
- All UI components in `/components/ui` follow SHADCN naming and structure
- AI-specific elements in `/components/ai-elements`
- Components use Radix UI primitives with custom styling
- Form components integrate with React Hook Form and Zod
- Theme-aware components use CSS variables, not direct color values

### API Route Conventions
- API routes in `/app/api/` follow Next.js App Router conventions
- Use `export async function GET/POST/etc(request: NextRequest)`
- Return `Response.json()` for JSON responses
- Upstash API interactions in `/app/api/upstash/`
- Search functionality in `/app/api/search/` and `/app/api/components/`

### Data Flow
- Upstash configuration in `lib/upstash-config.ts` reads from environment variables
- Search index initialization in `lib/search/components-search.ts`
- JSON data catalogs in `public/data/`
- No global state management; uses React hooks and server components

## CI/CD and Validation

**No CI/CD pipelines are configured.**  
There are no GitHub Actions workflows, no `.github/workflows/` directory. All validation must be done locally:
1. Run `npm install` to ensure dependencies are correct
2. Run `npm run lint` to check for code quality issues
3. Run `npm run build` to verify TypeScript types and build success
4. Run `npm run dev` to test in development mode

## Quick Reference

### File Locations
- **Main entry:** `app/page.tsx` (home page with emoji button)
- **Dashboard:** `app/dashboard/page.tsx`
- **Root layout:** `app/layout.tsx`
- **Global styles:** `app/globals.css`
- **Config files:** Root directory (next.config.ts, tsconfig.json, etc.)
- **UI components:** `components/ui/` (50+ SHADCN components)
- **AI components:** `components/ai-elements/` (30+ specialized components)
- **Utilities:** `lib/utils.ts` (cn function)
- **Search logic:** `lib/search/components-search.ts`

### Common Tasks

**Adding a new SHADCN component:**
```bash
# Use the SHADCN CLI (if installed) or manually copy from shadcn/ui
npx shadcn@latest add [component-name]
# This adds the component to components/ui/
```

**Creating a new page:**
```bash
# Create a new directory in app/ with a page.tsx file
mkdir -p app/mypage
touch app/mypage/page.tsx
# Use the AppSidebar and SiteHeader layout pattern from other pages
```

**Adding an API route:**
```bash
# Create route.ts in app/api/[route-name]/
mkdir -p app/api/myroute
touch app/api/myroute/route.ts
# Export GET, POST, etc. as async functions
```

**Modifying search functionality:**
- Edit `lib/search/components-search.ts` for search logic
- Edit `app/api/search/route.ts` for search API endpoint (fix the build error first!)
- Reference Upstash Search SDK docs for API methods

### Important Files to Review Before Changes

1. `components.json` - SHADCN configuration (style: "new-york", rsc: true, aliases)
2. `tsconfig.json` - Path aliases and TypeScript settings
3. `app/globals.css` - Theme variables and Tailwind config
4. `lib/search/components-search.ts` - Search API examples
5. `eslint.config.mjs` - Linting rules and ignores
6. `package.json` - Dependencies and npm scripts

## Trust These Instructions

When working in this repository:
1. **Always run `npm install` first** if node_modules is missing
2. **Use the SHADCN UI components** exclusively for UI elements
3. **Check `lib/search/components-search.ts`** for correct Upstash Search API usage
4. **Run `npm run lint`** to catch issues early (27 warnings are normal)
5. **Be aware of the build error** in `app/api/search/route.ts` - fix it if you touch that file
6. **No tests exist** - you don't need to run tests or add tests unless specifically asked
7. **No CI/CD exists** - validate locally with lint and build commands
8. **Use path aliases** (`@/components`, `@/lib`, etc.) for imports
9. **Follow the existing patterns** in similar files (e.g., other pages for new pages)
10. **Do not search extensively** - refer to this document first, then explore specific files

This document provides all the essential information to work efficiently in this codebase. Only perform additional searches if the information you need is not covered here.