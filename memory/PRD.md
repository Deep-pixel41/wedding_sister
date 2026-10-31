PRD — Royal Indian Wedding Invitation (Shubh Vivah)
Original Problem Statement
Build a premium, fully responsive, scrollable Indian wedding invitation website for the host's sister's wedding on 11 December 2026. Royal traditional Indian aesthetic on light pastel backgrounds (champagne gold, ivory, cream, blush) with golden decorations; a single Host Customization Panel to enter all wedding details (no code edits); live IST countdown; traditional ceremony highlights; Hindi quotes; venue with Google Maps directions; blessings section; mobile-first; no photo gallery, no dark backgrounds, no fake wedding info (venue empty until host enters it).

User Personas
Guest (primary) — opens the site on a phone, scrolls the invitation, checks countdown/ceremonies/venue, taps Get Directions, sends a blessing on the Ashirwad wall.
Host (the user) — opens /host, unlocks with a PIN, fills one form with all wedding details, saves (localStorage), previews, resets when needed.
Architecture
Frontend: React 19 (CRA/craco) + Tailwind + framer-motion + Lenis smooth scroll. Single-page guest invitation at /, private host panel at /host (PIN 2026, sessionStorage unlock).
Backend: FastAPI (port 8001, /api prefix) + MongoDB — only public dynamic feature: Blessings wall (GET/POST /api/blessings).
Wedding details: localStorage key royal_wedding_host_customization (per-device, per the brief). Defaults are clearly-demo sample names.
Assets: 9 AI-generated Pichwai-style illustrations (hero Ganesha + 8 ceremonies) in public/images/; ambient shehnai loop (75s, ~900KB) in public/audio/ambient.mp3.
Design system: /app/design_guidelines.json (ivory/gold palette, Rozha One + Cinzel + Noto Serif Devanagari + Montserrat + Cormorant Garamond).
Core Requirements (static)
Hero with Ganesha illustration, "॥ श्री गणेशाय नमः ॥", "शुभ विवाह", dynamic names, date, scroll cue, marigold garland, rotating mandalas, parallax.
Live countdown to 11 Dec 2026 computed in IST, zero-state Hindi message, no negative values.
Invitation card with families/date/time; ceremonies ×8; Hindi quotes ×6; venue card + Get Directions (host Maps link or search URL); blessings/gratitude section + footer.
Host panel: one form, Save / Preview / Reset (with confirm), PIN-gated, guests never see it.
Ambient music toggle, muted by default; floating petals + sparkles canvas; Lenis smooth scroll; reduced-motion respected.
Implemented (2026-10-31)
All sections above; blessings wall (guests can send blessings — added on user request).
Verified: desktop + mobile screenshots (no overflow, no runtime errors), countdown ticking (039 days), host save → guest view updates with venue + correct Maps URL, wrong-PIN rejection, reset dialog, blessing POST + wall update via UI and curl.
Prioritized Backlog
P0: — (none open)
P1: Host-supplied per-ceremony dates/timings (currently deliberately omitted — no invented dates); share-to-WhatsApp button for the invitation.
P2: Server-side storage of wedding details (so host edits apply to every guest device, not only the host's device); RSVP/attendance count; real private auth for host mode.
Notes for Fork Agents
Host PIN is a casual gate, not auth (documented in-panel). PIN lives in /app/frontend/src/lib/wedding.js.
Demo names/parents/family show until the host saves real details; venue section has a designed empty state until host enters it.