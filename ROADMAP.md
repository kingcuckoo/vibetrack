# vibetrack roadmap

Health and body tracking through photos and video. Open the app, point the camera, let AI do the work. No manual logging. No cluttered camera roll.

---

## Core concept

A camera-first app where everything you capture — food, scale, mirror selfies, workouts, hair — gets quietly annotated by AI and turned into a long-running picture of your health. Like Cal AI but for your whole body and lifestyle, not just meals. The UI stays out of the way; the AI does the interpretation.

---

## Phase 0 — Camera shell + storage (MVP)

Goal: open the app, take a picture, it lives in vibetrack and not in your camera roll.

- [ ] Full-screen camera UI on launch (back camera default, front camera toggle)
- [ ] Photo and short video capture
- [ ] Save to app-internal storage (not camera roll)
- [ ] Basic capture categories: food, body check-in, exercise, scale, other
- [ ] Simple chronological gallery/timeline
- [ ] Manual category correction

**Native modules needed:** `expo-camera`, `expo-media-library` (write-only, internal), `expo-file-system`
**Requires first `eas build` after adding camera.**

---

## Phase 1 — AI annotation

Goal: every photo gets automatically understood and tagged.

- [ ] Food photo → estimated meal, calories, macros (AI vision)
- [ ] Scale photo → weight extraction via OCR/vision
- [ ] Mirror/selfie → basic body notes (no medical claims)
- [ ] Exercise video → exercise type and rough duration
- [ ] User correction flow (tap annotation → fix it → feeds back to model)
- [ ] Daily summary card

**Open questions:**
- AI backend: Claude vision, OpenAI, or custom? TBD
- Where annotations are stored (local DB vs cloud)

---

## Phase 2 — Tracking and trends

Goal: surface patterns over time without the user doing anything.

- [ ] Weekly and monthly trend views (weight, food habits, workout frequency)
- [ ] Skin check-in tracking (acne, hydration notes over time)
- [ ] Haircut/hair length archive with timeline
- [ ] "You haven't logged a workout in X days" nudges
- [ ] Basic export (PDF summary, shareable progress card)

---

## Phase 3 — Personalization and intelligence

Goal: the app gets smarter the more you use it and corrections you make.

- [ ] User correction history used to tune AI interpretations
- [ ] Personalized baselines (your normal vs. your goals)
- [ ] Detect gaps: "looks like you stopped tracking food this week"
- [ ] Optional: skincare product tracking (photo your routine, AI tracks what you use)
- [ ] Optional: sleep/recovery signals from morning selfies

---

## Phase 4 — Social / sharing (optional, post-validation)

- [ ] Private shareable progress links
- [ ] Trainer/coach view (share your timeline with someone)
- [ ] Community challenges (30-day check-in streaks, etc.)

---

## Open architectural decisions

| Decision | Options | Status |
|---|---|---|
| Photo storage | Local only vs. cloud (S3/Cloudflare R2) | TBD |
| AI backend | Claude Vision, OpenAI GPT-4o, custom | TBD |
| User accounts | Anonymous local vs. auth from day 1 | TBD |
| Platform | iOS only vs. iOS + Android | TBD |
| Video storage | Local only (size concern) vs. cloud | TBD |

---

## What the default Expo template covers

The `create-expo-app --template default` scaffold handles navigation and UI. Nothing in the default template covers camera, storage, or AI — all of that gets added as native modules and API integrations in Phase 0 and Phase 1.
