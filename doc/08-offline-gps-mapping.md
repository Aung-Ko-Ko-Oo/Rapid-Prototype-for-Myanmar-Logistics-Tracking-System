# Offline, GPS and Mapping

## Location provider abstraction
A shared `LocationProvider` interface is implemented by `LiveGPSProvider` and `SimulationProvider`. The tracking and map layers should not care which provider is active.

## Live GPS
Capture latitude, longitude, accuracy, timestamp and source. Sample every 5–15 seconds or after meaningful movement. Reject impossible jumps and ignore low-quality points for route reinforcement.

## Simulation
Use predefined route points with start/pause/next/jump-to-checkpoint controls. Simulation demonstrates behavior but never reinforces production route confidence.

## IndexedDB queue
Queue types: GPS batch, status update, gate report, document upload, delivery event. Queue states: PENDING, SYNCING, SYNCED, FAILED. Every action gets `client_event_id` for idempotent synchronization. Partial failure must not block independent queue items.


## Device sync-health heartbeat

When connected, the Driver client periodically reports `pending_sync_count`, connection status and report time to the backend. This summary supports the Admin `Devices With Pending Sync` KPI; the server never reads the browser's IndexedDB directly.
