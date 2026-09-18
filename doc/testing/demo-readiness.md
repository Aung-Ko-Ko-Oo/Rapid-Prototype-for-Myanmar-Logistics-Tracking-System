# Testing and Demo Readiness

## Highest-priority test

Run the complete golden path across Trader, Admin and Driver.

## RBAC negative tests

Trader cannot view another Trader's shipment or approve incidents. Driver cannot update another Driver's shipment. Admin can view all shipments and perform authorized operations.

## Offline test

Queue GPS batch + status + gate report + photo while offline, reconnect, verify each logical action appears exactly once. Retry only failed items.

## Route-learning test

Synthetic test data may exercise the scoring function, but app-level production reinforcement must reject simulated traversals.

## KPI correctness tests

Seed deterministic data and verify dashboard computations exactly.

Examples:

- 15 delivered, 12 on/before ETA -> display `12 of 15 (80%)`.
- Checkpoint `ARRIVED` at 10:00 and `CLEARED` at 10:45 -> dwell time 45 minutes.
- Mixed USD/CNY/MMK cargo values -> convert each using the shared currency helper before summing.
- `pending_sync_count > 0` from two Drivers -> Devices With Pending Sync = 2.
- Timestamps near UTC day boundaries -> Delivered Today must be evaluated in MMT (UTC+06:30), not naïve UTC.

## Dashboard resilience tests

- realtime/poll failure produces a visible stale/error state,
- last successful update remains visible,
- count/rate denominators are correct,
- Trader dashboard cannot leak other Traders' commercial values or delay reasons,
- minor congestion does not render as CRITICAL unless severity rules say so.

## Demo-ready gate

Three consecutive golden-path rehearsals, no critical bugs, RBAC negative tests pass, cached-route and simulation fallbacks work, KPI sanity tests pass, and the emergency recording is available.
