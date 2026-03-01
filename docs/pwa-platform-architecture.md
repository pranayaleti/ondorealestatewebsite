# Ondo Real Estate PWA Architecture

This document describes the production-ready PWA baseline added for Ondo Real Estate.

## Folder Structure

```text
app/
  api/push/subscribe/route.ts
  platform/
    layout.tsx
    loading.tsx
    page.tsx
    contact/page.tsx
    properties/
      loading.tsx
      page.tsx
      properties-client-page.tsx
      [id]/
        page.tsx
        property-details-client-page.tsx
    owner/page.tsx
    tenant/page.tsx
    admin/page.tsx
components/
  auth/role-guard.tsx
  pwa/pwa-provider.tsx
hooks/
  use-auth.ts
  use-offline-status.ts
  use-role.ts
lib/
  auth/roles.ts
  api/
    http.ts
    inquiries.ts
    maintenance.ts
    properties.ts
    types.ts
  pwa/
    offline-queue.ts
    push.ts
  routing/platform-routes.ts
public/
  manifest.json
  sw.js
```

## Architecture Notes

- Role architecture supports `public`, `tenant`, `owner`, `admin`.
- `RoleGuard` protects role-specific pages.
- `PwaProvider` registers the service worker and handles queue flush on reconnect.
- API abstraction uses:
  - `networkFirstGet()` for read calls with local cache fallback
  - typed `postJson()` for write calls
- Offline support includes:
  - app shell and static asset caching in `sw.js`
  - last-viewed property persistence in local storage + dedicated SW cache
  - queued submissions in IndexedDB for inquiry + maintenance
- Background Sync tags:
  - `propertyInquiry`
  - `maintenanceRequest`
- Push notification structure:
  - SW `push` + `notificationclick` handlers
  - `subscribeToPushNotifications()` utility
  - `/api/push/subscribe` endpoint scaffold

## Caching Strategy

- Static assets: **Cache First**
- API requests: **Network First** with cached fallback
- Navigation requests: **Network First** with shell fallback

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000/platform
```

## Validate PWA

1. In Chrome DevTools:
   - Application → Manifest
   - Application → Service Workers
   - Application → Storage
2. Test offline mode from Network panel.
3. Verify Background Sync entries in IndexedDB (`ondo-pwa-db`).
4. Run Lighthouse (Progressive Web App + Performance).

## Deploy

1. Production build:

```bash
npm run build
```

2. For static hosting (`next.config.mjs` uses `output: "export"`), deploy generated `out/` directory.
3. Ensure host serves:
   - `manifest.json` with `application/manifest+json`
   - `sw.js` from site root with no aggressive HTML-only rewrites
4. Configure HTTPS (required for service workers, installability, and push).
