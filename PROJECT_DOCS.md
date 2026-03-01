# CONNECT Platform - Project Documentation

## Overview

**Platform Name:** CONNECT  
**Vision:** A creative networking platform built for people without references, without nepotism, without industry contacts.  
**Mission:** Talent over contacts. Access over privilege. Collaboration over cliques.

---

## Target Users

- Models
- Photographers
- Stylists
- Makeup Artists
- Designers
- Videographers
- Content Creators
- Venues
- Brands

---

## Tech Stack (MVP)

| Component | Technology |
|-----------|------------|
| Frontend + Backend | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database + Auth | Supabase (PostgreSQL, Auth, Storage) |
| Hosting | Vercel |
| Email Notifications | Resend (optional, later phases) |

**Monthly Running Cost:** ₹3,800–₹5,600/month (at launch scale)

---

## Core Philosophy

- No followers, no likes, no analytics (no vanity metrics)
- Direct collaboration requests (no bidding system)
- Simple messaging: request → accept → email shared
- Profile-first: users must complete profile before using platform

---

## Phase Breakdown

### Phase 0: Foundation Setup
- Initialize Next.js + TypeScript + Tailwind project
- Setup routing structure (Home, Discover, Opportunities, Community, Create Profile)
- Shared layout, navbar, footer, design tokens (colors, typography)
- Environment config (.env)
- Supabase client setup

**Status:** ✅ Completed

---

### Phase 1: Auth + User Onboarding
- Email/password signup, login, logout
- Auth guard for protected pages
- First-login flow: force profile completion
- Basic profile creation (name, city, category)

**Status:** ✅ Completed

---

### Phase 2: Creator Profile (Core MVP)
- Profile fields:
  - Name
  - City
  - Category (Model / Photographer / Stylist / etc.)
  - Bio ("Who I am")
  - Skills ("What I can do")
  - Experience (optional)
  - Portfolio uploads (photos/videos)
  - Collaboration preference (Paid / Unpaid / Both)
  - Availability calendar
  - Contact button
- Portfolio upload with storage
- Public profile page
- Edit profile page

**Status:** ⏳ Pending

---

### Phase 3: Discover Talent
- Search + filter system:
  - Category
  - City
  - Skill tags
  - Paid/Unpaid preference
- Profile cards grid
- Profile detail view
- Sorting and empty states

**Status:** ⏳ Pending

---

### Phase 4: Open Opportunities Board
- Post opportunity:
  - Title
  - Description
  - Date
  - Location
  - Budget (optional)
  - Required Role
- Opportunity listing page
- Opportunity detail page
- Apply button → application stored in inbox
- Inbox view for poster to review applications

**Status:** ⏳ Pending

---

### Phase 5: Collaboration Request Flow
- "Send Collaboration Request" from profile
- Accept/Reject actions
- On accept → both parties receive each other's email
- No live chat (as per client requirement)

**Status:** ⏳ Pending

---

### Phase 6: Community Events
- Create event:
  - Event name
  - Type (Shoot / Networking / Workshop / Fashion Show etc.)
  - Date
  - Location
  - Entry (Free / Paid)
  - Description
- "I'm Interested" button
- Attendee list with name, role, profile link
- Pre-event networking

**Status:** ⏳ Pending

---

### Phase 7: Notifications + Admin Basics
- In-app notification center
- Email notifications for key actions (opportunity alerts, collaboration requests, applications)
- Basic moderation controls (hide/report content)
- Founding Creator badge support (for Drop 01 launch strategy)

**Status:** ⏳ Pending

---

### Phase 8: QA, Performance, Launch Readiness
- Validation hardening, error states, empty states
- Mobile responsiveness audit
- Security checks (RLS policies, auth access)
- Deploy to Vercel + production DB + domain connect

**Status:** ⏳ Pending

---

## Database Schema (Current)

### profiles table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| user_id | uuid | Unique, links to Supabase Auth |
| full_name | text | Required |
| city | text | Required |
| category | text | Required (Model, Photographer, etc.) |
| created_at | timestamp | Auto |
| updated_at | timestamp | Auto |

**Additional fields to add in Phase 2:**
- bio (text)
- skills (text[])
- experience (text, optional)
- collaboration_preference (enum: paid/unpaid/both)
- availability (json)
- contact_email_visible (boolean)

---

## Routes

| Route | Auth Required | Description |
|-------|--------------|-------------|
| `/` | No | Home page |
| `/auth/sign-up` | No | Sign up page |
| `/auth/sign-in` | No | Sign in page |
| `/auth/complete` | Yes | Post-login redirect handler |
| `/create-profile` | Yes | Onboarding profile form |
| `/dashboard` | Yes | User dashboard |
| `/discover` | No | Talent search & filters |
| `/opportunities` | No | Job board |
| `/community` | No | Events page |

---

## Design System

### Colors
```
--bg-cream: #f5f2ea
--bg-sand: #d9c8a9
--ink: #19211f
--muted-ink: #4e5754
--accent: #b94d2c
--line: #d7cfbe
```

### Typography
- Headings: Space Grotesk (font-mono)
- Body: Manrope (font-sans)

### UI Patterns
- Panels with subtle glass effect
- Rounded corners (1rem)
- Minimal, clean aesthetic

---

## Launch Strategy Notes (Client-Specific)

### Founding Creators Strategy
- Select 8–12 people only
- Roles: 2–3 Models, 1 Photographer, 1 BTS Videographer, 1 Content Creator, 1 Stylist (can be you), 1 MUA (optional)
- Value exchange: shoot content, credit on website, featured profile, social tags, free T-shirt, networking access, BTS content, digital certificate

### Marketing Angle
- "Built Without References – Drop 01"
- Document everything: before/during/after shoot content
- First 10 people become brand ambassadors

### Cost Control
- 1-day shoot only
- Free or low-cost location
- Minimal lighting setup
- 4–5 looks max
- Small T-shirt batch
- Provide food + basic comfort

---

## Future Roadmap (Post-MVP)

**Phase 2 (after MVP):**
- Add review system
- Add verification badges

**Phase 3:**
- Paid featured profiles
- Brand job listings

**Phase 4:**
- Platform-hosted networking events
- Creator conferences
- Industry mixers

---

## Project Structure

```
web/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── actions.ts          # Server actions (signIn, signUp, signOut)
│   │   │   ├── sign-in/page.tsx
│   │   │   ├── sign-up/page.tsx
│   │   │   └── complete/page.tsx
│   │   ├── community/page.tsx     # Placeholder (Phase 6)
│   │   ├── create-profile/
│   │   │   ├── actions.ts          # Server action for profile save
│   │   │   └── page.tsx            # Onboarding form
│   │   ├── dashboard/page.tsx     # Protected user dashboard
│   │   ├── discover/page.tsx       # Placeholder (Phase 3)
│   │   ├── opportunities/page.tsx # Placeholder (Phase 4)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── site-header.tsx
│   │   └── submit-button.tsx
│   ├── lib/supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── shared.ts
│   └── proxy.ts                    # Auth route guard
├── supabase/
│   └── schema.sql                  # Database schema
├── .env.example
└── README.md
```

---

## How to Run Locally

1. Navigate to `web` folder
2. Copy `.env.example` to `.env.local`
3. Add Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Run schema in Supabase SQL Editor: `supabase/schema.sql`
5. Run `npm run dev`

---

## Current Status

| Phase | Status |
|-------|--------|
| Phase 0 | ✅ Complete |
| Phase 1 | ✅ Complete |
| Phase 2 | ⏳ Next (in progress) |
| Phase 3 | ⏳ Pending |
| Phase 4 | ⏳ Pending |
| Phase 5 | ⏳ Pending |
| Phase 6 | ⏳ Pending |
| Phase 7 | ⏳ Pending |
| Phase 8 | ⏳ Pending |

---

*Last Updated: Phase 0 + 1 Completed*
