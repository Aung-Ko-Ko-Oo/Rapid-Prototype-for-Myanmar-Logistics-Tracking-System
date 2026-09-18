# System Architecture

## Final stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Python + FastAPI
- **Identity/Data:** Supabase Auth + PostgreSQL + Realtime + Storage
- **Routing:** OpenRouteService (ORS)
- **Driver location:** Live browser/device GPS + controlled demo simulator
- **Offline:** IndexedDB action/location/file queue
- **Frontend hosting:** Vercel
- **Backend hosting:** Render (or equivalent FastAPI-compatible service)

## Responsibility boundaries

- **React** owns rendering, role-specific navigation, user interaction, connection/offline status, maps and local queue UX.
- **FastAPI** owns privileged business rules, RBAC enforcement, status transitions, incident aggregation, rerouting audit, route scoring and idempotent sync.
- **Supabase** owns authentication, persistence, realtime subscriptions and private file storage.
- **ORS** supplies candidate route geometry and routing; it is not the logistics source of truth.
- **IndexedDB** keeps Driver operations working during blackouts.

## Authority model

- **Admin:** authoritative manual operational oversight and exception handling.
- **Driver:** field evidence + operational route choice for their assigned shipment.
- **Trader:** shipment request and visibility into their own cargo.
- **System consensus:** routine incidents may auto-confirm/resolve from multiple independent Driver reports; Admin can override.


## Dashboard / analytics service

FastAPI owns role-scoped KPI aggregation. It derives counts/rates from normalized shipment/events/incidents data, normalizes currencies before summing, and returns freshness metadata. React renders KPI cards but must not be the authority for cross-user filtering or commercial-data scoping.
