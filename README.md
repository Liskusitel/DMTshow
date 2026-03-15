# DMTshow
ComedyCollab комедийное шоу
Implements the DMTshow ComedyCollab site from scratch on an empty branch, matching the specified dark theatrical color palette and style.

Stack

Frontend: React 19 + Vite, styled-components, framer-motion
Backend: Express 5, in-memory storage, token auth via crypto.randomBytes
Font: Montserrat (400–900) via Google Fonts
UI (src/App.jsx)

Color scheme: #060606 background, #FFD600 gold + #FF3F3F red accents throughout
Animated spotlight glows (keyframe box-shadow pulse, two offset blobs)
Gradient DMT SHOW title (yellow → red, 900 weight, 6px tracking) with pulse animation
Microphone SVG decoration (gold body, red arc/stand)
Fixed top-right "Зарегистрироваться" button with gradient fill
Registration modal (ФИО, age, city, phone) + animated success state
Live participant counter polled from /api/count
Password-protected admin panel with participant table
API (server.js)

Endpoint	Purpose
GET /api/count	Participant count
POST /api/register	Add participant (assigns crypto.randomUUID())
POST /api/admin/login	Returns 32-byte random session token
GET /api/participants	Token-gated list
ADMIN_PASSWORD is env-var only — server warns and disables admin login if unset. Vite proxies /api → localhost:3001 in dev.

✨ Let Copilot coding agent set things up for you — coding agent works faster and does higher quality work when set up for your repo.
Copilot uses AI. Check for mistakes.
Mention @copilot in a comment to make changes to this pull request.
 Copilot AI self-assigned this 30 minutes ago
Initial plan
e66ff8e
 Copilot AI assigned Liskusitel 30 minutes ago
Copilot started work on behalf of Liskusitel 30 minutes ago
Copilot AI and others added 2 commits 25 minutes ago
@Liskusitel
Bootstrap DMTshow ComedyCollab website with dark yellow/red theme 
76fd7ab
@Liskusitel
Use participant UUID as React list key for reliable uniqueness 
d828520
