# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Dum Dost — a marketing/ordering site for a 3-friend biryani side-hustle. Vite + React 19 + TypeScript, no backend. There is no cart/checkout/payment system: "ordering" means building a formatted message and deep-linking to `https://wa.me/<number>` so the customer finishes the order in WhatsApp.

## Commands

**Node version matters.** The installed Vite (v8, rolldown-based) crashes on Node 18 with `SyntaxError: The requested module 'node:util' does not provide an export named 'styleText'`. Use Node 22+ (already available via `nvm` in this environment) for every command below:

```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 22
```

```bash
npm run dev       # start dev server (vite)
npm run build     # tsc -b && vite build — type-checks then bundles
npm run lint      # eslint .
npm run preview   # preview the production build
```

There is no test suite/framework configured in this repo.

To visually verify UI changes, start the dev server per above, then drive it headlessly:

```bash
i=0; until curl -sf http://localhost:5173 >/dev/null 2>&1 || [ $i -ge 30 ]; do sleep 1; i=$((i+1)); done
```

Playwright's browser binaries aren't installed; `playwright-core` + `channel: 'chrome'` (against the system Google Chrome) works instead of downloading Chromium — install `playwright-core` with `--no-save` in a scratch dir rather than adding it to this project's `package.json`.

## Architecture

### Context/hook file-splitting pattern

`eslint-plugin-react-refresh` forbids a file from exporting both a component and a non-component value. Every context in this codebase is therefore split into **three files**, and this pattern should be followed for any new context:

- `xxx-context.ts` — `createContext(...)` call + the `interface XxxContextValue` type only
- `XxxContext.tsx` — the `XxxProvider` component (the only export)
- `useXxx.ts` — the `useXxx()` hook that reads the context and throws if used outside its provider

See `src/theme/` (`theme-context.ts`, `ThemeContext.tsx`, `useTheme.ts`), `src/order/` (`order-context.ts`, `OrderContext.tsx`, `useOrder.ts`), and `src/components/` (`toast-context.ts`, `Toast.tsx`, `useToast.ts`).

`App.tsx` nests the providers: `ThemeProvider > OrderProvider > ToastProvider`, then renders the page sections plus the always-mounted `OrderBar` and `OrderSummaryModal`.

### Order/cart model (`src/order/`)

The cart is **not** keyed by dish ID — each dish has Half/Full portion pricing, so the cart is keyed by a composite **line-item key**: `lineItemKey(dishId, portion)` → `"${dishId}__${portion}"`, decoded with `parseLineItemKey`. `OrderContext`'s `quantities` is `Record<lineItemKey, number>`. Always go through `src/order/lineItem.ts` (`lineItemKey`, `parseLineItemKey`, `portionLabel`, `dishPrice`) rather than assuming a dish ID maps 1:1 to a cart entry — a dish can have both a Half and a Full line item simultaneously.

`OrderContext` also owns the "view full order" modal's open/close state (`summaryOpen`/`openSummary`/`closeSummary`) — there's no separate UI-state store.

`OrderBar` (persistent bottom bar, appears once `totalCount > 0`) and `OrderSummaryModal` (the "card screen" opened from the navbar cart icon or the bar) both read from `useOrder()` and render the same line items independently — keep them in sync when changing the cart shape.

### WhatsApp messaging (`src/lib/whatsapp.ts`)

All "checkout" flows funnel through `buildWhatsAppLink(message)`, which wraps the hardcoded `WHATSAPP_NUMBER` constant. Message builders: `greetingMessage()` (generic), `dishMessage(name)` (single dish, currently unused by the cart flow but kept for direct-order links), `orderSummaryMessage(dishes, quantities)` (itemizes every line item with portion + price + total), `partyOrderMessage()` (group-orders CTA). If you change the cart data shape, `orderSummaryMessage` needs to stay in sync with `parseLineItemKey`/`dishPrice`.

### Theming (`src/theme/`, `src/index.css`)

Light/dark is driven by a `data-theme="light"|"dark"` attribute on `<html>`, set by `ThemeProvider` and persisted to `localStorage` under `dumdost-theme` (falls back to `prefers-color-scheme`). All colors are CSS custom properties defined once on `:root` (light) and overridden under `:root[data-theme='dark']` in `src/index.css` — components should always reference `var(--...)` tokens, never hardcode colors, so both themes stay correct automatically.

### Animation/interaction hooks (`src/hooks/`)

- `useReveal<T>()` — IntersectionObserver-based scroll reveal; attach the returned ref and add class `reveal` (see `src/index.css`) — it flips to `reveal is-visible` once the element enters the viewport, and disconnects after firing once.
- `useRipple()` — returns a click handler that injects a `.ripple-effect` span into the clicked element for a material-style ripple; pair with class `ripple-btn`.
- `useTilt()` — returns `onMouseMove`/`onMouseLeave` handlers that set `--tilt-x`/`--tilt-y` CSS custom properties for a mouse-following 3D tilt; pair with class `tilt-card`.

`BiryaniParticles.tsx` is a `<canvas>`-based ambient background (drifting rice/chili/steam shapes) rendered behind the hero; it respects `prefers-reduced-motion` and resizes on window resize.

### Styling

Plain CSS, no CSS Modules/Tailwind/CSS-in-JS. `src/index.css` holds design tokens (CSS custom properties, light+dark), resets, and shared primitives (`.btn`, `.ripple-btn`, `.reveal`, `.toast`, `.material-symbols-outlined`). `src/App.css` holds every section's layout styles in one file, organized with `/* ---------- Section Name ---------- */` banner comments — search for the banner comment for the section you're editing rather than assuming a 1:1 file-per-component split. Icons are Google's Material Symbols Outlined font (loaded in `index.html`), used as `<span className="material-symbols-outlined">icon_name</span>`.

### Data and assets

`src/data/dishes.ts` is the single source of truth for the 3 menu items (id, name, tagline, description, `priceHalf`/`priceFull`, spice level, image import). Dish photos and the hero banner (`src/assets/*.jpg`) are the business owners' own photos (not stock/online images) — converted from their original PNGs to optimized JPEGs via macOS `sips` (`sips -s format jpeg -s formatOptions 88 in.png --out out.jpg`) to cut file size roughly 75% with no visible quality loss; keep using that approach for any new photo assets rather than shipping raw PNGs.

### TypeScript strictness

`tsconfig.app.json` has `verbatimModuleSyntax: true` (type-only imports must use `import type`), `noUnusedLocals`/`noUnusedParameters: true`, and `erasableSyntaxOnly: true` (no `enum` — use string-literal union types instead, as in `Portion = 'half' | 'full'` in `src/data/dishes.ts`).
