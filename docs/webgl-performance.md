# WebGL / React Three Fiber — homepage performance

## Target

- **No WebGL on first paint** for the homepage hero: the starfield mounts only after `requestIdleCallback` (or ~500ms fallback), and only on **viewport ≥ md** with **`prefers-reduced-motion: no-preference`** (`HomeHero.jsx`).
- **3D code is code-split**: `@react-three/fiber` and `three` load in the async chunk for `ClientStars`, not in the hero’s initial JS path (`next/dynamic` + `ssr: false`).

## Verification (paste into PR / ticket)

**Bundle (local)**

```bash
npm run build
```

Note the production build success and, if you use a bundle analyzer plugin, the chunk that contains `ClientStars` / `three` vs the main `/` entry.

**Quick chunk check (optional)**

```bash
ls -la .next/static/chunks | head
# After a change, compare total size or grep built artifacts for "ClientStars"
```

**LCP / INP**

- Run **Lighthouse** (mobile, throttled) on `/` before and after changes; record **LCP** and **INP** (or “Total Blocking Time” as a proxy in lab).
- In production, use **Vercel Speed Insights** (already in the app) for field **INP** and related Web Vitals.

## Implementation notes

- `Suspense` boundaries wrap the lazy starfield so async R3F / asset work has a defined fallback (`null` — background only).
- Do not import `ClientStars`, `Canvas`, or `three` from above-the-fold server components without `dynamic(..., { ssr: false })`.
