# Polished Mermaid Diagram Catalog

This set replaces the original 11-diagram draft with 16 complete, presentation-quality diagrams.

## Visual language

- Admin: indigo
- Trader: teal
- Driver: amber
- Core application: slate
- Supabase/data: green
- External services: blue
- Offline/local: orange
- Incidents/warnings: red
- Adaptive/learned routing: violet

## Diagram set

### 01 · System Context

Shows who uses the platform, what each actor contributes, and which external systems the prototype depends on.

- Mermaid: `mermaid/01-system-context.mmd`
- HTML viewer: `html/01-system-context.html`
- Best use: Presentation / Report

### 02 · Full Technical Architecture

Separates role experiences, frontend, backend services, realtime, persistence, external services, and the Driver offline path.

- Mermaid: `mermaid/02-technical-architecture.mmd`
- HTML viewer: `html/02-technical-architecture.html`
- Best use: Technical / Presentation

### 03 · Functional Workflow

The complete shipment story from Trader request through disruption, offline sync, reroute, adaptive-route learning, and delivery.

- Mermaid: `mermaid/03-functional-workflow.mmd`
- HTML viewer: `html/03-functional-workflow.html`
- Best use: Presentation / Process

### 04 · Role / Use-Case & RBAC

Clarifies what each role can do, which functions are shared, and where authority boundaries differ.

- Mermaid: `mermaid/04-use-case-rbac.mmd`
- HTML viewer: `html/04-use-case-rbac.html`
- Best use: Report / Q&A

### 05 · Complete ER Diagram

Defines persistent entities, key identifiers, and cardinalities used by Supabase/PostgreSQL.

- Mermaid: `mermaid/05-er-diagram.mmd`
- HTML viewer: `html/05-er-diagram.html`
- Best use: Technical / Report

### 06 · Domain / Class Diagram

Separates domain objects from application services and infrastructure adapters; avoids duplicating the ER diagram.

- Mermaid: `mermaid/06-domain-class.mmd`
- HTML viewer: `html/06-domain-class.html`
- Best use: Technical / Q&A

### 07 · Golden-Path Sequence

The rehearsed 15-minute demo path, including offline report capture, incident confirmation, realtime alerting, reroute, observed route, and delivery proof.

- Mermaid: `mermaid/07-golden-path-sequence.mmd`
- HTML viewer: `html/07-golden-path-sequence.html`
- Best use: Presentation / Demo

### 08 · Checkpoint / Incident Consensus

Shows how individual Driver observations become shared operational truth without making Admin a bottleneck.

- Mermaid: `mermaid/08-incident-consensus.mmd`
- HTML viewer: `html/08-incident-consensus.html`
- Best use: Technical / Differentiator

### 09 · Offline Queue & Sync State Machine

Defines how Driver operations remain usable without internet and how every queued item synchronizes exactly once.

- Mermaid: `mermaid/09-offline-sync-state.mmd`
- HTML viewer: `html/09-offline-sync-state.html`
- Best use: Technical / Assignment Core

### 10 · GPS & Mapping Architecture

Shows live versus simulated location, validation, batching, offline storage, role-specific map layers, and route-learning eligibility.

- Mermaid: `mermaid/10-gps-mapping-architecture.mmd`
- HTML viewer: `html/10-gps-mapping-architecture.html`
- Best use: Technical / Presentation

### 11 · Adaptive / Pheromone Route Learning

Makes the ant-inspired idea explicit: field-discovered paths are reinforced by independent successful journeys and weakened by disruptions and age.

- Mermaid: `mermaid/11-route-learning-pheromone.mmd`
- HTML viewer: `html/11-route-learning-pheromone.html`
- Best use: Differentiator / Presentation

### 12 · Deployment & Security Boundaries

Shows production/demo hosting, token validation, public versus secret keys, private storage, and dependency fallbacks.

- Mermaid: `mermaid/12-deployment-security.mmd`
- HTML viewer: `html/12-deployment-security.html`
- Best use: Technical / Security

### 13 · Shipment State Machine

Defines legal operational lifecycle states while keeping delay as an independent condition.

- Mermaid: `mermaid/13-shipment-state-machine.mmd`
- HTML viewer: `html/13-shipment-state-machine.html`
- Best use: Technical / Assignment Core

### 14 · Shared Map & Role-Specific Layers

Shows how one LogisticsMap component presents different operational layers to Admin, Trader, and Driver without duplicating mapping code.

- Mermaid: `mermaid/14-map-role-layers.mmd`
- HTML viewer: `html/14-map-role-layers.html`
- Best use: Frontend / Presentation

### 15 · Five-Person Delivery & Dependency Map

Makes ownership, integration dependencies, milestones, and presentation responsibility visible.

- Mermaid: `mermaid/15-five-person-dependency.mmd`
- HTML viewer: `html/15-five-person-dependency.html`
- Best use: Team / Execution

### 16 · Logistics Data → KPI Pipeline

Shows how normalized shipment/events/incidents/device-health data becomes role-scoped dashboard KPIs, including MMT time normalization, currency normalization, freshness metadata, and visible stale/error handling.

- Mermaid: `mermaid/16-logistics-kpi-pipeline.mmd`
- HTML viewer: `html/16-logistics-kpi-pipeline.html`
- Best use: Dashboard / Technical / Presentation
