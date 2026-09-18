# FastAPI Contract

## Authentication

React signs in via Supabase Auth and sends `Authorization: Bearer <access-token>`. FastAPI validates the token and resolves user ID/role. Backend must never trust a role or user ID merely because the browser submitted it.

## Shipments

- `POST /shipments`
- `GET /shipments`
- `GET /shipments/{id}`
- `POST /shipments/{id}/assign`
- `POST /shipments/{id}/status`
- `POST /shipments/{id}/reroute`
- `POST /shipments/{id}/deliver`
- `POST /shipments/{id}/locations/batch`

Canonical lifecycle values are defined in `00-FROZEN-BASELINE.md`: `REQUESTED`, `ASSIGNED`, `PICKED_UP`, `IN_TRANSIT`, `HELD_AT_CHECKPOINT`, `CUSTOMS_PROCESSING`, `DELIVERED`, `CANCELLED`.

## Gate reports / incidents

- `POST /gate-reports`
- `GET /gate-reports?status=PENDING`
- `POST /gate-reports/{id}/accept`
- `POST /gate-reports/{id}/reject`
- `POST /gate-reports/{id}/merge`

## Routes

- `GET /routes`
- `GET /routes/recommendations?shipment_id=...`
- `POST /routes/observed`

## Documents

- `POST /documents`
- `GET /shipments/{id}/documents`

Document types include `WAYBILL`, `CHECKPOINT_PHOTO`, `CUSTOMS_DOCUMENT`, `CARGO_PHOTO`, `DELIVERY_PROOF`.

## Alerts

- `GET /alerts`
- `POST /alerts/{id}/read`
- `POST /admin/alerts/broadcast`

## Dashboard / KPI endpoints

Preferred approach: one role-aware endpoint with backend scoping:

- `GET /dashboard`

The authenticated role controls the data set used to compute the response. An implementation may expose `/dashboard/admin`, `/dashboard/trader`, and `/dashboard/driver` instead, but must not rely on frontend-only filtering.

Suggested response metadata:

```json
{
  "generated_at": "2026-09-18T12:00:00+06:30",
  "timezone": "Asia/Yangon",
  "stale": false,
  "kpis": {}
}
```

Admin KPI response can include count-based core cards plus optional derived metrics such as on-time X/Y, normalized cargo value, dwell time, and device sync health.

## Driver device heartbeat / sync health

- `POST /driver/device-status`

Example:

```json
{
  "pending_sync_count": 4,
  "connection_status": "ONLINE",
  "reported_at": "2026-09-18T12:00:00+06:30"
}
```

This enables the Admin `Devices With Pending Sync` KPI. It is a heartbeat summary, not remote access to IndexedDB.

## Error envelope

```json
{
  "error": {
    "code": "SHIPMENT_NOT_ASSIGNED_TO_DRIVER",
    "message": "You cannot update this shipment.",
    "details": null
  }
}
```

Stable codes include `FORBIDDEN`, `NOT_FOUND`, `INVALID_STATUS_TRANSITION`, `DUPLICATE_EVENT`, `GPS_VALIDATION_FAILED`, `ROUTE_NOT_AVAILABLE`, `OFFLINE_SYNC_CONFLICT`.
