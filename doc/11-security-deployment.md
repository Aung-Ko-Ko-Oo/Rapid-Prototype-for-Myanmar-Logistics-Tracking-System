# Security and Deployment

## Topology
React/Vite on Vercel → HTTPS → FastAPI on Render → Supabase Auth/Postgres/Realtime/Storage. ORS and device GPS are external inputs; IndexedDB provides Driver offline continuity.

## Secrets
Browser receives only the Supabase **publishable** key. FastAPI holds the Supabase **secret** key and ORS server-side credentials where applicable. Commit `.env.example`; never commit real `.env` files. If a key appears in Git or an AI prompt, treat it as compromised and rotate/revoke it.

## Environments
Local development, preview/test deployments, and stable demo/production. Maintain predictable seeded demo data and a known-good tagged build.
