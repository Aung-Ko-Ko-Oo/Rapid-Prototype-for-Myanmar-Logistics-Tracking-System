# Five-Person Execution Plan

## Person 1 - Product + Integration Lead

Owns requirements, diagrams, contracts, scope, Git integration, demo narrative and unblock decisions. After documentation freeze, Person 1 is the change-control owner: schema/status/API changes must be intentional and reflected in `00-FROZEN-BASELINE.md` if truly required.

## Person 2 - React Admin + Trader

Implementation order:

1. shared shell / auth routing,
2. Trader create/list/detail flow,
3. Admin shipment flow,
4. shared map integration,
5. realtime alerts,
6. **Admin KPI dashboard + Last Updated / stale state**,
7. role-scoped Trader KPI cards,
8. polish.

Develop against agreed mock JSON while backend is incomplete. Do not compute sensitive cross-user aggregates in the browser.

## Person 3 - FastAPI + Supabase

Implementation order:

1. Supabase/Auth,
2. migrations/seeds,
3. token validation/RBAC,
4. shipment API,
5. events,
6. gate/incidents,
7. alerts/documents,
8. **dashboard/KPI aggregation endpoints and freshness metadata**,
9. **Driver device-status heartbeat persistence**,
10. route confidence,
11. deployment.

Person 3 owns currency-normalized aggregate logic and canonical status/event enums.

## Person 4 - Driver + Map + GPS + Offline

Implementation order:

1. shared map,
2. cached route,
3. simulator,
4. ORS,
5. live GPS,
6. Driver actions,
7. checkpoint reporting,
8. IndexedDB,
9. **device sync-health heartbeat (`pending_sync_count`)**,
10. observed routes,
11. recommendations.

Checkpoint arrival/clear and delivery timestamps must be recorded consistently so dwell/transit KPIs are computable.

## Person 5 - QA + Demo + AI Reflection

Owns test plan from day one, RBAC/integration tests, seeded demo data, AI log collection, demo-readiness checklist, slides and fallback recording.

Additional frozen KPI tests:

- on-time numerator/denominator,
- MMT date boundaries,
- checkpoint dwell-time pairing,
- currency-normalized cargo totals,
- pending-sync device count,
- stale/error dashboard behavior,
- role-scoped KPI visibility.

## Integration milestones

1. Trader creates -> Admin assigns -> Driver sees.
2. Driver movement -> Admin/Trader map tracking.
3. Checkpoint report -> incident -> alert -> reroute.
4. Offline queue -> reconnect sync.
5. Documents + delivery proof.
6. Dashboard core cards + freshness/stale behavior.
7. Learned routes only after milestones 1-6 are stable.

The dashboard milestone must not delay assignment-core flows; basic count cards are enough before advanced derived KPIs.
