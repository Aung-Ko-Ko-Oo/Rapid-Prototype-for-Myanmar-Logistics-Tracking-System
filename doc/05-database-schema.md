# Database Schema

This schema is the frozen implementation baseline. The historical decision log may contain earlier names; use `00-FROZEN-BASELINE.md` for superseding terminology.

## Core tables

### profiles
`id`, `full_name`, `role`, `phone`, `is_active`, `created_at`, `updated_at`.
`id` references Supabase Auth user ID.

### shipments

Core ownership/routing:

- `id`
- `tracking_number` (unique)
- `trader_id` -> profiles
- `driver_id` -> profiles, nullable until assigned
- `active_route_id` -> routes, nullable
- optional `corridor_id`

Cargo/commercial fields:

- `cargo_description`
- `cargo_type`
- `vehicle_type`
- optional `hs_code`
- optional `incoterm`
- optional `cargo_value`
- optional `cargo_currency` (`MMK`, `USD`, `CNY`, etc.)

Origin/destination:

- `origin_name`, `origin_lat`, `origin_lng`
- `destination_name`, `destination_lat`, `destination_lng`

Current operational state:

- `current_status`
- `delay_status`
- `current_lat`, `current_lng`
- `estimated_arrival`

Lifecycle timestamps:

- `created_at`
- `assigned_at`
- `picked_up_at`
- `delivered_at`
- `updated_at`

### shipment_events

Append-oriented operational/audit history:

- `id`
- `shipment_id`
- `event_type`
- `previous_status`, `new_status`
- `title`, `description`
- optional `checkpoint_id` / `gate_id`
- `latitude`, `longitude`
- `created_by`
- `source` (`LIVE`, `OFFLINE_SYNC`, `SYSTEM`, `ADMIN`)
- optional unique `client_event_id`
- optional `metadata` JSONB
- `occurred_at` / `created_at`

Canonical event types include:

`STATUS_CHANGED`, `LOCATION_RECORDED`, `CHECKPOINT_ARRIVED`, `CHECKPOINT_CLEARED`, `ROUTE_CHANGED`, `DOCUMENT_UPLOADED`, `INCIDENT_REPORTED`, `INCIDENT_RESOLVED`, `DELIVERY_COMPLETED`.

### routes

Reusable route knowledge:

- `id`, `name`
- `source` (`ORS`, `ADMIN`, `DRIVER_OBSERVED`)
- `trust_status`
- `operational_status`
- `confidence_score`
- origin/destination endpoints
- distance/duration
- successful trip / unique Driver counts
- confirmation method
- creation/confirmation/last-success timestamps

### route_points

Ordered geometry points: `route_id`, `sequence`, latitude, longitude, timestamp as required.

### route_traversals

Evidence that a Driver actually used a route: route/shipment/driver, location source, start/end, success, reinforcement eligibility, distance, coverage ratio.

### gates

Physical/formal or temporary checkpoint locations: name, permanent/temporary type, coordinates, verified flag, creator, create/archive times.

### incidents

Changing conditions associated with a gate and/or route: type, state, severity, confidence, start/resolve times, Admin override flag.

### gate_reports

Individual Driver observations: incident/gate/shipment/driver refs, condition, coordinates, note/photo, verification status, unique `client_event_id`, report/sync times.

### alerts

User-targeted messages linked to shipment/route/incident: type, severity, title, message, read state/timestamps. Broadcasts may target route/audience groups.

### documents

Private file metadata: shipment/uploader, document type, storage path, MIME/size, capture location/time, note, lifecycle status, optional unique `client_event_id`.

Document types include `WAYBILL`, `CHECKPOINT_PHOTO`, `CUSTOMS_DOCUMENT`, `CARGO_PHOTO`, `DELIVERY_PROOF`.

### driver_device_status

Small heartbeat/status record for dashboard sync-health:

- `driver_id` (unique / latest state)
- `pending_sync_count`
- `connection_status` (`ONLINE`, `OFFLINE`, `DEGRADED`, `UNKNOWN`)
- `last_reported_at`

The server does not inspect IndexedDB directly; the connected Driver app reports queue depth/health.

## Canonical enums

Shipment lifecycle:

`REQUESTED`, `ASSIGNED`, `PICKED_UP`, `IN_TRANSIT`, `HELD_AT_CHECKPOINT`, `CUSTOMS_PROCESSING`, `DELIVERED`, `CANCELLED`.

Delay:

`ON_TIME`, `DELAYED`, `UNKNOWN`.

Incident:

`PENDING`, `CONFIRMED`, `UNCERTAIN`, `RESOLVED`, `ARCHIVED`.

Route trust:

`UNCONFIRMED`, `CONFIRMED`.

Route operation:

`CLEAR`, `DISRUPTED`, `BLOCKED`, `UNKNOWN`.

## Derived KPI data

Do not store most KPI values as authoritative columns; derive them from normalized source data.

- **Checkpoint dwell time:** `CHECKPOINT_CLEARED.occurred_at - CHECKPOINT_ARRIVED.occurred_at`.
- **Transit time:** use a documented start definition; `picked_up_at -> delivered_at` is preferred operationally.
- **On-time:** `delivered_at <= estimated_arrival`.
- **Cargo value in transit:** normalize `cargo_value` by `cargo_currency` before summing.
- **Pending-sync devices:** latest `driver_device_status.pending_sync_count > 0`.
