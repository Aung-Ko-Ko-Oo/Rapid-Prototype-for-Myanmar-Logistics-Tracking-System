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

## Alerts
- `GET /alerts`
- `POST /alerts/{id}/read`
- `POST /admin/alerts/broadcast`

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
