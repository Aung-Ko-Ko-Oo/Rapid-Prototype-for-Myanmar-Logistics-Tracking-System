# Functional Flows

## Golden shipment flow

1. Trader logs in and creates a transport request.
2. Admin sees the request and assigns a Driver and initial route.
3. Driver starts the trip and chooses Live GPS or Demo Simulation.
4. Location points update the shared logistics map and shipment timeline.
5. Driver encounters a known or unexpected checkpoint.
6. Driver records a gate report with condition, time, location, note and optional photo.
7. If offline, the report/GPS/photo metadata is queued in IndexedDB.
8. On reconnection, queued items synchronize idempotently.
9. The incident engine associates/merges observations; corroborating Drivers can auto-confirm a routine incident; conflicts create UNCERTAIN state; Admin handles overrides/exceptions.
10. Affected Traders receive a relevant alert; Admin and Driver maps update.
11. Driver chooses a route. The system may recommend alternatives, but the Driver makes the operational decision.
12. If the Driver travels through an unmapped path, breadcrumbs become a DRIVER_OBSERVED route.
13. Successful real-GPS traversals reinforce route confidence; diverse Driver evidence can auto-confirm a reusable route.
14. Driver uploads customs/cargo/delivery evidence and marks the shipment delivered.
15. Trader sees delivery state and proof.
