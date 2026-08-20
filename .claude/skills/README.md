# Design & motion skills

These are Claude Code **skills** — reference guides an AI assistant loads on
demand while it works on this repo. They are not code, and nothing here ships
to the portal. They exist so that any change made to `portal.html`,
`comms-timeline.html`, or a future page is held to the same bar for motion,
materials, and typography.

## Where they came from

Vendored from **[emilkowalski/skills](https://github.com/emilkowalski/skills)**
(MIT licensed — see `LICENSE` in this folder), upstream commit `e879241`.
Written by Emil Kowalski, the author of Sonner and Vaul, based on his work at
Vercel and Linear.

To refresh them later:

```bash
git clone --depth 1 https://github.com/emilkowalski/skills.git /tmp/skills
cp -R /tmp/skills/skills/. .claude/skills/
```

## What's here

| Skill | Use it when |
| --- | --- |
| `apple-design` | **The house style for this portal.** Apple's principles for fluid motion, translucent materials, depth, and typography, translated to the web. |
| `emil-design-eng` | General UI polish and component design judgement — the broadest of the set. |
| `animate` | Building a new animation from scratch: which curve, duration, and property. |
| `review-animations` | Auditing an animation someone already wrote. |
| `improve-animations` | Surveying every animation in the codebase and producing a prioritised plan. |
| `find-animation-opportunities` | Finding places that *should* move — and, importantly, what to leave still. |
| `animation-vocabulary` | Naming the motion you want so an agent builds the right thing. |
| `pick-ui-library` | Choosing a dependency instead of hand-rolling one. |
| `prototype` | Building several versions of a UI idea behind a switcher to compare them. |
| `animate-expo` | React Native / Expo. Not used by this repo today. |
| `ask-sonner` | The Sonner toast library. Not used by this repo today. |

## How this repo applies them

The portal is plain HTML, CSS, and vanilla JavaScript — there is no React and
no animation library — so the guidance is applied natively:

* CSS transitions with mirrored, spring-shaped easing for hover and reveal.
* A small hand-written spring (`requestAnimationFrame`, velocity handoff) for
  anything the user can grab, because CSS transitions cannot be interrupted
  mid-flight.
* `backdrop-filter` for the translucent material on panels, menus, and modals.

See `docs/apple-design-pass.md` for exactly what changed and why.
