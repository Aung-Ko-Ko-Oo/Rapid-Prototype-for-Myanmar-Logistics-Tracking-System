# Gates, Incidents and Alerts

## Separation of concepts
- **Gate:** a location/checkpoint.
- **Gate report:** one Driver observation.
- **Incident:** the system’s aggregated current interpretation of conditions.
- **Alert:** a user-targeted message generated because an incident matters to them.

## Incident logic
First observation creates PENDING state. Multiple matching reports from unique Drivers in a recent location/time window can auto-confirm. Opposing reports produce UNCERTAIN state. Repeated CLEAR evidence can auto-resolve. Admin handles overrides, suspicious data and exception cases.

## Alerts
Severities: INFO, WARNING, CRITICAL. Avoid spam by updating one evolving incident/alert rather than generating duplicate warnings for every report. Traders receive only alerts relevant to their shipment/route. Admin can broadcast manually by audience.
