# Driver-Observed Routes and Pheromone-Inspired Confidence

This is a team extension, not an assignment requirement.

## Concept
A Driver may leave the known/planned route. The app continues recording GPS breadcrumbs and stores a Driver-observed route rather than forcing the Driver back onto mapped roads. Other Drivers may reuse an unconfirmed route with a clear warning.

## Simplified reinforcement heuristic
- New Driver-observed route starts at confidence **20**.
- Valid successful traversal: **+10**.
- First successful traversal by a new unique Driver: **+10 diversity bonus**.
- Confirmed blockage: **-20** confidence (operational BLOCKED state remains separate).
- Inactivity beyond 30 days: mild **-5 decay** per configured period.
- Auto-confirm when confidence ≥ **50** and at least **2 unique Drivers** have successfully used the route.

Only LIVE_GPS traversals that pass validation and have reasonable path coverage are eligible for reinforcement. The recommendation engine considers confidence, active incidents and distance, but the Driver makes the route decision.
