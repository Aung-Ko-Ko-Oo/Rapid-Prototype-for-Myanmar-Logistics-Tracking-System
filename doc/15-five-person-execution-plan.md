# Five-Person Execution Plan

## Person 1 - Product + Integration Lead
Owns requirements, diagrams, contracts, scope, Git integration, demo narrative and unblock decisions.

## Person 2 - React Admin + Trader
Shared UI → Trader flow → Admin flow → realtime/alerts → polish. Develop against agreed mock JSON while backend is incomplete.

## Person 3 - FastAPI + Supabase
Supabase/Auth → migrations/seeds → token validation/RBAC → shipment API → events → gate/incidents → alerts/documents → route confidence → deployment.

## Person 4 - Driver + Map + GPS + Offline
Shared map → cached route → simulator → ORS → live GPS → Driver actions → checkpoint reporting → IndexedDB → observed routes → recommendations.

## Person 5 - QA + Demo + AI Reflection
Test plan from day one, RBAC/integration tests, seeded demo data, AI log collection, demo-readiness checklist, slides and fallback recording.

## Integration milestones
1. Trader creates → Admin assigns → Driver sees.
2. Driver movement → Admin/Trader map tracking.
3. Checkpoint report → incident → alert → reroute.
4. Offline queue → reconnect sync.
5. Documents + delivery proof.
6. Learned routes only after milestones 1–5 are stable.
