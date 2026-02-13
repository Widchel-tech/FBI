# CASE FILES - FBI Investigation Game Platform
## Product Requirements Document

### Original Problem Statement
Build "CASE FILES" - a hyper-realistic FBI investigation game platform featuring:
- Player web app for playing FBI investigation cases with scenes, choices, clues, procedural risk tracking
- Owner/Admin portal for case management, media uploads, analytics, subscriptions
- AI-powered case generation and suspect interrogation using OpenAI GPT-5.2
- Subscription system ($5/mo, $50/yr) with Stripe integration
- Persistent career progression with levels and career points

### User Personas
1. **Players**: Crime/detective enthusiasts, true crime fans, ages 18-45 who enjoy procedural investigation games
2. **Game Owner**: Platform administrator managing cases, analytics, subscriptions, and content

### Core Requirements (Static)
- Hyper-realistic FBI investigation gameplay
- Scene-based narrative with branching choices
- Procedural risk system (LOW/MEDIUM/HIGH)
- Timer-based cases
- AI interrogation system for suspects
- Career progression with levels
- Subscription-based monetization
- Owner portal for case management

---

## What's Been Implemented (Feb 13, 2026)

### Backend (FastAPI + MongoDB)
- ✅ JWT-based authentication (player + owner)
- ✅ User registration/login with career progression
- ✅ Case CRUD operations (create, read, update, delete)
- ✅ Case validation endpoint
- ✅ Play session management (start, make choices, accusation)
- ✅ AI interrogation using OpenAI GPT-5.2 via emergentintegrations
- ✅ AI case generation endpoint
- ✅ Stripe subscription checkout and webhook handling
- ✅ Analytics endpoints (overview, per-case, leaderboard)
- ✅ Media upload to local file storage

### Frontend (React + Tailwind + shadcn/ui)
- ✅ Landing page with FBI noir theme
- ✅ Player authentication (login/register)
- ✅ Player dashboard with agent dossier
- ✅ Case gameplay screen with:
  - Scene narration in typewriter font
  - Tabbed interface (Scene, Suspects, Clues, Timeline)
  - Choice selection with risk indicators
  - Timer display
  - Score and procedural risk tracking
  - AI interrogation modal
  - Final accusation system
  - Game endings (CLOSED/COMPROMISED)
- ✅ Leaderboard page
- ✅ Subscription page with Stripe checkout

### Owner Portal
- ✅ Owner login (restricted access)
- ✅ Dashboard with KPIs (players, sessions, completion rate)
- ✅ Case manager (list, publish/unpublish, delete)
- ✅ Case editor with tabbed interface:
  - Header (case ID, type, location, difficulty)
  - Suspects (CRUD with guilty flag)
  - Scenes (narration, choices, risk flags)
  - Clues (load-bearing/misdirection flags)
  - Endings (CLOSED_GOOD, COMPROMISED_BAD)
- ✅ AI case generation wizard
- ✅ Analytics dashboard

### Sample Case Created
- "The Riverside Conspiracy" - Complete 10-scene homicide case with:
  - 3 suspects
  - 11 clues (including load-bearing and misdirection)
  - Branching narrative paths
  - Interview scenes with Q/A format
  - Multiple risk-affecting choices
  - Proper endings

---

## Prioritized Backlog

### P0 - Critical (MVP Complete)
- ✅ Core gameplay loop
- ✅ Authentication system
- ✅ Case management
- ✅ Subscription system

### P1 - High Priority
- [ ] Media attachments per scene (crime scene photos, evidence images)
- [ ] Case validation enforcement before publishing
- [ ] Player session replay functionality
- [ ] Export analytics to CSV

### P2 - Medium Priority
- [ ] Patch notes per case
- [ ] Bonus files system (unlockable documents)
- [ ] More detailed player analytics
- [ ] Mobile responsive improvements
- [ ] Email notifications for subscription

### P3 - Low Priority
- [ ] Multiple admin users
- [ ] Case templates for faster creation
- [ ] Achievement system
- [ ] Social sharing features

---

## Technical Architecture

### Stack
- **Frontend**: React 18, Tailwind CSS, shadcn/ui components
- **Backend**: FastAPI (Python), Motor (async MongoDB driver)
- **Database**: MongoDB
- **AI**: OpenAI GPT-5.2 via emergentintegrations
- **Payments**: Stripe via emergentintegrations
- **Auth**: JWT tokens

### Key Credentials
- Owner Portal: admin@casefiles.fbi / admin123

### API Routes
- `/api/auth/*` - Player authentication
- `/api/owner/*` - Owner-only endpoints
- `/api/cases` - Published cases for players
- `/api/play/*` - Gameplay endpoints
- `/api/payments/*` - Stripe subscription
- `/api/leaderboard` - Public leaderboard

---

## Next Action Items
1. Add image upload functionality to case editor
2. Implement case validation before publishing
3. Create more sample cases using AI generation
4. Add detailed player progress tracking
5. Implement session replay for failed cases
