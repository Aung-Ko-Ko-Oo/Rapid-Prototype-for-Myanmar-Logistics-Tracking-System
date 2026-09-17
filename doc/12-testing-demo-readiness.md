# Testing and Demo Readiness

## Highest-priority test
Run the complete golden path across Trader, Admin and Driver.

## RBAC negative tests
Trader cannot view another Trader’s shipment or approve incidents. Driver cannot update another Driver’s shipment. Admin can view all shipments and perform authorized operations.

## Offline test
Queue GPS batch + status + gate report + photo while offline, reconnect, verify each logical action appears exactly once. Retry only failed items.

## Route-learning test
Synthetic test data may exercise the scoring function, but app-level production reinforcement must reject simulated traversals.

## Demo-ready gate
Three consecutive golden-path rehearsals, no critical bugs, RBAC negative tests pass, cached-route and simulation fallbacks work, and the emergency recording is available.
