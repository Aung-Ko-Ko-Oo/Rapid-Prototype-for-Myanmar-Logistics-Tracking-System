# Frontend Specification

## Shared components

`AppShell`, `Header`, `UserMenu`, `ConnectionStatus`, `NotificationBell`, `DataFreshnessIndicator`, `LogisticsMap`, `ShipmentHeader`, `ShipmentStatusBadge`, `ShipmentTimeline`, `RouteSummary`, `AlertPanel`, `DocumentGallery`, `DriverInfo`, `KpiCard`, `KpiGrid`.

All dashboard timestamps are formatted consistently in **MMT (UTC+06:30)** for the demo.

## Admin routes

`/admin`, `/admin/shipments`, `/admin/map`, `/admin/incidents`, `/admin/alerts`.

### Admin dashboard - core cards

First row:

- Active Shipments
- In Transit
- Held at Checkpoint
- In Customs

Second row:

- Delayed Shipments
- Delivered Today
- Active Critical Alerts
- Gate Status Summary

Advanced/expandable when data exists:

- Avg. Transit Time
- On-Time Rate (X of Y)
- Cargo Value In Transit (normalized and marked approximate/static demo rates)
- Avg. Checkpoint Dwell Time
- Devices With Pending Sync
- Fleet Active Today

Always show **Last updated** and a visible stale/error state if polling/realtime stops.

Admin map shows all active trucks, known/temporary gates, incidents and routes.

## Trader routes

`/trader`, `/trader/shipments`, `/trader/shipments/new`, `/trader/shipments/:id`, `/trader/alerts`.

Trader sees only their shipments, current route/truck, timeline, relevant incidents, documents and delivery proof.

Trader KPI cards must be computed from only the authenticated Trader's shipments; never reuse unrestricted Admin aggregates and filter them only in the browser.

## Driver routes

`/driver`, `/driver/map`, `/driver/report`, `/driver/routes`, `/driver/sync`.

Mobile-first CurrentTrip screen shows shipment, map, status, Update Status, Report Checkpoint, Choose Route, Upload Document, Mark Delivered, connection state and pending sync count.

Driver dashboard metrics should remain operational: current assignment, trips today, pending sync items, current route condition, nearby relevant disruptions. Do not expose unrelated commercial cargo values.

## Map layers

One `LogisticsMap` implementation with role-based visibility. Planned/active/observed/disrupted route types are visually distinguishable. Current truck is default; breadcrumb history is optional. Temporary checkpoints display pending/unverified state until corroborated/confirmed.

## Dashboard UX rules

- Count-based KPIs are preferred for seeded/demo data.
- Percent/rate cards show numerator + denominator.
- Critical red styling is reserved for genuinely critical conditions.
- Data-source failures degrade visibly; do not leave a dashboard silently frozen.
