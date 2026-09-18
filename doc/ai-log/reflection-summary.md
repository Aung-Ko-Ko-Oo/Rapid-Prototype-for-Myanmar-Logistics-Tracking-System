# AI Engineering Reflection

Maintain `/docs/ai-log/` throughout development. Each member contributes at least one useful prompt, one AI-generated mistake, the correction and the lesson.

## Entry template
- **Task:** What were we trying to do?
- **Prompt:** Exact or representative prompt.
- **Output:** What the model generated.
- **Problem:** What was wrong or incomplete?
- **Fix:** What humans changed.
- **Lesson:** How prompt/context/review should improve.

Strong examples include schema-field hallucinations, inconsistent API contracts, incorrect RBAC assumptions, exposed credentials, offline assumptions, duplicated business logic and integration mismatches.

Core reflection: AI accelerates scaffolding, debugging and implementation, but architecture, shared contracts, security, verification, integration and testing remain human responsibilities.


## Domain-scope reflection

The team should explicitly acknowledge important Myanmar logistics realities that V1 does not model: escort/convoy constraints, informal/unofficial fees, demurrage/detention billing, detailed FTL/LTL consolidation, tariff/compliance depth and full Incoterms liability/pricing. Naming these boundaries is preferable to implying the prototype covers them.

Dashboard statistics should also be described honestly: with small seeded datasets, rate KPIs are illustrative; static demo currency conversion is approximate; live-data freshness depends on connectivity and Driver synchronization.
