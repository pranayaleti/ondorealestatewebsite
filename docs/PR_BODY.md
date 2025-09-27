## feat(theme): unify app theme to Founder’s Letter / Why Utah — tokens, tailwind, accessibility fixes

### Summary
- Unified theme across app using tokens sourced from Founder’s Letter (primary) and Why Utah (secondary).
- Replaced hexes and utility colors with semantic tokens and Tailwind mappings.
- Ensured WCAG AA contrast for primary flows; adjusted primary foreground to black on accent surfaces.

### Artifacts
- Theme extraction (before): `reports/theme-audit/theme-extraction.before.json`
- Theme extraction (after): `reports/theme-audit/theme-extraction.after.json`
- Accessibility report: `reports/theme-audit/accessibility-contrast.json`
- Visual diffs: `reports/theme-audit/diff/*.png`, summary `reports/theme-audit/visual-diff-summary.json`

### Implementation
- Tokens: `src/styles/design-tokens.json` and `src/styles/_design-tokens.css` (imported in `app/globals.css`).
- Tailwind config wired to CSS variables, semantic utilities used across components.
- Codemods:
  - `scripts/codemod-tokens.mjs`
  - `scripts/codemod-tailwind-classes.mjs`

### Migration
- Map: `reports/theme-audit/migration-map.json`
- Guide: `docs/DESIGN_TOKENS.md`

### Rollback
- Revert branch `theme/unify-founders-letter` or revert commits touching:
  - `app/globals.css`, `tailwind.config.ts`, `src/styles/*`, `scripts/*`
