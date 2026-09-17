# Diagram Style Guide

Use the same visual language across every diagram:

| Concept | Color family | Meaning |
|---|---|---|
| Admin | Indigo | operations / authority |
| Trader | Teal | customer / cargo owner |
| Driver | Amber | field actor / route decision |
| Core application | Slate | shared software/services |
| Data / Supabase | Green | persisted system-of-record data |
| External services | Blue | GPS / OpenRouteService / device services |
| Offline | Orange | local IndexedDB / reconnect paths |
| Warning / Incident | Red | disruption / conflict / operational risk |
| Adaptive routing | Violet | observed routes / confidence / learning |

### Presentation rules

- Prefer one story per diagram.
- Keep long database detail in ER/class diagrams, not presentation architecture.
- Use the system context and functional workflow before technical architecture.
- Explain the adaptive route model as **pheromone-inspired**, not as full academic Ant Colony Optimization.
- Always distinguish **report evidence** from **aggregated incident state**, and **route trust** from **route operational status**.
