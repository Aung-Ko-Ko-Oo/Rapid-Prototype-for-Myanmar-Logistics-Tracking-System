# Frontend Specification

## Shared components
`AppShell`, `Header`, `UserMenu`, `ConnectionStatus`, `NotificationBell`, `LogisticsMap`, `ShipmentHeader`, `ShipmentStatusBadge`, `ShipmentTimeline`, `RouteSummary`, `AlertPanel`, `DocumentGallery`, `DriverInfo`.

## Admin routes
`/admin`, `/admin/shipments`, `/admin/map`, `/admin/incidents`, `/admin/alerts`.
Admin map shows all active trucks, known/temporary gates, incidents and routes.

## Trader routes
`/trader`, `/trader/shipments`, `/trader/shipments/new`, `/trader/shipments/:id`, `/trader/alerts`.
Trader sees only their shipments, current route/truck, timeline, relevant incidents, documents and delivery proof.

## Driver routes
`/driver`, `/driver/map`, `/driver/report`, `/driver/routes`, `/driver/sync`.
Mobile-first CurrentTrip screen shows shipment, map, status, Update Status, Report Checkpoint, Choose Route, Upload Document, Mark Delivered, connection state and pending sync count.

## Map layers
One `LogisticsMap` implementation with role-based visibility. Planned/active/observed/disrupted route types are visually distinguishable. Current truck is default; breadcrumb history is optional. Temporary checkpoints display pending/unverified state until corroborated/confirmed.
