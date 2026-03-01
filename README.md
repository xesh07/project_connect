# CONNECT Platform (Phase 0 + 1)

This app is the MVP foundation for CONNECT.

## Completed in this stage

- Phase 0: project setup, layout, navigation, initial pages.
- Phase 1: email/password auth, protected routes, onboarding flow.

## Tech stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Supabase Auth + Postgres

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment file:

```bash
cp .env.example .env.local
```

3. Fill `.env.local` with Supabase keys:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. In Supabase SQL editor, run:

`supabase/schema.sql`

5. Start the app:

```bash
npm run dev
```

## Routes in this stage

- `/`
- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/complete`
- `/create-profile` (protected)
- `/dashboard` (protected)
- `/discover`
- `/opportunities`
- `/community`
