# Myanmar Logistics & Tracking Prototype - Frozen Documentation Pack

**Frozen baseline:** 18 September 2026.

This pack consolidates the assignment, all 300 Grill-Me decisions, the polished Mermaid architecture set, and the final logistics-domain/KPI refinements into one implementation source of truth for a five-person team.

Start with:

1. `00-FROZEN-BASELINE.md` - final authority when older drafts use different terminology.
2. `01-assignment-grounding.md` - assignment-required scope versus team extensions.
3. `02-system-architecture.md` through `16-logistics-domain-glossary-kpis.md` - implementation specifications.
4. `decision-log-001-300.md` - historical record of every question and decision (preserved as an audit trail).
5. `mermaid/` - editable Mermaid source diagrams.
6. `html/` - browser-viewable Mermaid diagram pages (requires internet to load Mermaid JS).
7. `Myanmar_Logistics_Project_Master_Documentation_FROZEN.docx` - consolidated Word document.

## Frozen terminology changes

- `AT_CHECKPOINT` -> `HELD_AT_CHECKPOINT`
- `CUSTOMS` -> `CUSTOMS_PROCESSING`
- Rerouting is `ROUTE_CHANGED` + `active_route_id`, not a persistent shipment lifecycle state.

## Polished Diagram Set

The visual set now contains **16 diagrams**, adding a Logistics Data -> KPI Pipeline to the existing system/context, architecture, ER, class, sequence, incident, offline, GPS, adaptive routing, deployment, state-machine, map-layer and team-dependency diagrams.

See `DIAGRAM_CATALOG.md` and `DIAGRAM_STYLE_GUIDE.md`.
