# Design Tokens

Source of truth: `reports/theme-audit/theme-extraction.before.json` (Founder’s Letter primary, Why Utah secondary).

## Tokens

- color.bg-base → `#0D0D0D`
- color.bg-elevated → `#111827`
- color.text-primary → `#F2F2F2`
- color.text-muted → `#D1D5DB`
- color.border → `#1F2937`
- color.border-strong → `#333333`
- color.accent-1 → `#F97316`
- color.accent-2 → `#FB923C`
- color.link → `#F2F2F2`
- gradient: from `#000000`, via `#111827`, to `#7C2D12`

Fonts:
- font.family-base: Inter, "Inter Fallback"
- weights: 400, 500, 700, 800
- sizes: base 16px, lg 20px, xl 24px, 2xl 30px, 5xl 60px, 7xl 72px

Radii: 8px, 12px, 16px

## CSS Variables

Provided in `src/styles/_design-tokens.css` and imported from `app/globals.css`.

Common mappings:
- Tailwind `background` → `hsl(var(--background))` (maps to color.bg-base)
- Tailwind `foreground` → `hsl(var(--foreground))` (maps to color.text-primary)
- Tailwind `primary` → `hsl(var(--primary))` (maps to color.accent-1)
- Tailwind `border` → `hsl(var(--border))`

## Usage

- Prefer Tailwind semantic utilities: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`, `bg-primary`, `text-primary`.
- For gradients: `bg-gradient-to-br from-[var(--gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]`.
- In CSS: `color: var(--color-text-primary); background: var(--color-bg-base);`.

## Accessibility

- Primary foreground set to black for WCAG AA on accent surfaces.
- Contrast report: `reports/theme-audit/accessibility-contrast.json`.

## Migration map

See `reports/theme-audit/migration-map.json` for file-level replacements.
