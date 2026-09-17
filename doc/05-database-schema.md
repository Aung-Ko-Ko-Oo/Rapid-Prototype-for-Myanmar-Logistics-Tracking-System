# Database Schema

## Core tables

### profiles
`id`, `full_name`, `role`, `phone`, `is_active`, `created_at`, `updated_at`.
`id` references Supabase Auth user ID.

### shipments
`id`, `tracking_number`, `trader_id`, `driver_id`, `active_route_id`, `cargo_description`, `cargo_type`, `vehicle_type`, origin/destination names and coordinates, `current_status`, `delay_status`, current coordinates, lifecycle timestamps.

### shipment_events
Append-oriented operational history: `shipment_id`, `event_type`, previous/new status, title/description, location, `created_by`, `source`, `client_event_id`, metadata, timestamp.

### routes
Reusable route knowledge: `name`, `source` (ORS/ADMIN/DRIVER_OBSERVED), `trust_status`, `operational_status`, `confidence_score`, endpoints, distance/duration, trip/driver counts, confirmation method, lifecycle timestamps.

### route_points
Ordered geometry points: `route_id`, `sequence`, latitude, longitude.

### route_traversals
Evidence that a Driver actually used a route: route/shipment/driver, location source, start/end, success, reinforcement eligibility, distance, coverage ratio.

### gates
Physical/operational checkpoint locations: name, permanent/temporary type, coordinates, verified flag, created/archived timestamps.

### incidents
Changing conditions associated with a gate and/or route: type, state, severity, confidence, start/resolve times, Admin override flag.

### gate_reports
Individual Driver observations: incident/gate/shipment/driver refs, condition, coordinates, note/photo, verification status, `client_event_id`, report/sync times.

### alerts
User-targeted messages linked to shipment/route/incident: type, severity, title, message, read state/timestamps.

### documents
Private file metadata: shipment/uploader, document type, storage path, MIME/size, capture location/time, note, lifecycle status, optional `client_event_id`.

## Enums
Shipment lifecycle: `REQUESTED`, `ASSIGNED`, `PICKED_UP`, `IN_TRANSIT`, `AT_CHECKPOINT`, `CUSTOMS`, `DELIVERED`, `CANCELLED`.
Delay: `ON_TIME`, `DELAYED`, `UNKNOWN`.
Incident: `PENDING`, `CONFIRMED`, `UNCERTAIN`, `RESOLVED`, `ARCHIVED`.
Route trust: `UNCONFIRMED`, `CONFIRMED`.
Route operation: `CLEAR`, `DISRUPTED`, `BLOCKED`, `UNKNOWN`.
