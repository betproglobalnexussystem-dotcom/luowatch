# SFlix Movie Platform

A full movie streaming platform built with Angular 18, matching the SFlix (sflix.film) design exactly. Dark theme, hero banner slider, horizontal scrollable movie sections, and full routing.

## Run & Operate

- `pnpm --filter @workspace/sflix run dev` — run the Angular dev server (port 25971)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9 (workspace root), TypeScript 5.5 (sflix app)
- Frontend: **Angular 18** with standalone components, Angular Router, Angular Animations
- Build: @angular-devkit/build-angular (esbuild-based application builder)
- Styling: SCSS inline component styles
- Images: TMDB image CDN (https://image.tmdb.org/t/p/)
- API: Express 5 (separate artifact)
- DB: PostgreSQL + Drizzle ORM

## Where things live

- `artifacts/sflix/` — Angular movie platform app
  - `src/app/components/` — navbar, hero-banner, movie-section, movie-card, footer
  - `src/app/pages/` — home, movies, tv-shows, detail, search, not-found
  - `src/app/services/movie.service.ts` — mock movie data with TMDB image CDN
  - `src/app/models/movie.model.ts` — Movie and MovieSection types
  - `angular.json` — Angular CLI configuration
- `artifacts/api-server/` — Express 5 API server
- `lib/db/` — Drizzle ORM + PostgreSQL schema

## Architecture decisions

- Angular 18 standalone components (no NgModules)
- Angular `@let` template syntax for local variables
- Lazy-loaded routes for optimal bundle splitting
- TMDB image CDN for real movie poster images (no API key required for images)
- Mock data service — no backend API calls needed for the movie platform itself
- Angular signals for reactive state management
- TypeScript 5.5 used locally in the sflix package (declared in sflix/package.json devDeps)

## Product

SFlix is a movie streaming platform UI with:
- Auto-sliding hero banner with 5 featured movies (advances every 6 seconds)
- 6 horizontally scrollable movie sections: Trending, Action, Horror, Hot TV, New Releases, Drama
- Movie detail pages with poster, metadata, similar recommendations
- Movies and TV Shows browse pages with genre filtering
- Search functionality
- Fully responsive (mobile + desktop)

## User preferences

- Framework: Angular (not React) — explicitly required
- Design: Match SFlix (sflix.film) exactly — dark theme #1a1c24, red-orange gradient accent #FF271C→#F5852F

## Gotchas

- Angular TypeScript version (5.5) differs from workspace root (5.9) — declared as devDep in sflix package.json
- `ng serve --disable-host-check` is needed because the Replit proxy routes traffic through a different hostname
- Angular `@let` variable names must not clash with component property names (NG8016 error)
- TMDB images work directly from CDN without an API key (images are publicly accessible)
- Native build scripts (`@parcel/watcher`, `lmdb`) are blocked by pnpm — Angular falls back to polling mode for file watching

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
