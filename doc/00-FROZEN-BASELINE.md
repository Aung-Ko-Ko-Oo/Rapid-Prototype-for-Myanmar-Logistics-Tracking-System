# Frozen Documentation Baseline

**Project:** Rapid Prototype for Myanmar Logistics & Tracking System  
**Freeze date:** 18 September 2026  
**Status:** Implementation baseline - changes after this point require an explicit change decision.

## Purpose

This file is the final authority when an older Grill-Me decision, diagram, or draft uses different terminology. The historical Q001-Q300 decision log is preserved unchanged as an audit trail; this frozen baseline records the terminology and implementation refinements agreed after the grill.

## Canonical product scope

The prototype demonstrates a Myanmar-focused real-time logistics monitoring system with three roles:

- **Admin:** oversees shipments, maintains authoritative gate/incident information, broadcasts alerts, and handles exceptional overrides.
- **Trader:** submits transport requests, sees only their own commercial shipment data, tracks cargo, receives relevant alerts, and views delivery proof.
- **Driver:** operates the assigned shipment, provides real/simulated GPS, reports field conditions, captures evidence, works offline, chooses operational routes, and can create observed/unmapped route knowledge.

## Canonical shipment lifecycle

Use these values in database enums, API contracts, UI filters, KPI logic, tests, and diagrams:

`REQUESTED -> ASSIGNED -> PICKED_UP -> IN_TRANSIT -> HELD_AT_CHECKPOINT -> IN_TRANSIT -> CUSTOMS_PROCESSING -> IN_TRANSIT -> DELIVERED`

`CANCELLED` is a terminal non-delivery state.

`DELAYED` is **not** a lifecycle state. Use a separate `delay_status` (`ON_TIME`, `DELAYED`, `UNKNOWN`).

### Superseded terminology

| Older draft term | Frozen term |
|---|---|
| `AT_CHECKPOINT` | `HELD_AT_CHECKPOINT` |
| `CUSTOMS` | `CUSTOMS_PROCESSING` |
| `REROUTED` as shipment state | `ROUTE_CHANGED` event + updated `active_route_id` |

## Canonical logistics event terminology

Use events such as:

- `STATUS_CHANGED`
- `LOCATION_RECORDED`
- `CHECKPOINT_ARRIVED`
- `CHECKPOINT_CLEARED`
- `ROUTE_CHANGED`
- `DOCUMENT_UPLOADED`
- `INCIDENT_REPORTED`
- `INCIDENT_RESOLVED`
- `DELIVERY_COMPLETED`

Checkpoint dwell time is derived from `CHECKPOINT_ARRIVED` to the corresponding `CHECKPOINT_CLEARED` event.

## Canonical dashboard rules

1. Always show data freshness (`last updated`) and a visible stale/error state.
2. Display timestamps consistently in **Myanmar Time (MMT, UTC+06:30)** for the demo.
3. Prefer count-based KPIs when seeded data volume is small.
4. For rates, show numerator and denominator (for example, `12 of 15 - 80%`).
5. Normalize money to one display currency before aggregating. Label demo conversions as approximate/static demo rates.
6. Respect role-scoped visibility. Commercial values and delay details must not leak across Traders or to unrelated Drivers.
7. Reserve red/critical styling for true critical states such as `CLOSED`, `EMERGENCY_HALT`, or `CRITICAL` broadcasts.
8. Failed polling/realtime must degrade visibly rather than silently freezing old data.

## Core dashboard KPIs

Build first:

- Active Shipments
- In Transit
- Held at Checkpoint
- In Customs
- Delayed Shipments
- Delivered Today
- Gate Status Summary
- Active Critical Alerts

Build when data is reliable:

- Average Transit Time
- On-Time Rate (X of Y)
- Cargo Value In Transit (normalized currency)
- Average Checkpoint Dwell Time
- Devices With Pending Sync
- Fleet Active Today

## Schema refinements added at freeze

Add or formalize:

- `shipments.estimated_arrival`
- `shipments.cargo_value`
- `shipments.cargo_currency`
- optional `shipments.hs_code`
- optional `shipments.incoterm`
- optional `shipments.corridor_id`
- delivery timestamp/event data
- checkpoint arrival/clear telemetry/events
- Driver device sync-health reporting (`pending_sync_count`, `last_reported_at`, `connection_status`)

## Scope boundaries explicitly acknowledged

Recognized but not modeled as V1 operational logic:

- Escort / military or police convoy constraints
- Informal or unofficial checkpoint fees
- Demurrage / detention charging
- Full FTL/LTL consolidation planning
- Financial liability/pricing implications of Incoterms

These are valid Myanmar logistics considerations and should be named as scope boundaries rather than ignored.

## Change-control rule after freeze

A new idea is implemented only if it either:

1. fixes an assignment-core requirement,
2. fixes a critical integration/demo defect, or
3. is explicitly accepted as a post-core enhancement without threatening the golden path.

The implementation priority remains: **golden shipment flow first, adaptive/pheromone routing last.**
