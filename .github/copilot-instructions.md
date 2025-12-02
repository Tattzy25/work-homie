## Quick context (what this project is)

Bridgit AI is a Next.js (app-router) TypeScript + Tailwind UI dashboard and component playground.
It uses the App Router and a mix of server components and client components (many UI components include a "use client" directive).

Core areas an AI agent should know immediately:

- app/ — top-level app router pages (server components) and route handlers
- components/ — UI building blocks are split into `components/ui/` (shadcn-style UI primitives) and `components/ai-elements/` (interactive AI UIs)
- lib/search/ — Upstash-based search index, plus a seed script at `lib/search/seed.ts`
- public/data/ — static component catalogs (e.g. `components-catalog.json` and `widget-bridgit.json`)
- app/api/search/components — a server route powered by `lib/search/components-search.ts`

Important developer commands (from `package.json`):

- pnpm dev — run local dev server (Next.js with turbopack: `next dev --turbopack`).
- pnpm build — builds with turbopack (`next build --turbopack`).
- pnpm start — production serve (`next start`).
- pnpm lint — runs ESLint.

Environment & integrations to be aware of

- Upstash Search is used for component search. See `lib/search/components-search.ts`.
  Required env vars (check `.env.example`):
  - NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL
  - UPSTASH_SEARCH_REST_TOKEN
  - UPSTASH_SEARCH_REST_READONLY_TOKEN (readonly token exists in repo `.env` — treat as secret)

- GROQ_API_KEY appears in `.env` and `.env.example` (Sanity/GROQ SDK is installed). The app also supports multiple model/provider options via the UI (see `components/ai-elements/model-selector.tsx`).

Key patterns & conventions (concrete, discoverable)

- File/Export naming: UI primitives live in `components/ui/` and export PascalCase components (e.g. `components/ui/button.tsx` -> `Button`). Look at `lib/search/seed.ts` for how metadata expects `file` and `exports` fields.
- Client vs server components: Many components in `components/ai-elements/` and `components/ui/` start with `"use client"` — handle hydration boundaries and event handlers accordingly.
- Search/AI flow: frontend calls `GET /api/search/components?q=...` which routes to `app/api/search/components/route.ts` and then into `lib/search/components-search.ts` (reranking / semantic / full-text modes).
- Public data is authoritative for the catalog: `public/data/components-catalog.json` and `public/data/widget-bridgit.json` are used as sample data / seeds and should be kept in sync with component metadata.

Notes for AI coding agents (concrete instructions)

- If making fixes or features, prefer editing the files in `components/` and `lib/` and add/update matching entries in `public/data/` and `lib/search/seed.ts` so the local seed & UI remain consistent.
- When adding a new component, make sure the `file` path and `exports` match (e.g. `/components/ui/mycomp.tsx` and exported symbol `MyComp`) and add metadata to `public/data` and the `seed.ts` catalog if search-updates are needed.
- For search or model work, use the `lib/search/*` helpers — they rely on env vars and `@upstash/search`.

Minimal runnable notes (what I found in the repo):

- No explicit seed script is declared in package.json — `lib/search/seed.ts` contains a `seedComponents()` function and can be executed with a TS runtime (ts-node) or compiled to run with node. The seed expects the Upstash env vars.
- No test scripts were found in package.json. There are testing-related deps in the lockfile (e.g. Playwright) but no formal test runner configured in package.json.

Do not assume anything not in source control: call out missing steps (seed execution, test runner) in PR descriptions and add small developer scripts where appropriate.

If you'd like I can merge this into a different place, add an explicit `pnpm seed` script, or expand these guidelines into a fuller AGENT.md describing how to run environment-specific tasks locally (example: how to run the seed with ts-node). Please tell me which you prefer.
