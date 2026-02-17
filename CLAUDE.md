# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

La Tavola is an Angular 21 restaurant web application (Italian cuisine, Spanish-language UI) that connects to a Java/Spring Boot backend at `http://localhost:8080`.

## Commands

- **Dev server:** `ng serve` (or `npm start`)
- **Build:** `ng build` (production) / `ng build --watch --configuration development`
- **Test:** `ng test` (uses Vitest, not Karma)

## Architecture

**Standalone components only** — no NgModules. All components use `standalone: true`.

**Routing** (`app.routes.ts`): Eager-loaded routes — `home`, `menu`, `reservas`, `nosotros`, `contacto`, `login`. Wildcard redirects to `home`.

**Layout:** Root `AppComponent` hosts a sticky `<app-header>`, `<router-outlet>`, and an inline chat widget. Footer HTML is duplicated in each page template (not a shared component).

### Feature Components (`features/`)

| Component | Route | Key behavior |
|---|---|---|
| `HomeComponent` | `/home` | Static hero + CTA links |
| `MenuComponent` | `/menu` | Fetches dishes via `MenuService`, adds to cart via `CartService` |
| `ReservationsComponent` | `/reservas` | Template-driven reservation form + cart sidebar, posts via `ReservaService` |
| `AboutComponent` | `/nosotros` | Static content |
| `ContactComponent` | `/contacto` | Static content + Google Maps iframe |
| `LoginComponent` | `/login` | Simulated login (alert-only, no real auth) |

### Services (`core/services/`)

- **`MenuService`** — `GET /api/platos`, returns `Observable<Plato[]>` (`Plato` interface defined inline)
- **`CartService`** — Client-side cart state via `BehaviorSubject<Plato[]>`, no HTTP
- **`ReservaService`** — `POST /api/reservas` with `ReservaDTO`
- **`BookingService`** — Dead code, unused duplicate of `ReservaService`

All services are `providedIn: 'root'`.

### Shared

- **`HeaderComponent`** (`shared/header/`) — Sticky nav with `RouterLink`, displays cart item count badge from `CartService.cart$`

## Styling

Custom CSS only (no framework). Component-scoped CSS files. Google Fonts: `Playfair Display` (headings) and `Lato` (body). Color palette: olive green `#4E5F2B`, terracotta `#d35400`, cream `#F9F9F7`. Responsive breakpoints at 768px and 600px.

## Backend Dependency

Requires a Java/Spring Boot backend on `localhost:8080` with endpoints:
- `GET /api/platos` — dish catalog
- `POST /api/reservas` — reservation submission

## TypeScript / Config

Strict mode enabled (`strict: true`, `strictTemplates`, `strictInjectionParameters`). Uses Vite-based `@angular/build:application` builder. Prettier configured in `package.json` (100 char width, single quotes).

## Forms

Template-driven forms (`FormsModule` / `ngModel`) used in reservations and login — not Reactive Forms.
