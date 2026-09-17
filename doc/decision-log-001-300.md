# Decision Log: Grill-Me Questions 001–300

This file preserves every grill question, its four choices, the recommendation, the final team decision, and later refinements where applicable.


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


# Round 1: Questions 1–10

## Q1. What exactly are you trying to deliver?
- **A.** A complete commercial logistics platform
- **B.** A polished prototype demonstrating the required scenario
- **C.** Mostly UI screens with no real backend
- **D.** A technical backend with a simple UI
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q2. What should be the single most important demo story?
- **A.** Driver uploads many logistics documents
- **B.** Trader creates shipment → Driver moves → Gate closes/appears → Trader gets alerted → Shipment delivered
- **C.** Admin views complicated analytics
- **D.** Users chat with an AI logistics assistant
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q3. What technology stack should you standardize on?
- **A.** Next.js + Tailwind + Supabase
- **B.** React + custom Express backend + PostgreSQL
- **C.** Flutter + Django + MySQL
- **D.** Separate technologies chosen independently by each member
- **Original recommendation:** A
- **Final decision:** CUSTOM
- **Refinement / rationale:** Final stack: React/Vite + Tailwind frontend, Python/FastAPI backend, Supabase Auth/Postgres/Storage/Realtime; OpenRouteService for routing, IndexedDB for offline.

## Q4. How should you implement the three roles?
- **A.** Three totally separate applications
- **B.** One app with authentication and role-based dashboards
- **C.** No authentication; three different URLs
- **D.** Hard-code different screens during presentation
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q5. How realistic should authentication be?
- **A.** Build enterprise-grade permissions
- **B.** Supabase authentication with role stored in a profile table and backend/RLS enforcement
- **C.** Fake login buttons only
- **D.** Skip login entirely
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q6. What should your shipment status model be?
- **A.** Only Active / Completed
- **B.** Requested → Assigned → Picked Up → In Transit → Checkpoint → Customs → Delivered
- **C.** 20+ detailed logistics states
- **D.** Let Drivers type arbitrary status text
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Later refined with CANCELLED and separate delay_status.

## Q7. How should you simulate GPS?
- **A.** Integrate only a real Driver phone GPS
- **B.** Use predetermined coordinates and move the truck marker through them
- **C.** Build your own GPS tracking service
- **D.** Use only text locations
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Use OpenRouteService for route geometry. Later upgraded to support both real production mobile GPS and demo simulation.

## Q8. How should the Myanmar border/gate feature work?
- **A.** Admin changes a database gate status and affected shipments receive an alert
- **B.** Admin manually messages each Trader
- **C.** Gate status is only decorative
- **D.** Pull live Myanmar border-government data
- **Original recommendation:** A
- **Final decision:** CUSTOM
- **Refinement / rationale:** Driver can report existing or new gates/checkpoints; reports are evidence. Admin remains authoritative for manual overrides, while later design allows multi-driver consensus to auto-confirm/resolve routine incidents.

## Q9. How much offline functionality should you actually build?
- **A.** Full production offline synchronization
- **B.** Simulate/implement offline mode: cache Driver updates locally and sync when connection returns
- **C.** Mention offline support only in slides
- **D.** Ignore it
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q10. With five people, what should you deliberately NOT build first?
- **A.** AI chatbot, payments, OCR, heavy analytics and other non-core extras
- **B.** Admin role
- **C.** Driver interface
- **D.** Gate alerts
- **Original recommendation:** A
- **Final decision:** A
- **Refinement / rationale:** Multiple/alternative routes were allowed later, but only after the core flow; learned routes are a differentiator, not a prerequisite.


# Round 2: Questions 11–20

## Q11. Who has final manual authority over official gate status?
- **A.** Any Driver
- **B.** Admin
- **C.** Trader
- **D.** Whoever reported it first
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Routine consensus may auto-confirm later; Admin can manually override.

## Q12. What should happen when a Driver reports a blocked checkpoint?
- **A.** Immediately mark the whole route closed
- **B.** Create a pending incident/report requiring verification or corroboration
- **C.** Ignore it until another Driver reports it
- **D.** Send only a chat message
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q13. What gate statuses should you support?
- **A.** Open / Closed only
- **B.** Open / Congested / Blocked / Closed
- **C.** 15 different statuses
- **D.** Free text
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q14. What should Drivers submit with a gate report?
- **A.** Status only
- **B.** Status + location + timestamp + note + optional photo
- **C.** Photo only
- **D.** Long written report
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q15. How should shipments relate to routes?
- **A.** Every shipment has one active route
- **B.** Every shipment simultaneously follows several routes
- **C.** Shipments do not store routes
- **D.** Driver chooses randomly
- **Original recommendation:** A
- **Final decision:** A
- **Refinement / rationale:** Route history and alternatives are stored separately; active_route_id represents current route.

## Q16. Who should approve a reroute after a gate closure?
- **A.** Trader
- **B.** Driver alone
- **C.** Admin
- **D.** Automatically reroute every shipment
- **Original recommendation:** C
- **Final decision:** B
- **Refinement / rationale:** Superseded later: Driver owns operational routing and can reroute their assigned shipment without Admin approval; route change is logged and visible.

## Q17. How should OpenRouteService be used?
- **A.** Make it the entire logistics backend
- **B.** Use it to calculate/display route geometry while your app owns shipment state
- **C.** Store everything inside ORS
- **D.** Do not maintain route data yourself
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q18. What happens if OpenRouteService fails during the presentation?
- **A.** Demo fails
- **B.** Use saved/cached route coordinates or GeoJSON fallback
- **C.** Restart the presentation
- **D.** Remove the map completely
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q19. What should happen when the Driver is offline and reports a gate problem?
- **A.** Report disappears
- **B.** Save locally as UNSYNCED and upload when internet returns
- **C.** Driver cannot use the application
- **D.** Immediately notify Admin somehow
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q20. How far should multiple-route functionality go for the core prototype?
- **A.** Full automatic dynamic route optimization
- **B.** Primary route + alternative/Driver reroute with history
- **C.** No route concept at all
- **D.** AI dynamically invents routes
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Later expanded with observed/unmapped routes and route recommendations after core requirements are stable.


# Round 3: Questions 21–30

## Q21. What should be the core Supabase tables?
- **A.** users, shipments only
- **B.** profiles, shipments, routes, gates, gate_reports, shipment_events, alerts, documents
- **C.** One giant logistics_data table
- **D.** Separate database for every role
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Later expanded with route_points, route_traversals and incidents. Gates are hybrid: predefined known gates plus temporary Driver-discovered checkpoints.

## Q22. Where should user roles be stored?
- **A.** React local storage only
- **B.** profiles table linked to Supabase Auth
- **C.** Hardcoded in frontend files
- **D.** Browser cookies only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q23. What should the shipments table contain?
- **A.** Only shipment name
- **B.** Trader, Driver, route, cargo, origin/destination, current state and timestamps
- **C.** Every GPS coordinate ever recorded
- **D.** Gate reports and notifications inside the same row
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q24. Where should shipment history be stored?
- **A.** Overwrite shipment.status and keep no history
- **B.** Separate shipment_events table
- **C.** One huge text string
- **D.** Store history in React
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q25. How should GPS location be represented?
- **A.** Only one current latitude/longitude
- **B.** Current position plus GPS/history events or batches
- **C.** Driver types city name
- **D.** Screenshots of maps
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q26. Where should Driver-uploaded photos be stored?
- **A.** Huge binary values in PostgreSQL
- **B.** Supabase Storage with paths/metadata in documents or reports
- **C.** Driver phone only
- **D.** React source folder
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q27. Where should important business logic live?
- **A.** React only
- **B.** FastAPI/backend services
- **C.** CSS
- **D.** Browser local storage
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q28. Should React directly access Supabase?
- **A.** Never
- **B.** Yes for safe auth/realtime/read operations under RLS; privileged actions go through FastAPI
- **C.** React should have the server secret key
- **D.** Everything must go through Python, including simple subscriptions
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q29. How should alerts work?
- **A.** Hardcoded popup
- **B.** Store alerts in DB and use Supabase Realtime to update relevant UIs
- **C.** Send emails only
- **D.** Refresh browser every minute
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q30. How should your five people divide the actual coding?
- **A.** Everyone codes everything
- **B.** Divide by ownership against one shared schema/API contract
- **C.** Each builds a separate prototype
- **D.** One person codes while four prepare slides
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 4: Questions 31–40

## Q31. What should the Admin see immediately after login?
- **A.** Blank dashboard with menu links
- **B.** Shipment summary + active gate issues + pending Driver reports + alerts
- **C.** Only user management
- **D.** Raw database tables
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q32. What should happen when Admin opens a pending Driver gate report?
- **A.** Only show its text
- **B.** Show location, photo, Driver, shipment, timestamp, note and review controls
- **C.** Automatically approve it
- **D.** Delete it after reading
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q33. Should Admin be allowed to create a gate without a Driver report?
- **A.** Yes
- **B.** No
- **C.** Only after two Driver reports
- **D.** Only Traders can create gates
- **Original recommendation:** A
- **Final decision:** A
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q34. What should the Trader dashboard prioritize?
- **A.** All Drivers in the system
- **B.** Trader’s own shipments, current status, map, timeline and alerts
- **C.** System administration
- **D.** Gate approval
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q35. What should a Trader see on shipment detail?
- **A.** Tracking number only
- **B.** Cargo + Driver + route/map + timeline + current status + related alerts
- **C.** Admin controls
- **D.** Backend logs
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q36. What should the Driver home screen emphasize?
- **A.** Analytics
- **B.** Currently assigned shipment and large operational action buttons
- **C.** All company shipments
- **D.** User management
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q37. How should a Driver report a completely new checkpoint?
- **A.** Force selection of an existing gate
- **B.** Report New Checkpoint captures location and asks for status, note and optional photo
- **C.** Type coordinates manually
- **D.** Call Admin instead
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q38. What should happen when multiple Drivers report approximately the same temporary gate?
- **A.** Always create separate gates
- **B.** Show possible nearby match and allow association/merge into one gate/incident
- **C.** Delete later reports
- **D.** Automatically ban duplicate reports
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q39. What should happen after a temporary checkpoint disappears?
- **A.** Delete everything
- **B.** Mark it resolved/archived and stop active warnings while preserving history
- **C.** Leave it permanently blocked
- **D.** Driver deletes it directly
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q40. How many screens should your team build before polishing?
- **A.** 20+ screens
- **B.** Minimum screens needed for one complete demo journey
- **C.** Every possible logistics screen
- **D.** Build every role simultaneously without prioritizing
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 5: Questions 41–50

## Q41. What should the Admin map show?
- **A.** Every user home address
- **B.** Active trucks, routes, known gates, temporary checkpoints and incidents
- **C.** Only Myanmar base map
- **D.** Only one truck
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q42. What should the Trader map show?
- **A.** Every truck
- **B.** Only their shipment, route, truck position and relevant disruptions
- **C.** Every checkpoint in Myanmar
- **D.** Driver private GPS history
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q43. What should the Driver map show?
- **A.** All customer shipments
- **B.** Current location, assigned/available routes, destination and relevant checkpoints
- **C.** Only destination
- **D.** Admin analytics
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q44. How should simulated truck movement work during the presentation?
- **A.** Wait for real GPS movement
- **B.** Use predefined route coordinates with controlled manual/step simulation
- **C.** Move icon randomly
- **D.** Let ORS decide every few seconds
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q45. What should be the most impressive moment in the live demo?
- **A.** Logging in
- **B.** Driver discovers checkpoint → reports → incident confirmed → Trader map/alert updates
- **C.** Opening database
- **D.** Showing source code
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q46. Who should perform the live demo?
- **A.** All 5 constantly switch laptops
- **B.** 1–2 operators while others explain specific sections
- **C.** Only backend developer
- **D.** Everyone clicks simultaneously
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q47. How should you demonstrate realtime updates?
- **A.** Tell audience they exist
- **B.** Keep role views open and visibly show one action propagating
- **C.** Refresh everything manually
- **D.** Show screenshots
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q48. What if internet access fails during the demo?
- **A.** Stop presentation
- **B.** Have cached routes, seeded data and an offline/demo fallback path
- **C.** Depend entirely on external APIs
- **D.** Explain what should have happened
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q49. What if the Driver reports an incorrect checkpoint?
- **A.** Immediately notify everyone as fact
- **B.** Keep it pending/unverified until corroborated or reviewed
- **C.** Delete the Driver
- **D.** Ignore Driver reports
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q50. What should happen if Admin rejects a Driver report?
- **A.** Delete all evidence
- **B.** Keep report history as rejected; official gate state unchanged; optional reason
- **C.** Mark gate closed anyway
- **D.** Alert Trader that route is blocked
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 6: Questions 51–60

## Q51. What exactly should offline mode mean in the prototype?
- **A.** Whole system works fully offline forever
- **B.** Driver actions are stored locally while disconnected and synchronized later
- **C.** Only map works offline
- **D.** Show offline label but do nothing
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q52. Which Driver actions should be allowed while offline?
- **A.** Nothing
- **B.** Status update, checkpoint report, location update, notes and queued photo metadata/files
- **C.** Admin approval
- **D.** Trader shipment creation
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q53. Where should offline Driver actions be stored?
- **A.** Supabase
- **B.** IndexedDB/local browser storage until synchronization
- **C.** React component state only
- **D.** Python memory
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Explicit final choice: IndexedDB.

## Q54. What should happen when internet connection returns?
- **A.** Delete offline records
- **B.** Sync queued actions in order/independently, mark success, retain failures for retry
- **C.** Ask Driver to re-enter everything
- **D.** Upload only most recent action
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q55. What if a Driver reports a new checkpoint while offline?
- **A.** Ignore it
- **B.** Capture GPS/location if available, timestamp, note/photo and temporary local ID in IndexedDB, then sync later
- **C.** Immediately create official gate
- **D.** Change route locally for everyone
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** GPS can work without internet; if geolocation fails, allow manual pin/location fallback. Demo can simulate coordinates.

## Q56. What should happen when a newly approved/confirmed checkpoint affects the active route?
- **A.** Automatically reroute with no Driver control
- **B.** Mark route disrupted and let Driver choose/reroute operationally
- **C.** End shipment
- **D.** Ignore checkpoint
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Final model: system flags disruption/recommendations; Driver can reroute immediately without Admin approval.

## Q57. Should the Driver be able to choose/suggest an alternate route without Admin approval?
- **A.** No, never
- **B.** Yes; Driver owns operational routing and changes are logged/visible
- **C.** Driver can silently reroute with no record
- **D.** Trader chooses road
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Final decision explicitly removes Admin approval requirement.

## Q58. What should happen to the old route after rerouting?
- **A.** Delete it
- **B.** Keep it in route history and mark the new route active
- **C.** Keep both active
- **D.** Replace every database record
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q59. What if the Driver reaches a gate that is not on the planned route?
- **A.** Prevent reporting it
- **B.** Allow reporting because field reality may differ from planned route data
- **C.** Automatically reject it
- **D.** Change destination
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q60. How complicated should route intelligence become?
- **A.** Build automatic national route optimization
- **B.** Stop at simple primary/alternative and Driver rerouting
- **C.** Build traffic prediction
- **D.** Add AI route forecasting/recommendation
- **Original recommendation:** B
- **Final decision:** D
- **Refinement / rationale:** User chose D. Final constraint: AI/recommendation engine may suggest/explain routes, but Driver always decides; keep the implementation heuristic and optional after core features.


# Round 7: Questions 61–70

## Q61. Can a Driver edit an official confirmed gate status?
- **A.** Yes
- **B.** No; Driver submits observations, while system/Admin manages authoritative status
- **C.** Only while driving
- **D.** Driver and Trader can
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q62. Can the Driver reroute their own assigned shipment?
- **A.** No
- **B.** Yes, without Admin approval, but route change is logged
- **C.** Only Trader can approve
- **D.** Only AI decides
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q63. Can a Driver reroute another Driver’s shipment?
- **A.** Yes
- **B.** No
- **C.** Only if nearby
- **D.** Only during emergencies
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q64. Can a Trader see another Trader’s cargo?
- **A.** Yes
- **B.** No; only their own shipments
- **C.** Only on Admin map
- **D.** Yes but hide cargo names
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q65. Can a Trader change the Driver’s route?
- **A.** Yes
- **B.** No; Trader tracks cargo but does not control field routing
- **C.** Only if delayed
- **D.** Always
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q66. Can Admin see all active trucks?
- **A.** No
- **B.** Yes
- **C.** Only blocked trucks
- **D.** Only one region
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q67. Can Admin manually change a Driver’s route?
- **A.** Never
- **B.** Yes, as an exceptional operational override with audit reason
- **C.** Every change must come from Admin
- **D.** Admin should not see routes
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q68. What happens if Driver and Admin/system disagree about a gate?
- **A.** Driver silently overwrites official state
- **B.** Driver submits a new observation; official state changes only via evidence rules/Admin override
- **C.** Delete both records
- **D.** Trader decides
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q69. Who can see uploaded Driver documents?
- **A.** Everyone
- **B.** Relevant Driver + shipment Trader + authorized Admin
- **C.** Every Trader
- **D.** Public internet
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q70. Who should be allowed to mark the shipment DELIVERED?
- **A.** Trader
- **B.** Assigned Driver with timestamp/location/proof
- **C.** Anyone
- **D.** Only Admin
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 8: Questions 71–80

## Q71. Should route confidence be global?
- **A.** Yes, one score for everyone
- **B.** No; confidence/recommendation can consider context such as vehicle type
- **C.** Only Admin has score
- **D.** No score at all
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q72. What should reinforce a route most?
- **A.** Driver selecting it
- **B.** Successfully completing a real traversal
- **C.** Admin viewing it
- **D.** Trader liking it
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q73. Should one Driver travelling a route repeatedly be enough to confirm it?
- **A.** Yes
- **B.** No; require multiple unique Drivers
- **C.** One trip is enough
- **D.** Admin decides every time
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q74. What should reduce route confidence?
- **A.** Nothing
- **B.** Recent blockages, failed journeys and long inactivity
- **C.** Driver changing phones
- **D.** Trader changing cargo
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q75. Should an unconfirmed route be hidden from other Drivers?
- **A.** Yes
- **B.** No; show it clearly labeled unconfirmed
- **C.** Only Admin sees it
- **D.** Delete until verified
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q76. Should the system automatically select the highest-confidence route?
- **A.** Yes without asking
- **B.** No; recommend routes and Driver makes final decision
- **C.** Admin makes final decision
- **D.** Trader chooses
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q77. What should a Driver see when choosing among routes?
- **A.** Only route names
- **B.** Distance + confidence + recent incidents + last successful use
- **C.** Only distance
- **D.** A single AI answer
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q78. Should route confidence decay over time?
- **A.** No
- **B.** Yes
- **C.** Only manually
- **D.** Delete routes after one month
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q79. Should blocked status and confidence be the same number/state?
- **A.** Yes
- **B.** No; operational condition and route trust are separate
- **C.** Only for temporary routes
- **D.** Remove status entirely
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q80. How far should you implement the ant-colony idea in this prototype?
- **A.** Build full academic Ant Colony Optimization
- **B.** Implement simple pheromone-inspired confidence/recommendation rules
- **C.** Only mention ants in slides
- **D.** Replace ORS completely
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 9: Questions 81–90

## Q81. How should a Driver-created route be stored?
- **A.** One text field
- **B.** Route record plus ordered GPS breadcrumb points
- **C.** Screenshot only
- **D.** Only on Driver phone
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q82. When should breadcrumb recording start?
- **A.** Every time app is open
- **B.** When Driver starts trip or intentionally starts route tracking
- **C.** Only after delivery
- **D.** Always in background forever
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q83. What should count as a successful route traversal?
- **A.** Driver clicked route
- **B.** Driver actually travelled most of route and reached intended waypoint/destination
- **C.** Admin viewed it
- **D.** Trader received alert
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q84. How should the system recognize that two Drivers used roughly the same route?
- **A.** Exact coordinate-for-coordinate match
- **B.** Compare GPS paths within a reasonable distance tolerance
- **C.** Same route name only
- **D.** Ask Admin every time
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q85. What should happen when a Driver’s GPS data is clearly impossible?
- **A.** Trust it
- **B.** Reject/flag impossible jumps and exclude from reinforcement
- **C.** Confirm route
- **D.** Delete Driver
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q86. Should every successful Driver trip add the same amount of confidence?
- **A.** Yes
- **B.** Mostly yes for prototype simplicity, but only valid completed trips count
- **C.** Build complicated ML model
- **D.** Only Admin trips count
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q87. How do you stop fake repeated trips from confirming a route?
- **A.** Do not
- **B.** Require multiple unique Drivers and valid GPS movement
- **C.** Trust each Driver forever
- **D.** Require Trader approval
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q88. What if Drivers report contradictory conditions on the same route?
- **A.** Newest report is absolute truth
- **B.** Preserve observations and mark condition uncertain until more evidence arrives
- **C.** Delete one
- **D.** Ask Trader
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q89. Should Driver reputation affect route confidence?
- **A.** Build full reputation system
- **B.** Not in V1; validate evidence rather than ranking people
- **C.** Only Admin decides reputation
- **D.** Automatically distrust new Drivers
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q90. What is the minimum database addition for ant-style route learning?
- **A.** 15 new tables
- **B.** Add route_points, route_traversals and route metrics
- **C.** Replace entire database
- **D.** Store everything in shipments
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 10: Questions 91–100

## Q91. Should shipments directly contain the whole route history?
- **A.** Yes, everything in one row
- **B.** No; shipment stores current route while changes/traversals are separate
- **C.** Store route history in React
- **D.** Do not store history
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q92. What should the final route-related database model be?
- **A.** routes only
- **B.** routes + route_points + route_traversals
- **C.** One table per Driver
- **D.** GPS data in profiles
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q93. What should happen when a Driver starts travelling with no known route?
- **A.** Block Driver
- **B.** Create a temporary observed-route session and record breadcrumbs
- **C.** Ask Admin to create road
- **D.** Fake an ORS route
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q94. When should an observed path become reusable by other Drivers?
- **A.** Only after full confirmation
- **B.** After a valid completed traversal, clearly labeled UNCONFIRMED
- **C.** Never
- **D.** After Admin approval only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q95. What API pattern should record Driver GPS movement?
- **A.** One request every second forever
- **B.** Batch GPS points periodically and support offline queuing
- **C.** Only upload after delivery
- **D.** Put coordinates in URL
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q96. What API should handle unexpected checkpoints?
- **A.** One generic /update endpoint
- **B.** Dedicated gate-report endpoints
- **C.** Direct SQL from React
- **D.** Put checkpoint data inside route name
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q97. How should Driver rerouting be recorded?
- **A.** Just overwrite active_route_id
- **B.** Create event/traversal history with old/new route, Driver, time and reason
- **C.** Do not record it
- **D.** Ask Admin
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q98. Where should pheromone/confidence calculation happen?
- **A.** React
- **B.** FastAPI/backend service
- **C.** CSS
- **D.** Driver manually enters score
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q99. Should confidence be recalculated on every map render?
- **A.** Yes
- **B.** No; recalculate on meaningful events and store/update result
- **C.** Only once
- **D.** Trader calculates it
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q100. What should be the single end-to-end backend flow your team gets working first?
- **A.** AI routing algorithm
- **B.** Trader shipment → assignment → movement → checkpoint report → alert → reroute → delivery
- **C.** User profile editing
- **D.** Analytics dashboard
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 11: Questions 101–110

## Q101. What is absolutely mandatory for V1?
- **A.** RBAC, shipment lifecycle, maps, gate reports, alerts, offline simulation/implementation
- **B.** AI forecasting, analytics, payments, OCR
- **C.** Full production compliance
- **D.** Everything discussed so far
- **Original recommendation:** A
- **Final decision:** A
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q102. Should learned/pheromone routes be required for the live demo?
- **A.** Yes; demo fails without them
- **B.** No; build only after core logistics flow works
- **C.** Replace normal routing with them
- **D.** Remove them completely
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q103. How much AI route recommendation should V1 contain?
- **A.** Full ML model
- **B.** Simple confidence scoring + recommended routes
- **C.** No explanation
- **D.** Train a custom LLM
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q104. Should you implement real background/mobile GPS?
- **A.** Yes, production mobile GPS plus a simulated fallback
- **B.** No; simulation only
- **C.** Build native Android services only
- **D.** Remove GPS
- **Original recommendation:** B
- **Final decision:** A
- **Refinement / rationale:** Explicit user decision: implement real/live device GPS and simulated GPS fallback. Keep simulation as demo-safe path because assignment only mandates simulated GPS.

## Q105. How much offline capability should V1 implement?
- **A.** Complete offline-first application
- **B.** IndexedDB queue + reconnect sync demonstration
- **C.** No offline logic
- **D.** Offline maps for all Myanmar
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q106. How many shipment scenarios should you prepare?
- **A.** 20 realistic shipments
- **B.** One perfect golden-path demo + 1–2 seeded examples
- **C.** Randomly generate hundreds
- **D.** Only empty screens
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q107. How many known gates/routes should you seed?
- **A.** Every gate in Myanmar
- **B.** Small representative set plus dynamic temporary checkpoints
- **C.** None
- **D.** Hundreds of fake gates
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q108. Should document uploads include OCR/document verification?
- **A.** Yes
- **B.** No; upload/display reliably first
- **C.** Train customs-document model
- **D.** Remove uploads
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q109. How much analytics should Admin dashboard contain?
- **A.** Advanced forecasting/BI
- **B.** Simple counts/status cards and operational map
- **C.** No dashboard
- **D.** Full financial analytics
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q110. If time runs short, what is the correct feature-cutting order?
- **A.** Remove core assignment features first
- **B.** Cut advanced extensions before required features
- **C.** Keep route AI and remove RBAC
- **D.** Remove live demo and explain idea
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 12: Questions 111–120

## Q111. What should the team build first?
- **A.** Five separate screens in parallel
- **B.** Shared design package + schema/API contract + one shipment golden path
- **C.** Slides
- **D.** Pheromone algorithm
- **Original recommendation:** B
- **Final decision:** CUSTOM
- **Refinement / rationale:** Before B, create V1 architecture diagram, functional diagram, use-case/usage diagram, class diagram and ER diagram in Mermaid/HTML. Then freeze schema/API and build the golden path.

## Q112. Who should own the shared technical contract?
- **A.** Everyone changes it freely
- **B.** Person 1 + Person 3 jointly own it
- **C.** Frontend only
- **D.** Nobody
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q113. What should Person 3 build before frontend developers depend on them?
- **A.** Every backend feature
- **B.** Database migrations + seeded users + basic shipment endpoints + API docs
- **C.** AI routing first
- **D.** Analytics
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q114. What should Person 2 build while backend is being prepared?
- **A.** Wait
- **B.** Admin/Trader UI against agreed mock JSON
- **C.** Change schema independently
- **D.** Build Python
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q115. What should Person 4 build first?
- **A.** Full pheromone algorithm
- **B.** Shared map component + simulated GPS + live GPS mode
- **C.** Admin dashboard
- **D.** Slides
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q116. What should Person 5 test first?
- **A.** Colors/fonts
- **B.** Golden-path integration across all three roles
- **C.** Advanced AI
- **D.** Presentation animations
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q117. How should Git workflow work with five people?
- **A.** Everyone commits to main
- **B.** Short-lived feature branches + review + protected stable branch/tag
- **C.** Five separate repos
- **D.** Send ZIP files
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q118. When should integration happen?
- **A.** Final night
- **B.** Continuously from the first vertical flow
- **C.** After every feature is finished
- **D.** During presentation
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q119. What should happen when AI-generated code causes integration problems?
- **A.** Keep adding prompts until code grows
- **B.** Reduce to smallest failing case, inspect contracts, then request targeted fix
- **C.** Rewrite whole project
- **D.** Hide bug
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q120. What should implementation order be?
- **A.** Maps → AI → UI → DB → auth
- **B.** Foundation → shipment → maps → gate workflow → offline → learned routes → polish
- **C.** Pheromone first
- **D.** Everyone chooses independently
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 13: Questions 121–130

## Q121. What should the full V1 shipment lifecycle be?
- **A.** ACTIVE → DONE
- **B.** REQUESTED → ASSIGNED → PICKED_UP → IN_TRANSIT → AT_CHECKPOINT → CUSTOMS → DELIVERED
- **C.** 25 detailed statuses
- **D.** Driver types any status
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Later includes CANCELLED as terminal non-delivery state.

## Q122. Who creates a REQUESTED shipment?
- **A.** Admin only
- **B.** Trader
- **C.** Driver
- **D.** AI
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q123. Who changes REQUESTED → ASSIGNED?
- **A.** Trader
- **B.** Admin
- **C.** Driver
- **D.** Automatically
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q124. Who changes ASSIGNED → PICKED_UP?
- **A.** Driver
- **B.** Trader
- **C.** Admin only
- **D.** System timer
- **Original recommendation:** A
- **Final decision:** A
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q125. Who controls normal operational shipment updates after pickup?
- **A.** Admin
- **B.** Assigned Driver
- **C.** Trader
- **D.** Everyone
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q126. What if Driver encounters multiple checkpoints?
- **A.** AT_CHECKPOINT can only happen once
- **B.** Keep current_status simple and create shipment_event for each checkpoint
- **C.** Create CHECKPOINT_1/2/3 statuses
- **D.** Ignore later checkpoints
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q127. Should the system allow backward/nonlinear state transitions?
- **A.** Never
- **B.** Yes when operationally valid, with event history/reason
- **C.** Any role can change freely
- **D.** Delete previous events
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q128. What if Driver skips a state?
- **A.** Reject every skipped state
- **B.** Allow reasonable transition and infer/log intermediate event where appropriate
- **C.** Mark shipment corrupted
- **D.** Require Admin approval
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q129. What should happen when shipment is delayed?
- **A.** Use DELAYED as main lifecycle state
- **B.** Keep lifecycle status and delay condition separate
- **C.** Change status to ERROR
- **D.** Do nothing
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q130. What exactly should mark a shipment complete?
- **A.** Driver clicks DELIVERED only
- **B.** Assigned Driver confirms delivery with timestamp, location and proof photo
- **C.** Admin closes every shipment
- **D.** Trader viewing it
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 14: Questions 131–140

## Q131. Should all five diagrams be created before heavy coding?
- **A.** No; diagrams only for presentation
- **B.** Yes; create V1 diagrams first and update as implementation changes
- **C.** Only ER matters
- **D.** Create after everything is finished
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q132. What should the Architecture Diagram primarily show?
- **A.** Database columns
- **B.** Major technical components and data flow
- **C.** Every React component
- **D.** Only users
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q133. What should the Functional Diagram show?
- **A.** Classes/methods
- **B.** Business processes and information flow
- **C.** SQL relationships
- **D.** Deployment servers
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q134. What should the Use-Case Diagram focus on?
- **A.** Database tables
- **B.** What Admin, Trader and Driver are allowed to do
- **C.** CSS components
- **D.** Python functions
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q135. Should Use-Case Diagram show Admin approving Driver reroutes?
- **A.** Yes
- **B.** No
- **C.** Only if Trader requests
- **D.** Always
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q136. What should the ER Diagram represent?
- **A.** Python classes
- **B.** Persistent entities and relationships in Supabase/PostgreSQL
- **C.** React components
- **D.** User navigation
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q137. What should the Class Diagram represent?
- **A.** Copy ER exactly
- **B.** Domain objects and application services including behavior
- **C.** Database indexes
- **D.** HTML pages only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q138. Where should pheromone/route-learning logic appear in diagrams?
- **A.** Everywhere
- **B.** Architecture + Class + Functional diagrams, marked as extension
- **C.** Nowhere
- **D.** Only ER
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q139. Should Mermaid files be generated once and forgotten?
- **A.** Yes
- **B.** No; keep source under version control and update it
- **C.** Delete source after PNG
- **D.** Only Person 1 sees them
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q140. How should diagrams be used during the 30-minute presentation?
- **A.** Explain every table/class for 15 minutes
- **B.** Show only diagrams that support the story; keep details for Q&A
- **C.** Do not show architecture
- **D.** Read Mermaid code aloud
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 15: Questions 141–150

## Q141. Should all three roles use the exact same map data?
- **A.** Yes, everyone sees everything
- **B.** Same base map component with role-specific layers
- **C.** Three separate map systems
- **D.** Only Driver gets map
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q142. How should different route types appear?
- **A.** All identical
- **B.** Visually distinguish planned, active, Driver-observed and disrupted routes
- **C.** Only active route
- **D.** Use route names only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q143. Should GPS breadcrumbs always be visible?
- **A.** Yes, every coordinate
- **B.** No; show current position by default and allow history/trail when useful
- **C.** Never show breadcrumbs
- **D.** Only Admin sees location
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q144. How should an unexpected temporary checkpoint appear?
- **A.** As confirmed gate immediately
- **B.** Clearly unverified/pending until confirmed
- **C.** Hidden until Admin approval
- **D.** As part of route line
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q145. What should happen when several reports refer to roughly the same checkpoint?
- **A.** Show overlapping markers
- **B.** Combine visually under one checkpoint/incident with multiple observations
- **C.** Delete all except newest
- **D.** Hide them
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q146. How should learned routes display confidence?
- **A.** Raw decimal only
- **B.** Simple confidence levels with detailed score on click
- **C.** Do not show confidence
- **D.** Only Admin sees confidence
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q147. What should map do if Driver leaves every known route?
- **A.** Display error and stop tracking
- **B.** Continue GPS tracking and begin observed-route trail
- **C.** Force Driver back
- **D.** Automatically mark delayed
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q148. Should ORS routes and Driver-observed routes be treated equally?
- **A.** Yes
- **B.** Both are candidates, but source/confidence remain visible
- **C.** Driver routes always win
- **D.** ORS always wins
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q149. How should map clutter be controlled?
- **A.** Show everything simultaneously
- **B.** Role-based layers, zoom detail, filters and selected-item focus
- **C.** Remove information permanently
- **D.** Separate page for every marker
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q150. What should happen when Driver taps a route on map?
- **A.** Immediately switch route
- **B.** Show route details first, then explicit Use This Route action
- **C.** Ask Admin
- **D.** Nothing
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 16: Questions 151–160

## Q151. Who should receive a Driver’s new checkpoint report immediately?
- **A.** Everyone
- **B.** Admin/operations immediately; affected Trader after relevant confirmation
- **C.** Trader only
- **D.** Nobody until delivery
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q152. Should every Driver report create a Trader alert?
- **A.** Yes
- **B.** No; only reports/incidents affecting that Trader’s shipment/route
- **C.** Only if Driver asks
- **D.** Only once/day
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q153. What alert severity levels should V1 have?
- **A.** One generic type
- **B.** INFO / WARNING / CRITICAL
- **C.** Ten levels
- **D.** Free-text severity
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q154. What should happen when multiple reports describe the same disruption?
- **A.** Send one alert per report
- **B.** Update one existing incident/alert rather than spam duplicates
- **C.** Ignore later reports
- **D.** Delete original alert
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q155. Should Admin be able to broadcast a manual alert?
- **A.** No
- **B.** Yes; all users, routes or affected shipments/audiences
- **C.** Only Drivers
- **D.** Email only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q156. What happens when a Driver changes route?
- **A.** No notification
- **B.** Log change; Admin and affected Trader see update/lightweight notification
- **C.** Critical alert every time
- **D.** Admin must approve first
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q157. What happens when a route becomes BLOCKED?
- **A.** Only change marker
- **B.** Update route/incident state, find affected shipments, create alerts and update maps
- **C.** Generic message to everyone
- **D.** Delete route
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q158. What happens when disruption is resolved?
- **A.** Leave warning forever
- **B.** Mark resolved, stop active warning and optionally notify affected users
- **C.** Delete history
- **D.** Recreate route
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q159. Should alerts disappear after being read?
- **A.** Yes
- **B.** No; mark read and preserve history
- **C.** Delete after 30 seconds
- **D.** Store only unread
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q160. How should realtime notification delivery work?
- **A.** Browser refresh only
- **B.** Store alert in Supabase then realtime subscription updates React; refresh/poll fallback
- **C.** SMS only
- **D.** AI chatbot
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 17: Questions 161–170

## Q161. What should be the lifecycle of a gate incident?
- **A.** OPEN → CLOSED only
- **B.** PENDING → CONFIRMED/UNCERTAIN → RESOLVED → ARCHIVED
- **C.** Free text only
- **D.** Delete after resolution
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q162. What should happen when the first Driver reports a new blockage?
- **A.** Immediately make official
- **B.** Create a PENDING incident/report
- **C.** Ignore it
- **D.** Alert every user
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q163. What if a second Driver independently reports the same blockage?
- **A.** Create completely separate incident
- **B.** Attach to same incident and increase confidence
- **C.** Delete first report
- **D.** Archive both
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q164. Should multiple matching Driver reports ever auto-confirm an incident?
- **A.** Never
- **B.** Yes, optionally after a clear threshold such as 2 unique Drivers in a recent window near same location
- **C.** One report is enough
- **D.** Only Trader can confirm
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q165. What if two Drivers report opposite conditions?
- **A.** Use whichever came first
- **B.** Mark incident UNCERTAIN/conflicting and wait for more evidence
- **C.** Delete both
- **D.** Trader chooses
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q166. Who can manually override incident status?
- **A.** Any Driver
- **B.** Admin
- **C.** Trader
- **D.** Nobody
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q167. What should happen when Drivers report a previously blocked gate is clear?
- **A.** Immediately delete blockage
- **B.** Create CLEAR observations and move toward RESOLVED when enough evidence exists
- **C.** Ignore them
- **D.** Keep blocked forever
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q168. Should resolved incidents still affect route confidence?
- **A.** No, forget completely
- **B.** Yes, as historical evidence with reduced weight over time
- **C.** Permanently punish route
- **D.** Permanently block route
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q169. Should Admin have to approve every incident resolution?
- **A.** Yes, always
- **B.** No; repeated clear evidence may auto-resolve, Admin handles exceptions
- **C.** Never allow Admin involvement
- **D.** Trader approves
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q170. What should be the source of truth for current route/gate condition?
- **A.** Latest Driver message only
- **B.** Aggregated incident state derived from reports plus Admin overrides
- **C.** Trader comments
- **D.** OpenRouteService only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 18: Questions 171–180

## Q171. What should starting confidence be for a brand-new Driver-observed route?
- **A.** 0
- **B.** 20
- **C.** 50
- **D.** 100
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q172. How much should one successful traversal add?
- **A.** +1
- **B.** +10
- **C.** +50
- **D.** +100
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q173. Should a successful traversal by a new unique Driver add an extra bonus?
- **A.** No
- **B.** Yes, +10 extra
- **C.** +100 extra
- **D.** Only Admin counts
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q174. At what confidence should a route become automatically CONFIRMED?
- **A.** 30
- **B.** 50, and at least 2 unique successful Drivers
- **C.** 100 only
- **D.** Never automatically
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q175. How much should a confirmed blockage penalize route confidence?
- **A.** -2
- **B.** -20
- **C.** -100 permanently
- **D.** No penalty
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q176. Should an unverified Driver blockage report immediately reduce confidence?
- **A.** Yes, heavily
- **B.** Only slightly or not at all until corroborated/confirmed
- **C.** Set confidence to zero
- **D.** Delete route
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q177. How should time decay work?
- **A.** Reduce every minute
- **B.** Mild decay after inactivity, e.g. -5 after each 30-day period beyond threshold
- **C.** Never decay
- **D.** Delete after 30 days
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q178. Should confidence ever reach zero?
- **A.** Yes and delete route
- **B.** It can become very low, but preserve route history
- **C.** Never below 50
- **D.** Always keep 100
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q179. How should route recommendations combine distance and confidence?
- **A.** Always choose shortest route
- **B.** Calculate recommendation score using confidence, incidents and distance
- **C.** Always highest confidence regardless of distance
- **D.** Let AI invent answer
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q180. Should you expose the exact algorithm to Drivers?
- **A.** Yes, full formula everywhere
- **B.** No; show understandable reasons, details for Admin/debugging
- **C.** Hide all reasoning
- **D.** Show only AI message
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 19: Questions 181–190

## Q181. How should the Driver choose GPS mode?
- **A.** Automatically with no control
- **B.** Explicit switch: LIVE GPS or DEMO SIMULATION
- **C.** Simulation only
- **D.** Live GPS only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q182. Should simulated GPS data affect learned-route confidence?
- **A.** Yes
- **B.** No; simulation must never reinforce production routes
- **C.** Only Admin decides
- **D.** Sometimes
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q183. What should happen if Driver denies GPS permission?
- **A.** App stops
- **B.** Show warning and allow retry/simulation/manual location fallback
- **C.** Enable GPS anyway
- **D.** Log out
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q184. How often should live GPS points be recorded?
- **A.** Every millisecond
- **B.** Controlled interval such as 5–15 seconds or meaningful movement threshold
- **C.** Once/hour
- **D.** Only at delivery
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q185. Should every GPS point immediately be sent to FastAPI?
- **A.** Yes
- **B.** No; buffer/batch points, especially for unstable internet
- **C.** Never send GPS data
- **D.** Only one final coordinate
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q186. What should happen when GPS accuracy is poor?
- **A.** Accept everything
- **B.** Store accuracy metadata and exclude very unreliable points from route learning
- **C.** Delete route
- **D.** Mark delivered
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q187. How should the simulator move the truck?
- **A.** Randomly around Myanmar
- **B.** Along predefined route points with start/pause/next/jump controls
- **C.** Teleport to destination
- **D.** Admin manually enters every coordinate
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q188. Should simulated and live GPS use different map components?
- **A.** Yes
- **B.** No; same tracking pipeline, different LocationProvider
- **C.** Live GPS has no map
- **D.** Simulation has no map
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q189. What happens when Driver loses internet but still has GPS?
- **A.** Stop tracking
- **B.** Continue recording GPS locally, then synchronize later
- **C.** Switch to simulation automatically
- **D.** Delete unsent locations
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q190. How should route-learning decide whether a traversal is eligible for reinforcement?
- **A.** Every traversal counts
- **B.** Require LIVE_GPS + valid movement + successful trip + reasonable path coverage
- **C.** Simulation counts twice
- **D.** Driver presses confirm route
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 20: Questions 191–200

## Q191. What kinds of uploads should V1 support?
- **A.** Any file type
- **B.** Checkpoint photo, customs/document photo, cargo photo and delivery proof
- **C.** Video uploads
- **D.** PDF only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q192. Where should uploaded files live?
- **A.** PostgreSQL binary fields
- **B.** Supabase Storage with metadata/path in DB
- **C.** Local phone only
- **D.** React public folder
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q193. Should uploaded files be publicly accessible?
- **A.** Yes
- **B.** No; private bucket with authorized/signed access
- **C.** Only checkpoint photos private
- **D.** Put on social media
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q194. What metadata should accompany a Driver photo?
- **A.** File only
- **B.** Shipment, uploader, type, timestamp, GPS if available and note
- **C.** Filename only
- **D.** Password
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q195. What if Driver takes checkpoint photo while offline?
- **A.** Reject it
- **B.** Keep photo locally and queue metadata/upload for synchronization
- **C.** Upload without internet
- **D.** Discard image
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q196. Should system compress large Driver photos before upload?
- **A.** No
- **B.** Yes; client-side resizing/compression for reasonable mobile size
- **C.** Convert to video
- **D.** Ask Admin
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q197. Should a Driver be able to hard-delete evidence after uploading it?
- **A.** Yes permanently
- **B.** Prefer no hard delete; allow replace/archive while retaining audit metadata
- **C.** Trader deletes it
- **D.** Everyone can delete it
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q198. What should happen when marking shipment DELIVERED?
- **A.** Status only
- **B.** Timestamp + GPS + delivery proof photo with optional note
- **C.** Admin approval every time
- **D.** Trader types delivered
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q199. What if delivery-proof upload fails while Driver is offline?
- **A.** Delivery cannot be recorded
- **B.** Record pending delivery locally, queue proof upload and sync later
- **C.** Lose photo
- **D.** Somehow write to Supabase without internet
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q200. Should you add OCR/document AI in V1?
- **A.** Yes, required
- **B.** No; reliable upload/display first, OCR future work
- **C.** Build OCR model
- **D.** Remove uploads
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 21: Questions 201–210

## Q201. What if OpenRouteService is unavailable during demo?
- **A.** Stop demo
- **B.** Fall back to cached/predefined route geometry
- **C.** Remove map
- **D.** Retry indefinitely
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q202. What if Supabase Realtime stops working?
- **A.** Whole system fails
- **B.** Keep DB correct and allow polling/manual refresh fallback
- **C.** Pretend alerts worked
- **D.** Restart during presentation
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q203. What if Supabase itself becomes unreachable?
- **A.** No fallback
- **B.** Keep seeded local/demo mode for golden-path scenario
- **C.** Switch databases live
- **D.** Rewrite backend
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q204. What if Driver real GPS fails?
- **A.** Stop tracking
- **B.** Switch to simulated GPS without changing rest of app
- **C.** Enter every coordinate manually
- **D.** Mark delivered
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q205. What if internet disconnects while Driver is travelling?
- **A.** Driver cannot do anything
- **B.** Continue GPS/status/reporting locally through IndexedDB and sync later
- **C.** Force logout
- **D.** Switch to Admin
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q206. What if synchronization partially fails?
- **A.** Mark everything failed
- **B.** Sync each queued item independently and retry only failed items
- **C.** Delete queue
- **D.** Ask Driver to recreate
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q207. What if same offline event accidentally syncs twice?
- **A.** Accept duplicate
- **B.** Use unique client_event_id/idempotency key
- **C.** Admin deletes duplicates later
- **D.** Ignore problem
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q208. What if an AI-generated code change breaks the stable demo?
- **A.** Keep fixing directly on main
- **B.** Maintain known-good demo branch/tag and test changes before merge
- **C.** Delete Git history
- **D.** Ask AI to rewrite app
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q209. What if live demo completely fails despite fallbacks?
- **A.** End presentation
- **B.** Have prerecorded golden-path demo as last-resort evidence
- **C.** Explain verbally for 15 minutes
- **D.** Show source code
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q210. What should team test immediately before presenting?
- **A.** Individual components only
- **B.** Exact 15-minute golden path from login through delivery, including a failure scenario
- **C.** Only Admin dashboard
- **D.** Only pheromone algorithm
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 22: Questions 211–220

## Q211. How should the 5-minute Problem & Solution section be structured?
- **A.** Spend all 5 minutes on logistics history
- **B.** Problem → workflow pain → solution → differentiator → simple architecture/functional visual
- **C.** Start with DB schema
- **D.** Explain every feature
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q212. Should you introduce the pheromone-route concept during first 5 minutes?
- **A.** Never mention it
- **B.** Yes, briefly as differentiator without algorithm deep dive
- **C.** Spend all 5 minutes on ant-colony optimization
- **D.** Present equations first
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q213. How should the 15-minute live demo begin?
- **A.** Admin dashboard
- **B.** Trader creating a real transport request
- **C.** Code
- **D.** Supabase tables
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q214. What should the 15-minute demo timeline be?
- **A.** Improvise
- **B.** Rehearse a tightly timed golden path
- **C.** Show every screen
- **D.** Each member demos separate feature
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q215. Should you intentionally demonstrate offline mode?
- **A.** No, mention only
- **B.** Yes; deliberately go offline, create update/report, reconnect and sync
- **C.** Turn off all presentation internet
- **D.** Screenshot only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q216. How should five people divide speaking?
- **A.** Everyone exactly 6 minutes
- **B.** Clear subject ownership with one narrator maintaining continuity
- **C.** One person 30 minutes
- **D.** Everyone interrupts when their feature appears
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q217. What should the 10-minute AI Engineering Reflection focus on?
- **A.** We used ChatGPT and saved time
- **B.** Actual AI workflow, prompts, failures, debugging, integration and architecture decisions
- **C.** Explain LLM math
- **D.** Show dozens of generated files
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q218. Should you admit AI-generated failures?
- **A.** No; make everything perfect
- **B.** Yes; show 2–3 real meaningful failures and how you diagnosed/fixed them
- **C.** Blame AI for every bug
- **D.** Only successful prompts
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q219. How much architecture should you show during reflection?
- **A.** Every class/column
- **B.** One clear architecture diagram; detailed ER/class only when supporting a point or Q&A
- **C.** No architecture
- **D.** Read code
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q220. How should the presentation end?
- **A.** That is all
- **B.** Return to Myanmar logistics problem, summarize demonstrated value, state next validation step
- **C.** End with DB schema
- **D.** End with AI prompt
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 23: Questions 221–230

## Q221. Should your team save AI prompts during development?
- **A.** No
- **B.** Yes; save representative prompts, outputs, failures and corrections
- **C.** Only screenshots
- **D.** Recreate later from memory
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q222. Which AI prompts are most worth saving?
- **A.** Every conversation
- **B.** Prompts that produced architecture, schema, UI, debugging and integration decisions
- **C.** Only perfect prompts
- **D.** Only short prompts
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q223. What should a strong coding prompt contain?
- **A.** Build my logistics app
- **B.** Context + exact task + constraints + existing schema/API + expected output
- **C.** Only technology names
- **D.** Motivational instructions
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q224. What kind of AI failure should you document?
- **A.** Only syntax errors
- **B.** Meaningful failures: invented APIs, wrong schema, security mistakes, integration mismatches
- **C.** Only funny hallucinations
- **D.** Do not document failures
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q225. How should you show a hallucination in presentation?
- **A.** Read entire conversation
- **B.** Problem → bad assumption → symptom → correction → lesson
- **C.** Say AI hallucinated sometimes
- **D.** Blame tool
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q226. Should AI-generated code be merged immediately?
- **A.** Yes
- **B.** No; review, run, test, fix, then integrate
- **C.** Only frontend needs testing
- **D.** AI code assumed correct
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q227. How should team measure whether AI helped?
- **A.** Claim 10x faster
- **B.** Use concrete observations of scaffolding/debugging gains and where manual review remained necessary
- **C.** No evidence needed
- **D.** Compare token counts
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q228. Who should own the AI engineering log?
- **A.** Nobody
- **B.** Person 5 collects it; every member contributes examples
- **C.** Backend only
- **D.** Presenter invents later
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q229. Should you show which AI tools each member used?
- **A.** No
- **B.** Yes, briefly, explaining what each was useful for
- **C.** Spend 5 minutes comparing brands
- **D.** Mention only ChatGPT regardless
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q230. What should be the main conclusion of AI Engineering Reflection?
- **A.** AI replaces developers
- **B.** AI accelerated implementation, but architecture, contracts, verification, integration and testing required human control
- **C.** Best model built project automatically
- **D.** Prompt length determines quality
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 24: Questions 231–240

## Q231. What should be the team’s highest-priority test?
- **A.** Individual component tests only
- **B.** Full end-to-end shipment lifecycle across all roles
- **C.** Pheromone score only
- **D.** UI colors
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q232. Should RBAC be tested only through UI?
- **A.** Yes
- **B.** No; test UI visibility and backend authorization/RLS
- **C.** Backend only
- **D.** No tests needed
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q233. What RBAC tests are mandatory?
- **A.** Successful login only
- **B.** Allowed and forbidden actions for all three roles
- **C.** Admin only
- **D.** Driver only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q234. How should shipment-state transitions be tested?
- **A.** Normal path only
- **B.** Normal, repeated, backward-valid and invalid transitions
- **C.** Let Driver type anything
- **D.** Only DELIVERED
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q235. What should be the key offline synchronization test?
- **A.** Turn off Wi-Fi and stop
- **B.** Queue several action types, reconnect, verify each syncs exactly once
- **C.** Queue one text message
- **D.** Test IndexedDB separately only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q236. Should duplicate-sync protection be tested?
- **A.** No
- **B.** Yes; send same client_event_id twice and verify one logical event
- **C.** Delete duplicates manually
- **D.** Only after deployment
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q237. How should route-learning tests work?
- **A.** Use simulation and let it confirm production routes
- **B.** Use controlled synthetic test data; production reinforcement still requires eligible real GPS traversals
- **C.** Manual only
- **D.** Skip tests
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q238. What should happen in testing when conflicting gate reports arrive?
- **A.** Latest wins
- **B.** Verify incident becomes uncertain/conflicted while preserving evidence
- **C.** Delete both
- **D.** Block Drivers
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q239. Who should own final acceptance testing?
- **A.** Person 5 alone
- **B.** Person 5 coordinates; all five run golden path at least once
- **C.** Backend only
- **D.** Presenter only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q240. What should qualify a build as demo-ready?
- **A.** It compiles
- **B.** Golden path passes repeatedly, RBAC/fallbacks work, no critical bugs remain
- **C.** UI looks good
- **D.** All planned features exist
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 25: Questions 241–250

## Q241. How should frontend be deployed?
- **A.** Run from developer laptop only
- **B.** Deploy React/Vite to Vercel with Git-based deployments
- **C.** Put React in FastAPI templates
- **D.** Send ZIP
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q242. How should FastAPI be deployed?
- **A.** Same browser bundle
- **B.** Separate backend web service such as Render
- **C.** Person 3 laptop during presentation
- **D.** Supabase Storage
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q243. How many environments should project have?
- **A.** Production only
- **B.** Local development + preview/test + stable demo/production
- **C.** One per person
- **D.** Ten
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q244. Which Supabase key should React receive?
- **A.** Secret key
- **B.** Publishable key
- **C.** Database password
- **D.** Postgres admin credentials
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q245. Where should Supabase secret key exist?
- **A.** React public env
- **B.** FastAPI/server environment only
- **C.** README
- **D.** Driver IndexedDB
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q246. How should environment variables be handled in Git?
- **A.** Commit .env
- **B.** Commit .env.example; gitignore real envs; store deployed secrets in hosting dashboards
- **C.** Paste into JS
- **D.** Share screenshot
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q247. Should demo mode use same mutable dataset as daily testing?
- **A.** Yes
- **B.** No; maintain predictable seeded demo data that can be reset
- **C.** Random data
- **D.** Empty DB before presenting
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q248. Should feature branches deploy automatically?
- **A.** No
- **B.** Yes; preview deployments for integration before stable merge
- **C.** Every branch replaces production
- **D.** Localhost only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q249. What if a secret key appears in Git or an AI prompt?
- **A.** Delete line and keep same key
- **B.** Treat as compromised: rotate/revoke, update envs and redeploy
- **C.** Rename variable
- **D.** Hide repository
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q250. What should final deployment topology be?
- **A.** Everything on one laptop
- **B.** Vercel React + Render FastAPI + Supabase + ORS + Device GPS + IndexedDB
- **C.** Five independent deployments
- **D.** Supabase only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 26: Questions 251–260

## Q251. Should profiles duplicate authentication credentials?
- **A.** Yes, store passwords again
- **B.** No; Supabase Auth owns auth, profiles stores app identity/role
- **C.** No profile table
- **D.** Store passwords in FastAPI
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q252. What should final shipments table contain?
- **A.** Every event/GPS point
- **B.** Current shipment state and references to related entities
- **C.** Only tracking number
- **D.** Giant JSON field
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q253. What should shipment status enums be?
- **A.** Free text
- **B.** Fixed lifecycle enum plus separate delay state
- **C.** One complete boolean
- **D.** AI invents statuses
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q254. What belongs in shipment_events?
- **A.** Only status names
- **B.** Immutable-ish operational history: status changes, reroutes, checkpoints, delivery etc.
- **C.** User profiles
- **D.** Current route geometry
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q255. What should routes represent?
- **A.** One specific Driver journey only
- **B.** Reusable route knowledge
- **C.** Just ORS URLs
- **D.** Gate reports
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q256. How should route geometry and actual journeys be separated?
- **A.** Put everything in routes
- **B.** route_points stores geometry; route_traversals stores individual journeys
- **C.** Screenshots
- **D.** No geometry history
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q257. Should gates and incidents be one table?
- **A.** Yes
- **B.** No; gates represent locations, incidents represent changing conditions
- **C.** Only incidents
- **D.** Only gates
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q258. What should gate_reports contain?
- **A.** Only blocked=true
- **B.** Individual Driver observations linked to gate/incident when possible
- **C.** Official gate state only
- **D.** Trader alerts
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q259. What should final alerts and documents tables look like?
- **A.** Minimal text only
- **B.** Structured records linked to shipment/route/incident/user context
- **C.** React state only
- **D.** One table for both
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q260. Should offline-queue records be stored in Supabase as the primary queue?
- **A.** Yes
- **B.** No; pending queue lives in Driver IndexedDB, server stores synchronized records and client_event_id
- **C.** FastAPI RAM only
- **D.** Nowhere
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 27: Questions 261–270

## Q261. How should authentication work between React and FastAPI?
- **A.** Send username/password to every endpoint
- **B.** Supabase login → access token → FastAPI validates token and resolves role
- **C.** FastAPI trusts user_id from React
- **D.** No auth
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q262. What should shipment endpoints look like?
- **A.** One shipment-action endpoint
- **B.** REST-style endpoints with clear responsibilities
- **C.** Direct SQL from every screen
- **D.** One endpoint per button
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q263. Who should GET /shipments return data for?
- **A.** Everyone gets everything
- **B.** Response is restricted by authenticated role
- **C.** React filters unauthorized records
- **D.** Only Admin can use it
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q264. How should Driver location updates work?
- **A.** One endpoint every second
- **B.** Batch location endpoint
- **C.** Manual shipment updates
- **D.** Coordinates in alerts
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q265. What endpoint should create checkpoint/gate observations?
- **A.** /update-route
- **B.** POST /gate-reports
- **C.** /admin/gates/change
- **D.** Put reports inside shipment status
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q266. How should Admin review reports?
- **A.** Modify DB directly
- **B.** Dedicated list/review endpoints for accept/reject/merge and overrides
- **C.** Delete manually
- **D.** React sets verified=true directly
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q267. How should Driver rerouting work?
- **A.** Admin endpoint only
- **B.** Assigned Driver calls reroute endpoint with selected route/reason
- **C.** Trader changes route
- **D.** React modifies DB row directly
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q268. What if Driver is following a completely new/unmapped path?
- **A.** Reroute cannot handle it
- **B.** Create/finalize an observed route from breadcrumb data
- **C.** Require ORS route ID
- **D.** Ask Admin to draw it
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q269. Where should route confidence logic be exposed?
- **A.** Driver sends confidence values
- **B.** Backend calculates and frontend receives score + explanation/reasons
- **C.** React calculates everything
- **D.** Admin types score
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q270. What should API return when something fails?
- **A.** "error" for everything
- **B.** Consistent structured error responses with stable error codes
- **C.** HTML error pages
- **D.** Empty response
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 28: Questions 271–280

## Q271. What should happen immediately after login?
- **A.** Everyone same dashboard
- **B.** Redirect based on role
- **C.** User chooses role manually
- **D.** Always Admin
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q272. What should shared application shell contain?
- **A.** Completely different layout for each role
- **B.** Shared header/navigation shell with role-specific menus
- **C.** No navigation
- **D.** Twenty menu items
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q273. What should Admin navigation contain?
- **A.** 15 sections
- **B.** Dashboard, Shipments, Operations Map, Incidents/Gates, Broadcast Alerts
- **C.** Database editor
- **D.** Dashboard only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q274. What should Trader navigation contain?
- **A.** Everything Admin sees
- **B.** Dashboard, My Shipments, Alerts
- **C.** Gate management
- **D.** Driver management
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q275. What should Driver navigation look like?
- **A.** Desktop sidebar with many sections
- **B.** Mobile-first Current Trip, Map, Report, Sync
- **C.** Same as Admin
- **D.** No navigation
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q276. What components should shared Shipment Detail page have?
- **A.** One giant component
- **B.** Reusable ShipmentHeader, map, timeline, route summary, alerts, documents, Driver info
- **C.** Separate page per status
- **D.** Plain JSON
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q277. Should three role maps be separate implementations?
- **A.** Yes
- **B.** No; one shared LogisticsMap with role/layer configuration
- **C.** Only Admin map reusable
- **D.** Only Driver gets routing
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q278. What should Driver CurrentTrip screen contain?
- **A.** Map only
- **B.** Shipment summary + map + status + key actions + connectivity/sync status
- **C.** Analytics
- **D.** Admin approval queue
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q279. How should alerts appear in UI?
- **A.** Popups only
- **B.** Notification badge + persistent alert history + relevant inline warnings
- **C.** Email only
- **D.** Map markers only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q280. How should frontend loading/error/offline states be handled?
- **A.** Ignore them
- **B.** Every important component supports loading, empty, error and offline states
- **C.** Reload browser on error
- **D.** Display stack traces
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 29: Questions 281–290

## Q281. Should all five people start coding different features immediately?
- **A.** Yes
- **B.** No; first freeze diagrams, schema, API contract, statuses, RBAC and golden path
- **C.** Only backend starts
- **D.** Only frontend starts
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q282. What should Person 1 own during implementation?
- **A.** Write most code
- **B.** Product/integration control, contracts, scope, demo story and unblocking
- **C.** Maps only
- **D.** Slides only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q283. What is Person 2 implementation sequence?
- **A.** Polish animations first
- **B.** Shared UI → Trader → Admin → realtime/alerts → polish
- **C.** Admin analytics first
- **D.** Learn FastAPI
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q284. What is Person 3 implementation sequence?
- **A.** Pheromone first
- **B.** Supabase/Auth → schema → FastAPI core → RBAC → incidents → alerts → advanced routing
- **C.** Deployment first
- **D.** Presentation first
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q285. What is Person 4 implementation sequence?
- **A.** Ant algorithm first
- **B.** Map → simulation → live GPS → reports → offline → observed routes → recommendations
- **C.** Slides first
- **D.** Supabase auth
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q286. What is Person 5 implementation sequence?
- **A.** Wait until development finishes
- **B.** QA from day one + demo data + AI log + presentation assets
- **C.** Only slides
- **D.** Only unit tests
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q287. What should be first shared integration milestone?
- **A.** Full system
- **B.** Trader creates shipment → Admin sees/assigns → Driver sees it
- **C.** AI recommendation
- **D.** Offline photos
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q288. What should be second integration milestone?
- **A.** Presentation slides
- **B.** Driver movement → map updates → Trader/Admin tracking
- **C.** Pheromone decay
- **D.** OCR
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q289. What should be third integration milestone?
- **A.** Full route learning
- **B.** Checkpoint report → incident → alert → reroute → offline synchronization
- **C.** Analytics
- **D.** Presentation graphics
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q290. When should pheromone/learned-route feature be integrated?
- **A.** Before shipment creation
- **B.** Only after core handoff, tracking, disruption/offline and delivery are reliable
- **C.** Never
- **D.** With authentication
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.


# Round 30: Questions 291–300

## Q291. When is the project considered functionally complete?
- **A.** When every planned feature exists
- **B.** When required golden path works end-to-end and assignment requirements are demonstrated
- **C.** When pheromone system is perfect
- **D.** When UI is polished
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q292. What core assignment features must be demonstrated?
- **A.** Only shipment tracking
- **B.** RBAC + three roles + shipment timeline + GPS map + gate/route handling + alerts + offline + Driver photo upload
- **C.** Pheromone only
- **D.** Architecture diagrams only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q293. What optional feature should be considered the main differentiator?
- **A.** Dashboard animations
- **B.** Driver-observed routes + pheromone-inspired route reinforcement
- **C.** Dark mode
- **D.** OCR
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q294. When is documentation considered complete?
- **A.** README only
- **B.** Architecture + functional + use-case + ER + class + API + schema + RBAC + testing + AI log + demo script
- **C.** No docs
- **D.** Screenshots only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q295. What must pass before you freeze demo build?
- **A.** Application opens
- **B.** Golden path passes at least three consecutive rehearsals without critical failure
- **C.** Backend developer says it works
- **D.** One successful test
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q296. What fallbacks must be ready before presenting?
- **A.** None
- **B.** Cached route + simulated GPS + offline/demo data + realtime refresh fallback + prerecorded emergency demo
- **C.** Homepage screenshot only
- **D.** Another laptop with different code
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q297. What should be finished for AI Engineering Reflection?
- **A.** List AI tools only
- **B.** Real examples of prompts, generated output, mistakes, fixes and lessons
- **C.** Explain LLMs
- **D.** Say AI saved time
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q298. What must every one of the five members know before presentation day?
- **A.** Only personal feature
- **B.** Overall architecture, golden demo story, speaking part and basic recovery procedure
- **C.** Every line of code
- **D.** Slides only
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q299. When should you stop adding features?
- **A.** Five minutes before presentation
- **B.** Once required features are reliable and new changes threaten stability more than value
- **C.** Never
- **D.** After implementing all 300 ideas
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.

## Q300. What is the final definition of success?
- **A.** Maximum feature count
- **B.** A coherent, working Myanmar-focused prototype demonstrating required workflow, surviving live demo and explaining AI engineering
- **C.** Best-looking dashboard
- **D.** Most complicated algorithm
- **Original recommendation:** B
- **Final decision:** B
- **Refinement / rationale:** Accepted as recommended. The final system specification and thematic documents in this pack define the implementation consequence.
