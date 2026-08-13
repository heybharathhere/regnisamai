# Regnisamai — Backlog

A running list to pull from for day-to-day updates. Check items off as
they ship, and log what actually shipped in version.json (not here —
this file is just the queue, version.json is the record).

Nothing here is committed to — pick whatever sounds good on a given day.

---

## Known bugs / polish (small, worth doing early)

- [ ] Header clipped under the status bar on some phones — missing
      `env(safe-area-inset-top)` padding (the one from today's screenshots)
- [ ] Haptic feedback on key presses — a few ms of vibration alongside
      the click sound, reinforces the mechanical feel
- [x] Undo toast after swipe-to-delete on a history row, in case of an
      accidental swipe — shipped in v2.0.0
- [ ] Decide + make explicit whether pitch/speed should reset on STOP
      or persist across takes (currently ambiguous)
- [ ] Loading indicator while the avatar manifest / version.json are
      being fetched, instead of a blank flash
- [ ] Empty-state polish — first-time "no takes yet" message could
      link straight to REC

## Quick wins (reuse existing code, low effort)

- [x] Export / download a take as .wav — shipped in v2.0.0 as part of
      the share button (also the automatic fallback if a browser
      doesn't support Web Share with files)
- [x] Share sheet — shipped in v2.0.0, per-take share button using the
      Web Share API
- [ ] Silence trim — auto-snip dead air at the start/end of a take
- [ ] Waveform mirror animation — flip the waveform left-right when
      REV is hit, reinforcing the concept visually
- [ ] Keyboard shortcuts for desktop use (space = play/pause, R = record)

## Sound-shaping (more Web Audio nodes, no new dependencies)

- [ ] Echo / tape slap-back — a feedback delay node
- [ ] Wow & flutter — subtle pitch wobble over time (LFO on playback
      rate) to mimic a worn tape motor
- [ ] A/B loop points — drag two markers on the waveform to loop just
      a section, either direction

## Bigger builds

- [ ] Sound-on-sound layering — record a new take while an old one
      plays underneath, for simple harmonies
- [ ] Splice/crossfade two saved takes into one
- [ ] "Backmasking hunt" mode — play reversed, let the user guess what
      they heard, save the guess as a note next to the take
- [ ] Custom deck skins — user photo as the cassette background,
      stored the same way avatars are now

## Personalization / retention

- [ ] Named sides — pair two takes as Side A / Side B, cassette-style,
      in the history list
- [x] Daily streak counter — shipped in v2.0.0, shows next to "Last 5
      takes" from day 2 onward

---

## Ideas parked / needs a decision first
(things that came up but need your call before building)

- Reset app vs. per-item deletion — currently both exist; keep both?
- Whether new theme packs are worth adding beyond the current 3
