# Assignment Grounding

The attached assignment asks for a rapid prototype called **Real-Time Logistics Monitoring for Myanmar Trading**. Mandatory demonstrations are:

- Role-based access for **Admin, Trader, Driver**.
- Admin oversees shipments, manages gate status, and broadcasts alerts.
- Trader submits transport requests, tracks their cargo, and receives gate/delay alerts.
- Driver updates location, uploads document photos, and reports status.
- Shipment timeline and simulated live GPS map.
- Myanmar-specific gate/route status behavior, including major-route disruptions.
- Offline capability proposed or simulated for Driver blackouts.
- AI-assisted/vibe-coding methodology with architecture, schema, prompt engineering, integration and debugging.
- 30-minute presentation: **5 min problem/solution + 15 min live demo + 10 min AI engineering reflection**.

**Team-specific adaptation:** the assignment assumes about 11 members, but this project plan is optimized for **5 people**.

**Design extensions beyond the assignment:** real device GPS, Driver-controlled rerouting, dynamic temporary checkpoints, multi-Driver incident consensus, Driver-observed unmapped routes, and pheromone-inspired route confidence/recommendations. These are differentiators, not mandatory assignment requirements.


## Frozen domain/KPI refinement

The logistics glossary and KPI dashboard in `16-logistics-domain-glossary-kpis.md` are **team refinements**, not additional requirements stated in the assignment. They improve domain credibility and operational visibility, but assignment-core delivery remains RBAC, shipment lifecycle, map/GPS, gate/route status, alerts, Driver uploads and offline capability.
