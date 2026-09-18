# Functional Flows

## Golden shipment flow

1. Trader logs in and creates a transport request (`REQUESTED`).
2. Admin sees the request and assigns a Driver and initial route (`ASSIGNED`).
3. Driver confirms pickup (`PICKED_UP`) and starts the trip (`IN_TRANSIT`).
4. Driver chooses Live GPS or Demo Simulation; location updates feed the shared logistics map and timeline.
5. When the Driver reaches a checkpoint, record `CHECKPOINT_ARRIVED` and set the operational shipment state to `HELD_AT_CHECKPOINT` when appropriate.
6. Driver records a gate report with condition, time, location, note and optional photo. The checkpoint may be predefined or newly discovered.
7. If offline, report/GPS/photo metadata and operational updates are queued in IndexedDB.
8. On reconnection, queued items synchronize idempotently using `client_event_id`.
9. The incident engine associates/merges observations. Corroborating Drivers can auto-confirm a routine incident; conflicting evidence produces `UNCERTAIN`; Admin handles overrides/exceptions.
10. Affected Traders receive relevant alerts; Admin and Driver maps update.
11. When the checkpoint clears, record `CHECKPOINT_CLEARED`; the shipment can return to `IN_TRANSIT`. The paired events support dwell-time KPIs.
12. Driver chooses the operational route. The system may recommend alternatives, but the Driver makes the route decision. Rerouting creates a `ROUTE_CHANGED` event rather than a permanent shipment lifecycle status.
13. If the Driver travels through an unmapped path, breadcrumbs become a `DRIVER_OBSERVED` route.
14. Successful real-GPS traversals reinforce route confidence; diverse Driver evidence can auto-confirm a reusable route.
15. Border processing uses `CUSTOMS_PROCESSING`, then the shipment returns to `IN_TRANSIT` as needed.
16. Driver uploads customs/cargo/delivery evidence and marks the shipment `DELIVERED` with delivery timestamp/location/proof.
17. Trader sees final delivery state and POD.

## Dashboard data flow

Operational events and shipment state feed role-scoped KPI endpoints. The frontend shows `last updated` in MMT (UTC+06:30) and exposes stale/error states if realtime/polling fails.
