# The Apple design pass

This is a plain-English record of a single change to how the portal *feels*.
Nothing in it moved a button, renamed a link, or changed a Smartsheet
connection. The blue bar is the same blue bar. Everything below is about the
hundred small moments in between.

The work follows one source: the **`apple-design` skill** now vendored at
`.claude/skills/apple-design/SKILL.md`, from
[emilkowalski/skills](https://github.com/emilkowalski/skills). It distils
Apple's own WWDC design talks — chiefly *Designing Fluid Interfaces* — into
rules that can be applied to a web page. The other ten skills in that folder
came along with it and are reference material for future changes.

---

## Where the change lives

Everything is in two clearly-marked blocks per page, both added at the end so
they refine what was already there rather than rewriting it:

| Page | Block | What it holds |
| --- | --- | --- |
| `portal.html` | `<style id="portal-apple-design">` | All the new CSS, at the bottom of `<head>` |
| `portal.html` | `<script id="portal-apple-motion">` | Press feedback and the panel spring, at the bottom of `<body>` |
| `comms-timeline.html` | `<style id="comms-apple-design">` | The same layer, trimmed to what that page has |
| `comms-timeline.html` | `<script id="comms-apple-motion">` | Press feedback only |

**To undo any part of this, delete the rule.** Nothing else depends on it. If
the JavaScript fails to run entirely, the CSS transitions it replaces are
still in place and every menu and panel keeps working.

Because `portal.html` changed, the `?v=` number in **both** `index.html` and
`404.html` was bumped to `20260820-1`, per the rule at the top of
`portal.html`. Content edits in `portal-config.js` still need no bump.

---

## What actually changed

### 1. Buttons answer on the way down

Every button, menu row, and nav item now responds the instant it is pressed,
rather than when the click finishes. Apple's phrasing is that the moment lag
appears, the feeling of directness "falls off a cliff."

It also behaves like a real button in the small ways: press it, slide your
finger off, and the press lifts; slide back on, and it returns. There is about
10px of slack around the edge so a tap that drifts slightly still counts.

### 2. Menus grow out of the button that opened them

The dropdowns used to appear and vanish in a single frame. Now they scale up
from their own toggle — anchored top-left, where the button is — and shrink
back the same way, with the caret turning over to show the state. Enter and
exit use mirrored easing curves, so the way out is exactly the way in
reversed.

### 3. Floating things are made of glass

Menus, the FAQ panel, the "did you save?" modal, and the broken-link message
are now translucent surfaces with the content blurred behind them, rather than
opaque slabs. Bigger surfaces are heavier: more blur, deeper shadow. The
search bar inside the FAQ panel deliberately does *not* get its own blur —
stacking one translucent surface on another destroys legibility, and the panel
underneath has already done the blurring.

The hard 1px line under the FAQ search bar was replaced with a short fade,
because a line claims there is a border there and a fade tells the truth: the
list continues underneath.

**The blue bar was deliberately left solid.** Translucency is only honest when
there is something behind it, and the bar sits above the Smartsheet frame
rather than over it. Heavy material for structure, light material for the
things you touch.

### 4. The FAQ panel can be grabbed, thrown, and caught

This is the part that needed real code rather than CSS. The side panel now
behaves like a physical sheet:

* **Drag it** by the header — or, on a touch screen, by swiping right anywhere
  in the list — and it tracks your finger exactly, from wherever you grabbed
  it.
* **Pull it the wrong way** and it resists progressively instead of stopping
  dead.
* **Flick it** and it carries your speed into the closing animation, with the
  landing point projected from that speed — the same maths a scroll view uses
  for deceleration.
* **Change your mind** halfway through and grab it again: it never jumps back
  to the start, because every animation begins from where the panel is right
  now and keeps the speed it already had.

That last point is why this is a spring written by hand (about 60 lines) and
not a CSS transition. A CSS transition runs to its end no matter what you do;
a spring can be re-aimed mid-flight.

Two numbers control it, the two Apple exposes to its own designers:
**damping** (how much it overshoots — `1.0` settles flat) and **response**
(how quickly it arrives, in seconds). The panel opens at damping `1.0` when
you click a button, because nothing threw it; it gets a little bounce
(`0.8`) only after a real flick.

### 5. Type is spaced for its size

Letter-spacing is now size-specific instead of one value everywhere: large
headings are tightened (letters drift apart as they grow), small labels are
opened up, body copy sits at zero. Apple devices get San Francisco, their own
optically-sized typeface; Windows keeps Segoe UI exactly as before, so nothing
shifts for anyone reading this at their desk.

### 6. Accessibility got three real answers, not one

Three separate system settings, each handled properly:

* **Reduced motion** — slides and springs become short cross-fades. Not
  *nothing*: an element that blinks in and out with no transition is harder to
  follow, not easier. The panel gesture is switched off entirely.
* **Reduced transparency** — the glass becomes solid. The blur is removed, not
  merely thickened.
* **High contrast** — near-solid surfaces with defined borders.

Keyboard users also get a proper focus ring on every control, and it appears
only for keyboard focus, never on a mouse click.

### 7. Some things got quietly more solid

* The FAQ list and the menus no longer scroll the page behind them when you
  reach the end.
* Tab switching on the Comms Timeline cross-fades, and the panels stay built
  instead of being torn down, so returning to a tab is instant.
* The reminder's small dismiss badge now accepts a tap 10px outside its
  outline. It looks identical; it is simply easier to hit.

---

## What was measured, and what was cut because of it

Frosted glass is not free. Every effect was timed in a browser with **no GPU
at all** — the worst case, and a fair stand-in for an old corporate laptop.
Frame times during the panel's opening slide:

| Version | Median frame | Verdict |
| --- | --- | --- |
| Whole viewport blurred behind the panel | 83ms (≈12fps) | Cut |
| Panel blurred, viewport not | 33ms (≈30fps) | Kept |
| No blur anywhere | 17ms (60fps) | — |

So the full-screen blur behind the FAQ panel was **removed**. It cost more
than everything else in this change put together, and it sat behind a dimming
layer where you could barely see it. The dimming stayed; the blur went.

Worth knowing for future changes: the *radius* of a blur costs almost nothing
— 12px and 34px measured the same. What costs is having another blurred region
at all. Two stacked ones cost twice.

Everything that animates is limited to `transform` and `opacity`, the two
properties a browser can move without re-doing the page layout.

---

## If you want to change the feel

The tokens at the top of the style block are the dials:

```css
--dur-press: 100ms;   /* how fast a press registers  */
--dur-fast:  180ms;   /* carets, chips, hovers       */
--dur-base:  260ms;   /* menus and popovers          */
--dur-panel: 420ms;   /* the side panel              */
--material-blur: blur(24px) saturate(180%);
```

For the panel's physics, look for `damping` and `response` in
`portal-apple-motion`. Lower response is snappier. Damping below `1.0` adds
bounce — worth resisting anywhere the user did not throw something.

Ask any Claude session working in this repo to "use the apple-design skill"
and it will read the same rules these changes came from.
