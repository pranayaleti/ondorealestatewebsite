## Accessibility at Ondo Real Estate (OndoREui)

This project aims to meet **WCAG 2.1 AA** for all major user journeys (marketing, contact, feedback, portals, dashboard).

### Core principles

- **Semantic structure**: Single `<main>` per page, meaningful headings (`h1`–`h3`), and native HTML elements for controls (`button`, `a`, form fields).
- **Keyboard-first**: All interactive elements are reachable by `Tab` and operable with keyboard (space/enter or arrow keys where appropriate).
- **Visible focus**: Never remove focus outlines without providing a clearly visible custom style.
- **No color-only cues**: Use icons, text, or patterns in addition to color for state or meaning.

### Global patterns already in place

- `app/layout.tsx`
  - Global `<main id="main-content" role="main">` with a **skip link** at the top of the body.
  - Landmarks via `Header` + `Footer`.
- High-priority pages (e.g. feedback, contact, founder’s letter, accessibility statement) use:
  - `aria-labelledby` on major sections.
  - `role="status"` + `aria-live` for async success/error messages.
  - Decorative icons marked with `aria-hidden="true"`.

### How to develop new UI accessibly

When building or modifying components:

- **Forms**
  - Always use `<label htmlFor>` or `aria-labelledby` for each input/textarea.
  - Use `aria-describedby` to point to help text or error messages.
  - For async validation or submission states, expose updates through a live region (`role="status"` / `aria-live="polite"`).

- **Sections and cards**
  - Wrap logically distinct content in `<section>` and give it an `aria-labelledby` pointing to the section heading.
  - Ensure each page has one `<h1>`; use `h2`/`h3` for sub-sections.

- **Icons and imagery**
  - If an icon is purely decorative, add `aria-hidden="true"`.
  - If an image communicates meaning, prefer a concise, descriptive `alt`. Do not duplicate long adjacent text in `alt`.

- **Custom widgets**
  - For tabs, menus, dialogs, tooltips, and popovers, follow the **WAI‑ARIA Authoring Practices** patterns.
  - Use Radix UI components where possible (already included) to inherit correct roles, keyboard behavior, and aria attributes.

### Tooling and checks

- **Linting**
  - `npm run lint` uses `eslint-plugin-jsx-a11y` plus Next.js presets to catch common accessibility issues in JSX/TSX.

- **Automated audits**
  - `npm run a11y:axe`
    - Runs `@axe-core/cli` against the built output to catch common violations.
  - `npm run test:a11y`
    - Runs Playwright + `@axe-core/playwright` smoke tests for a set of critical routes (marketing pages, feedback, contact, dashboard, tenant/owner/platform entry points).

### Adding a new critical route to a11y tests

To include a new page in automated axe checks:

1. Edit `tests/a11y.spec.ts`.
2. Add the route path (e.g. `"/faq"` or `"/resources"`) to the `routes` array.
3. Run:

```bash
npm run test:a11y
```

If axe reports **serious/critical** issues, address those before shipping.

