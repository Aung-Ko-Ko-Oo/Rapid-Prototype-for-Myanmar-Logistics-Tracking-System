# Frozen Documentation Changelog

## 18 September 2026 - Freeze baseline

Added:

- final logistics glossary and Myanmar domain terminology,
- dashboard KPI definitions and role-scoping rules,
- data freshness/stale-state requirements,
- MMT (UTC+06:30) display convention,
- currency-normalization guidance,
- `estimated_arrival`, cargo value/currency and optional HS/Incoterm/corridor schema fields,
- checkpoint arrival/clear events for dwell time,
- Driver device sync-health heartbeat,
- Logistics Data -> KPI Pipeline Mermaid diagram.

Standardized:

- `AT_CHECKPOINT` -> `HELD_AT_CHECKPOINT`,
- `CUSTOMS` -> `CUSTOMS_PROCESSING`,
- rerouting remains a `ROUTE_CHANGED` event rather than a lifecycle state.

Preserved:

- the original Q001-Q300 decision log as historical design evidence.
