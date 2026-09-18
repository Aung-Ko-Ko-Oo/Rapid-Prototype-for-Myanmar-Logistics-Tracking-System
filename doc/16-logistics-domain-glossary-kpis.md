# Logistics Domain Glossary, Dashboard Considerations & KPIs

## 1. Logistics terms and terminology

| Term | Meaning in this prototype |
|---|---|
| Consignment / Shipment | One load of cargo moving under one tracking number (`Shipment.tracking_number`). |
| Consignor / Consignee | Sender and receiver of goods; approximately the Trader and the counterpart receiving/sending cargo on the other side of the movement. |
| Waybill | Document accompanying cargo (route, cargo type, weight). Driver waybill-photo capture is stored as a shipment document. |
| Manifest | Full list of cargo/shipments for a truck or operational period. In V1 this is an Admin shipment-manifest view rather than a separate aggregate entity. |
| HS Code | Harmonized System customs classification for the cargo type. Optional V1 shipment field. |
| Incoterms (FOB, CIF, DAP, etc.) | Standard terms allocating cost/risk between trading parties. Stored optionally if useful, but pricing/liability logic is outside V1. |
| Corridor | Defined trade route between two points/regions, e.g. Northern (China) or Eastern (Thailand) corridor. |
| Checkpoint / Inspection station | A location where cargo/documents are inspected. May be known or dynamically Driver-reported. |
| Border gate / Trade zone | Formal crossing point (e.g. Muse, Myawaddy) versus the surrounding trade zone. |
| Customs clearance | Formal border processing represented by `CUSTOMS_PROCESSING`. |
| Dwell time | Time cargo remains stationary at a checkpoint/gate; derived from `CHECKPOINT_ARRIVED` to `CHECKPOINT_CLEARED`. |
| Transit time / Lead time | Total time from shipment creation/pickup to delivery. For the dashboard, use a documented definition consistently. |
| ETA / ETD / ATA / ATD | Estimated/Actual Time of Arrival/Departure. `estimated_arrival` is ETA; `delivered_at` / delivery event is actual arrival for V1. |
| Demurrage / Detention | Charges caused by cargo/vehicle being held too long. Recognized but not modeled in V1. |
| FTL / LTL | Full Truckload / Less-than-Truckload. V1 focuses on shipment movement, not advanced load consolidation. |
| POD | Proof of Delivery - timestamp/location/photo evidence captured at final delivery. |
| OTIF | On-Time-In-Full - delivered by ETA and complete/correct. V1 can compute the on-time element; full quantity/completeness validation requires more cargo data. |
| Reroute / Diversion | Moving away from the planned route. Implement as `ROUTE_CHANGED` event plus a new `active_route_id`, not a persistent shipment lifecycle state. |
| Escort | Military/police-accompanied convoy. Recognized Myanmar operational constraint, deliberately outside V1. |
| Informal/unofficial fees | Sensitive payments outside formal tariffs. Deliberately not modeled; document as a scope boundary. |
| Chokepoint | A location where a corridor narrows to a critical path, e.g. a gate, bridge, or mountain pass. |

## 2. Live logistics dashboard considerations

### Data freshness and latency

A live dashboard must show a **Last updated** timestamp. If polling/realtime fails, display a stale/error condition. Do not silently freeze old numbers.

For the current prototype, the dashboard may poll every ~2 seconds where realtime is not used. Driver data can still be older because the Driver may have been offline.

### Currency normalization

Never sum mixed USD/CNY/MMK values directly. Convert to one display currency using the project's shared currency helper and label aggregates as **approximate - static demo exchange rates** when that is the implementation.

### Role-scoped visibility

Cargo value, commercial details, and delay reasons may be sensitive.

- Admin: system-wide operational/commercial KPIs where authorized.
- Trader: only KPIs derived from that Trader's shipments.
- Driver: operational metrics for their own work; do not expose unrelated cargo values.

### Denominator clarity

Rates must show counts, e.g. **12 of 15 delivered on time (80%)**, not just `80%`.

### Alert fatigue

Do not style every congestion/minor delay as critical. Reserve red/critical treatment for genuinely critical operational states and CRITICAL broadcasts.

### Timezone

Use **MMT (UTC+06:30)** consistently for the demo. Centralize datetime formatting so half-hour timezone math is not duplicated across components.

### Small-N statistics

With only a few seeded shipments, percentages swing wildly. Prefer counts in the demo and disclose that rate KPIs are illustrative until data volume is realistic.

### Visible degradation

If polling/realtime fails, expose:

- stale state,
- last successful update,
- retry/reconnect status,
- relevant backend error message safe for the user.

## 3. KPI cards for the live dashboard

| KPI | Definition | Data / computation |
|---|---|---|
| Active Shipments | Shipments not in `DELIVERED` or `CANCELLED`. | Filter `shipments.current_status`. |
| In Transit | Shipments currently `IN_TRANSIT`. | Status filter. |
| Held at Checkpoint | Shipments currently `HELD_AT_CHECKPOINT`. | Status filter. |
| In Customs | Shipments currently `CUSTOMS_PROCESSING`. | Status filter. |
| Delayed Shipments | Active shipments with `delay_status = DELAYED`, plus optional % of active. | Status filter + denominator. |
| Delivered Today | Shipments delivered today in MMT. | `delivered_at` / `DELIVERY_COMPLETED` event. |
| Avg. Transit Time | Mean elapsed time for delivered shipments. | Define start consistently (`picked_up_at` recommended operationally; `created_at` is acceptable if clearly labeled). |
| On-Time Rate | Delivered by or before `estimated_arrival`; show X of Y and %. | `delivered_at <= estimated_arrival`. |
| Cargo Value In Transit | Sum active shipment value after currency normalization. | `cargo_value`, `cargo_currency`, conversion helper. |
| Gate Status Summary | Count gates/incidents by operational state. | Gates + incident-derived operational state. |
| Active Critical Alerts | Active CRITICAL broadcasts/alerts. | Alerts/broadcast filters. |
| Avg. Checkpoint Dwell Time | Mean `CHECKPOINT_CLEARED - CHECKPOINT_ARRIVED`. | Pair checkpoint events by shipment/checkpoint/visit. |
| Devices With Pending Sync | Drivers whose most recently reported queue depth is > 0. | Driver device status heartbeat. |
| Fleet Active Today | Distinct Drivers with at least one real operational telemetry/event today. | Group events/telemetry by `driver_id`. |

## 4. Recommended dashboard layout

### Admin - first row

- Active Shipments
- In Transit
- Held at Checkpoint
- In Customs

### Admin - second row

- Delayed Shipments
- Delivered Today
- Active Critical Alerts
- Gate Status Summary

### Advanced / expandable

- Avg. Transit Time
- On-Time Rate
- Cargo Value In Transit
- Avg. Checkpoint Dwell Time
- Devices With Pending Sync
- Fleet Active Today

### Trader dashboard

Only compute from the authenticated Trader's shipments:

- My Active Shipments
- My Delayed Shipments
- My Delivered Shipments
- My Avg. Transit Time
- My Alerts

### Driver dashboard

Operational only:

- Current Assignment
- Trips Today
- Pending Sync Items
- Current Route Condition
- Nearby Relevant Disruptions

## 5. Data-source additions needed

### Shipment additions

- `estimated_arrival`
- `cargo_value`
- `cargo_currency`
- optional `hs_code`
- optional `incoterm`
- optional `corridor_id`

### Operational events

Add/standardize:

- `CHECKPOINT_ARRIVED`
- `CHECKPOINT_CLEARED`
- `DELIVERY_COMPLETED`

### Driver device health

Recommended small table or heartbeat model:

`driver_device_status(driver_id, pending_sync_count, connection_status, last_reported_at)`

This enables system-side visibility into unsynchronized Driver devices without trying to inspect the Driver's IndexedDB remotely.

## 6. Scope boundaries for the AI Engineering Reflection

State explicitly that the prototype simplifies several real Myanmar logistics factors:

- escort/convoy requirements,
- unofficial fees,
- demurrage/detention billing,
- full FTL/LTL consolidation,
- detailed customs tariff/compliance logic,
- liability/cost allocation under Incoterms.

Naming these boundaries demonstrates domain awareness without claiming unsupported functionality.
