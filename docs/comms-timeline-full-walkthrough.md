# Comms Timeline — Full Click-by-Click Walkthrough

This is the "never done this before" version: every screen, every button, in
order. It has three parts:

- **Part A** — build the HR Comms Calendar sheet in Smartsheet
- **Part B** — turn on the calendar view, the form, publishing, and paste the
  links into the portal
- **Part C** — the automation that feeds comms from the master HR sheet
  (Smartsheet automation + Power Automate, step by step)

(The shorter overview lives in `comms-timeline-setup.md`.)

---

## Part A — Build the "HR Comms Calendar" sheet

### A1. Create the sheet

1. Go to **app.smartsheet.com** and sign in.
2. In the left rail, click the **+ (Create)** button (or **Browse → your
   workspace → Create**).
3. Choose **Grid**.
4. Name it exactly **HR Comms Calendar** and pick where it lives (use the
   same workspace as your other HR sheets so sharing rules match).
5. Click **OK/Create** — the empty sheet opens.

### A2. Rename the primary column

1. Double-click the **Primary Column** header.
2. In the box that opens, change **Name** to `Communication / Deliverable`.
3. Click **OK**. (The primary column is always Text — that's what we want.)

### A3. Add each column

For every column below: **right-click any column header → Insert Column
Right**, then in the dialog set the **Name**, pick the **Column Type**, add
the listed options, and click **OK**.

| # | Name | Column type | Settings to click |
|---|------|-------------|-------------------|
| 1 | `Initiative / Project` | **Dropdown (single select)** | In "Values", type one per line: your active initiatives (e.g. `Open Enrollment 2026`, `Competency Rollout`…). Leave **"Restrict to dropdown values only" UNCHECKED** so people can type a new project. |
| 2 | `Send Date` | **Date** | Nothing else. |
| 3 | `Audience` | **Dropdown (single select)** | Values: `All Employees`, `All Leaders`, `White Glove`, `HR Only`, `Field Employees`, `Corporate Employees`, `Other`. CHECK "Restrict to dropdown values only". |
| 4 | `Owner` | **Contact List** | Under "Values", optionally list your team so they autocomplete. Leave "Allow multiple contacts per cell" unchecked. |
| 5 | `Channel` | **Dropdown (multi select)** | Values: `Corp HR Email`, `Corp Comms Post`, `Weekly Roundup`, `Manager Cascade`, `SharePoint / Intranet`, `Teams Post`, `Town Hall`, `Mailer (Home)`, `Other`. Multi-select matters — comms often go out on two channels. |
| 6 | `Status` | **Dropdown (single select)** | Values: `Suggested (Auto)`, `Draft`, `In Review`, `Approved`, `Scheduled`, `Sent`, `On Hold`, `Cancelled`. CHECK "Restrict to dropdown values only". |
| 7 | `Approver` | **Contact List** | — |
| 8 | `Draft Due Date` | **Date** | — |
| 9 | `Link to Draft / Asset` | **Text/Number** | — |
| 10 | `Key Message / Notes` | **Text/Number** | — |
| 11 | `Source` | **Dropdown (single select)** | Values: `Copilot`, `Manual`. (The automation stamps `Copilot`; people/form use `Manual`.) |
| 12 | `Sync Key` | **Text/Number** | Used by the automation to prevent duplicates. |
| 13 | `Type` | **Dropdown (single select)** | Values: `Communication`, `Blackout`. Blackout rows mark no-send windows. |
| 14 | `Conflict` | **Checkbox** | Formula added next. |

### A4. The Conflict formula (flags two comms to the same audience, same day)

1. Click any cell in the **Conflict** column.
2. Type (or paste) exactly:
   ```
   =IF(COUNTIFS([Send Date]:[Send Date], [Send Date]@row, Audience:Audience, Audience@row) > 1, 1, 0)
   ```
3. Press **Enter**.
4. Right-click that same cell → **Convert to Column Formula**. Now every row,
   including future ones, calculates itself.

### A5. Conditional formatting (the colors that show on the calendar)

1. In the toolbar, click the **paint-roller icon (Conditional Formatting)**.
2. Click **Add New Rule**, then on the new rule line:
   - Click **"Set condition"** → choose **Conflict** → **is checked** → OK.
   - Click **"this format"** → click the background-color square → pick
     **red** → click the **"entire row"** dropdown at the end and keep
     *entire row* → OK.
3. Repeat **Add New Rule** for each of these (same clicks, different
   condition/color):
   - Status **is one of** `Suggested (Auto)` → **yellow** background.
   - Status **is one of** `Sent` → **green** background.
   - Status **is one of** `On Hold`, `Cancelled` → **gray** background.
   - Type **is one of** `Blackout` → **dark gray** background.
4. Drag the **Conflict/red rule to the top** of the list (rules apply top
   down; a conflict should win over any status color).
5. Click **OK** to close the dialog.

> If you use these colors, the matching legend for `portal-config.js` is in
> Part B4.

---

## Part B — Calendar view, form, publish, and portal links

### B1. Turn on Calendar View

1. In the toolbar, find the view switcher that currently says **Grid View**.
2. Click it → choose **Calendar View**.
3. If Smartsheet asks which date column to use, pick **Send Date**. (To
   change it later: in Calendar View, click the **gear / Calendar settings**
   icon → set the date column to Send Date.)
4. Press **Ctrl+S / Cmd+S** (or let autosave run) **while still in Calendar
   View** — the published "Full" link opens in the sheet's saved view, so
   saving in Calendar View is what makes the embed a calendar.

### B2. Create the Add Comms form

1. Top menu bar → **Forms** → **Create Form**.
2. The form builder opens with every column as a field. In the left field
   list, **drag off / remove** these so people never see them: `Sync Key`,
   `Conflict`, `Source`, `Status`, `Type`, `Approver`.
3. Re-add two of them as hidden defaults:
   - Drag **Status** back in → click it → set **Default value** = `Draft` →
     toggle **Hidden** ON.
   - Drag **Source** back in → **Default value** = `Manual` → **Hidden** ON.
     (This is how you tell people-added rows apart from automation rows.)
4. Click each remaining field and toggle **Required** ON for:
   Communication / Deliverable, Send Date, Audience, Owner.
5. Click **Settings** (top of the builder) → under "After submission" set the
   confirmation message, e.g. *"Thanks! Your comm is on the HR Comms
   Timeline."*
6. Click **Save**, then **Share Form** → **Copy** the URL. This is your
   **`addFormUrl`**.

### B3. Publish the two read-only links

1. Top menu → **File** → **Publish**.
2. Toggle **Read Only – Full** to ON.
   - In its options, leave "Anyone with the link" (or your org-only option if
     offered — org-only is safer and fine for embedding on the portal).
   - Click the **copy icon** next to the link. This is your
     **`calendarEmbedUrl`** (it opens in the saved Calendar View; viewers can
     also flip to grid).
3. Toggle **Read Only – HTML** to ON and copy that link too. This is your
   **`listEmbedUrl`** (a fast, plain read-only grid).
4. Close the dialog. Also copy the sheet's normal URL from the browser
   address bar — that's the optional **`openSheetUrl`**.

### B4. Paste into `portal-config.js`

Open `portal-config.js` in the repo, find `commsTimeline:` near the top, and
fill in:

```js
commsTimeline: {
  calendarEmbedUrl: "https://app.smartsheet.com/b/publish?EQBCT=...",   // Read Only - Full
  listEmbedUrl:     "https://app.smartsheet.com/b/publish?EQBCT=...",   // Read Only - HTML
  addFormUrl:       "https://app.smartsheet.com/b/form/...",            // the form
  openSheetUrl:     "https://app.smartsheet.com/sheets/...",            // optional

  extraViews: [
    // add published REPORT links here later, e.g.
    // { label: "This Week", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=..." },
  ],

  statusLegend: [
    { label: "Suggested (Auto)", color: "#f5c94e" },
    { label: "Sent",             color: "#57b96b" },
    { label: "On Hold / Cancelled", color: "#b0b3c6" },
    { label: "Conflict",         color: "#e05563" },
    { label: "Blackout",         color: "#7a7d91" }
  ]
},
```

Save — live on the next page load.

### B5. Reminder automations (in the HR Comms Calendar sheet)

For each: **Automation menu (top bar) → Create workflow → start from
scratch**, then:

**Draft reminder**
1. Trigger block: choose **"When a date is reached"** → click the date link →
   **Custom** → "3 days **before**" → date field **Draft Due Date**.
2. Click **+ Add a condition**: **Status** → **is one of** → `Suggested
   (Auto)`, `Draft`.
3. Action block: **Alert someone** → **Send to contacts in a cell** →
   pick **Owner** → click "Customize message" and write e.g. *"Your comm
   {{Communication / Deliverable}} is due for draft in 3 days."*
4. Name it (top left) `Draft due in 3 days` → **Save**.

**Send-date readiness check** — same steps with: 2 days before **Send
Date**; condition **Status is NOT one of** `Approved`, `Scheduled`, `Sent`;
alert **Owner** and (Add another → contacts in a cell) **Approver**.

**New form submission alert** — trigger **"When rows are added"**;
condition **Source is one of** `Manual`; action **Alert someone** → specific
person (you). Message: *"A new comm was added via the form — review it on the
Comms Timeline."*

---

## Part C — Feeding comms from the master HR sheet

This is the part with the "AI." A **Microsoft Copilot Studio** agent is the
brain that reads each project and decides what comms are needed and drafts
them; a **Power Automate** flow is the plumbing that calls the agent and writes
its suggestions into the tracker. Nothing is ever sent to employees — the agent
only *proposes*, and a human approves.

> ### ⚠️ Two guarantees this is built on
> **1. The AI only ever proposes — a human always approves.** Every row the
> agent produces lands as **`Status = Suggested (Auto)`**. It is a draft on the
> tracker, nothing more. No comm goes out until a person reviews it and sets a
> real status. The AI can be wrong (it will occasionally suggest a comm that
> isn't needed, or miss one) and that's fine, because it never has the last
> word.
>
> **2. The flow can only ever write to a row it owns — so manual rows are
> untouchable.** Rows the flow creates are stamped `Source = Copilot` and carry
> a **Sync Key** = `MK-` + the master row's ID. Rows people add (form or typing)
> are `Source = Manual` with a **blank Sync Key**. The flow finds rows *only* by
> searching that Sync Key, so:
> - **Match → update** just the master-driven facts (deliverable, initiative,
>   Send Date). It never rewrites **Audience, Channel, Status, Owner, or Notes**,
>   so a person's edits to a suggested row survive every run.
> - **No match → add** a new suggested row.
> - **Manual rows have no `MK-` key → the search never returns them → they are
>   never updated or deleted.** A **`Locked`** checkbox freezes any auto row too.
> - The flow never deletes anything on the tracker.
>
> Net effect: the AI keeps proposing and the flow keeps the tracker in sync with
> the master, while manual entries and human edits are structurally protected.

Below is the whole thing, click by click: prep, the Copilot Studio agent, the
Power Automate flow that calls it, the approval gate, a self-test, and reusing
the same agent in the portal's "Ask Copilot" panel. Cheaper, no-AI fallbacks
are in the appendix at the end.

> ### Licensing — check this first
> This design uses three paid/managed pieces. Confirm your org has them (ask
> whoever owns your Microsoft licensing):
> - **Copilot Studio** — to build and run the agent/prompt.
> - **AI Builder credits** — consumed each time the flow runs the prompt (a
>   Copilot Studio prompt called from Power Automate runs on AI Builder credits).
> - **Power Automate Premium** — the **Smartsheet** connector is premium.
>
> All three are Microsoft/Power Platform, so this satisfies a "use Copilot"
> mandate. To keep AI credits down, the flow below only calls the agent for
> rows it hasn't reviewed yet (see `AI Reviewed` below) — not every row every
> day.

### C0. Prepare both sheets

**On the master HR sheet** — add three columns (right-click a header → Insert
Column Right):

1. `Needs Comms` — **Checkbox**. A person ticks this to *force* a comm even if
   the AI wouldn't have suggested one ("this is definitely going out").
2. `Comms Date` — **Date**. The intended send date when it's already known.
3. `AI Reviewed` — **Checkbox**. The flow ticks this after the agent has looked
   at the row, so the agent isn't re-run (and re-charged) on it every day. To
   have the agent re-evaluate a row later, just uncheck it.

You don't add an ID column — Power Automate reads each master row's built-in
**Row ID** for the Sync Key.

**On the HR Comms Calendar (tracker)** — you already added `Source` and
`Sync Key` in Part A. Add one more:

4. `Locked` — **Checkbox**. When checked, the flow leaves that row completely
   alone (even if it's an auto row). Manual rows are protected automatically by
   having no Sync Key; `Locked` is the extra escape hatch for auto rows a human
   wants frozen.

Reminder of the two populations this relies on:

| | Manual rows | Auto (AI) rows |
|---|---|---|
| `Source` | `Manual` | `Copilot` |
| `Sync Key` | *(blank)* | `MK-` + the master row's ID |
| Flow can find it? | **No** — never matched | Yes — matched by Sync Key |
| Flow can change it? | **Never** | Only master-driven fields, unless `Locked` |

### C1. Build the Copilot Studio agent (the AI brain)

You'll build one **prompt** — a reusable AI instruction with inputs and a
structured output — inside Copilot Studio. The Power Automate flow calls it once
per project row.

1. Go to **copilotstudio.microsoft.com** → sign in with your work account →
   pick your environment (top right) if you have more than one.
2. Left menu → **Prompts** (under *Tools* / *Library* depending on your tenant)
   → **+ New prompt**. (A "prompt" is the unit Power Automate can call. If your
   tenant only shows **Agents**, create an agent, then add this same text as a
   **Prompt** tool inside it — the flow calls the prompt either way.)
3. **Name** it `HR Comms Advisor`.
4. **Add inputs** (click **+ Add** → *Text* for each) — these are the project
   details the flow will pass in:
   `ProjectName`, `Milestone`, `MilestoneDate`, `Owner`, `Description`.
5. In the big instruction box, paste this and click each `{input}` where shown
   to insert the real input token:

   ```
   You are an HR communications planner for Southwest Gas. Given ONE project
   milestone, decide whether it warrants a communication to employees or
   leaders, and if so, draft it. Be conservative — only suggest a comm for
   milestones people genuinely need to hear about (launches, rollouts,
   go-lives, enrollment windows, policy or system changes, required training,
   deadlines that affect staff). Routine internal tasks do NOT need a comm.

   Project: {ProjectName}
   Milestone: {Milestone}
   Milestone date: {MilestoneDate}
   Owner: {Owner}
   Details: {Description}

   Reply with ONLY a JSON object, no other text:
   {
     "needsComm": true or false,
     "deliverable": "short name of the communication",
     "audience": "one of: All Employees, All Leaders, White Glove, HR Only, Field Employees, Corporate Employees",
     "channel": "one of: Corp HR Email, Corp Comms Post, Weekly Roundup, Manager Cascade, SharePoint / Intranet, Teams Post, Town Hall",
     "suggestedSendDate": "YYYY-MM-DD, a few business days before the milestone date",
     "keyMessage": "one sentence on what the comm should say",
     "confidence": "High, Medium, or Low"
   }
   If needsComm is false, still return the object with empty strings for the
   other fields.
   ```

6. Set the output format to **Text** (we parse the JSON in the flow). Click
   **Test**, type a sample milestone into the inputs, and confirm it returns
   clean JSON. **Save**. Leave it published in this environment.

> Why a prompt and not a chatbot: the flow needs a single question-in,
> answer-out call per row. The same instructions can also power a full
> conversational agent for the portal's "Ask Copilot" panel — see C6.

### C2. Build the Power Automate flow (calls Copilot, writes the tracker)

**The whole flow in one picture:**

```
Every day:
  Get all master rows
  Get all tracker rows (to look up Sync Keys)
  For each master row:
     search tracker for its Sync Key  (MK-<row id>)
       ├─ FOUND & not Locked → UPDATE Send Date only (keep it in sync)   → done
       └─ NOT FOUND:
             already AI-Reviewed?  ── yes → do nothing (don't re-nag / re-charge)
                                   └─ no → ask the Copilot agent about this row
                                            ├─ needsComm = true (or Needs Comms ticked)
                                            │     → ADD a Suggested (Auto) row with the
                                            │       agent's drafted fields + ping Teams
                                            └─ needsComm = false → add nothing
             then tick AI Reviewed on the master row
  manual rows have no MK- key → the search never finds them → never touched
```

#### C2-a. Create the flow shell

1. Go to **make.powerautomate.com** → sign in with your work account.
2. Left menu → **Create** → tile **Scheduled cloud flow**.
3. **Flow name** `HR Comms – Copilot Sync` → repeat every **1 Day** at ~6:00 AM
   → **Create**.
4. The first time you add a Smartsheet or Copilot action it will ask you to
   **Sign in** / **Allow** — do that once per connector.

#### C2-b. Read both sheets

1. **+ New step** → search `Smartsheet` → **"Get sheet"** → **Sheet** = master
   HR sheet. Rename the card `Get master` (⋯ → Rename).
2. **+ New step** → **"Get sheet"** → **Sheet** = **HR Comms Calendar**. Rename
   `Get tracker`.

#### C2-c. Loop each master row

1. **+ New step** → **"Apply to each"** → output = **rows** of `Get master`.
2. Inside the loop, **Smartsheet → "Search"** (Search for sheets and rows):
   **Query** = `MK-` + the master row's **Row ID**; scope to **HR Comms
   Calendar**. Rename `Find existing`.
   > Referencing a master column value (Row ID, Needs Comms, dates, etc.): if
   > your connector shows friendly column names, pick them; if it shows a
   > `cells` array, use the *Get column value* expression. Send me your
   > connector version + master column names and I'll paste the exact
   > expressions.
3. **Condition** `Exists?` → length of `Find existing` results **is greater
   than** `0`.

**`Exists?` = Yes → keep it in sync (no AI call needed):**

4. **Condition** `Not locked?` → found row's `Locked` **is not equal to**
   `true`. **If yes → Smartsheet "Update row"** on HR Comms Calendar, Row ID =
   found row's id, and set **only** `Send Date` = master `Comms Date`. Leave
   every other box empty so curated fields are never overwritten.

**`Exists?` = No → maybe create it (this is where the AI runs):**

5. **Condition** `Already reviewed?` → master `AI Reviewed` **is equal to**
   `true`. **If yes → do nothing** (already handled or intentionally declined —
   don't re-nag or re-spend credits). **If no**, continue:
6. **Add an action → "Run a prompt"** (AI Builder / Copilot) → pick
   **HR Comms Advisor** → fill its inputs from the master row (ProjectName,
   Milestone, MilestoneDate, Owner, Description dynamic values).
7. **Add an action → "Parse JSON"** → Content = the prompt's **Text/Response**
   output. For the schema, click **Generate from sample** and paste one of the
   agent's JSON replies. Now `needsComm`, `deliverable`, `audience`, etc. are
   usable fields.
8. **Condition** `Create it?` → `needsComm` **is equal to** `true` **OR** master
   `Needs Comms` **is equal to** `true`. **If yes → Smartsheet "Add row to a
   sheet"** on HR Comms Calendar:

   | Field | Value |
   |---|---|
   | Communication / Deliverable | Parse JSON → `deliverable` (or master milestone name if empty) |
   | Initiative / Project | dynamic: master project name |
   | Send Date | Parse JSON → `suggestedSendDate` (fall back to master `Comms Date`) |
   | Audience | Parse JSON → `audience` |
   | Channel | Parse JSON → `channel` |
   | Key Message / Notes | Parse JSON → `keyMessage` |
   | Owner | dynamic: master owner |
   | Status | type literally: `Suggested (Auto)` |
   | Source | type literally: `Copilot` |
   | Sync Key | expression: `concat('MK-', <master Row ID>)` |

9. **After** the `Create it?` condition (in both branches), **Smartsheet
   "Update row"** on the **master** sheet → set `AI Reviewed` = `true`, so this
   row isn't evaluated again. (Uncheck it by hand later to force a re-look.)

#### C2-d. Teams notification (optional)

Inside the `Create it?` = Yes branch, after Add row: **+ Add an action** →
`Teams` → **"Post message in a chat or channel"** → Post as **Flow bot** →
**Channel** → your HR team/channel → message e.g.
`Copilot suggested a new comm: ` *(Parse JSON: deliverable)* ` for `
*(master project)* ` — review & approve it on the Comms Timeline.`

#### C2-e. Save, test, and turn on

1. **Save**. If the **Flow checker** shows a red dot, click it — it names the
   exact box that's missing.
2. **Run it now:** **Test → Manually → Run**.
3. **Watch it:** **My flows** → your flow → **28-day run history**. Green check
   = success (click to see each step's in/out, including what the agent
   returned); red X = click the failed step for the error.
4. Open **HR Comms Calendar** — Copilot's picks appear as yellow
   `Suggested (Auto)` rows with a drafted audience/channel; changed master dates
   update matching rows; manual rows are unchanged. It's all live on the portal.

#### C2-f. Settings worth knowing (the "advanced" bits)

- **Control AI cost:** the `AI Reviewed` gate means each row is sent to the
  agent once. To also skip old work, add a condition so only rows with a
  future milestone date are evaluated.
- **Rename every card** (⋯ → Rename) so the flow reads like a sentence.
- **Retry policy:** ⋯ → **Settings** → leave the default (4 retries).
- **Concurrency:** leave **off** — a daily reconcile shouldn't overlap itself.
- **Pin a row from automation:** check **`Locked`** on any auto row.
- **Deletions are deliberately manual.** The flow never deletes a tracker row
  (deleting is the one irreversible thing). Drop a comm by deleting it by hand
  or setting Status = `Cancelled`. Optional auto-cancel branch: when a master
  row is no longer relevant, `Update row` → Status `Cancelled` (never delete).
- **Co-owner:** flow page → **Edit** next to Owners → add a teammate.

### C3. The approval gate — why the AI never has the last word

Everything the agent produces is a **draft**: `Status = Suggested (Auto)`,
`Source = Copilot`. Nothing is a real, going-out comm until a person reviews it.
That's the safety valve for using AI on employee communications — a wrong or
half-baked suggestion just sits on the tracker as yellow until someone accepts,
fixes, or deletes it. Keep this gate; don't let the flow set any status past
`Suggested (Auto)`.

### C4. The form is safe too

Form submissions follow the exact same rules: the form only ever **adds** a
row (with `Source = Manual`, blank Sync Key). It cannot edit or remove any
existing row, auto or manual. So people adding comms through the form and the
flow adding suggestions never collide — they just append to the same sheet,
and both show up on the calendar and list automatically.

### C5. Test it yourself (how to be sure it "works")

I can't run your Copilot Studio, Power Automate, or Smartsheet from here, so
here's the proof for **you** to run once it's built. It checks that the AI
suggests, updates flow through, and manual work is never touched.

1. **Manual-safety test (the important one).** Type a comm straight into the
   HR Comms Calendar (or submit one via the form) — call it "MANUAL TEST",
   give it an Audience. **Run** the flow. Confirm "MANUAL TEST" is **still
   there, unchanged**. It has no `MK-` Sync Key, so the flow's search can never
   find it — structurally out of reach.
2. **AI suggestion test.** Add a master row with a clear comm-worthy milestone
   (e.g. "Open Enrollment opens 11/1") and leave `Needs Comms` unchecked and
   `AI Reviewed` unchecked → run the flow → a yellow `Suggested (Auto)` /
   `Source = Copilot` row appears with a drafted deliverable, audience, and
   channel, and the master row's `AI Reviewed` is now ticked.
3. **AI-restraint test.** Add a routine master row (e.g. "Update internal
   tracker column") → run → confirm the agent adds **no** row for it
   (needsComm = false), and `AI Reviewed` still gets ticked so it won't be
   re-checked.
4. **Update test.** Change a suggested row's master `Comms Date` → run again →
   the tracker row's Send Date **updates**, no duplicate.
5. **Curated-field test.** Set the **Audience/Channel** on an auto row by hand,
   change the master date, run again → Send Date updates but your Audience and
   Channel **survive**.
6. **Lock test.** Check **`Locked`** on an auto row, change the master date, run
   → the row does **not** change.

Pass these and it's doing exactly what you asked: Copilot reads the sheet and
proposes comms, updates flow through, and nothing people entered is disturbed.

### C6. Reuse the same agent in the portal's "Ask Copilot" panel

The portal already has an **Ask Copilot** side panel wired up — it just needs a
URL. Point it at the same HR agent so one Copilot both suggests comms *and*
answers questions across the portal:

1. In **Copilot Studio**, open (or create) a full **Agent** that uses the same
   HR knowledge as your `HR Comms Advisor` prompt.
2. **Channels → Custom website / Embed** → copy the embed URL.
3. In `portal-config.js`, set `copilotEmbedUrl:` to that URL and save. The
   portal's "Smartsheet FAQs" buttons become "Ask Copilot" and open the agent.

(That panel and this flow are independent — you can do either first. The
suggestion flow needs the **prompt**; the panel needs the **agent**; they can
share instructions.)

### C7. The weekly human routine (the part automation can't do)

Once a week: open the **List View** tab → filter to `Suggested (Auto)` → for
each, accept or fix the Audience/Channel Copilot drafted, then set a real Status
(Draft/Approved). Delete any the AI got wrong. Five minutes, and the calendar
stays trustworthy.

---

## Appendix — cheaper fallbacks (no AI, or no Power Automate)

If the Copilot/AI Builder licensing isn't available, these get you a working
comms feed with less intelligence:

- **Keyword suggestions instead of AI.** On the master sheet add a checkbox
  `Comms Suggested` with a formula that trips on milestone words, then treat it
  like `Needs Comms` in the flow:
  ```
  =IF(OR(CONTAINS("launch",[Task Name]@row), CONTAINS("rollout",[Task Name]@row),
         CONTAINS("go-live",[Task Name]@row), CONTAINS("kickoff",[Task Name]@row),
         CONTAINS("open enrollment",[Task Name]@row), CONTAINS("training",[Task Name]@row)), 1, 0)
  ```
  No AI credits, but it's dumb string-matching — no judgment, no drafting.
- **Smartsheet-only, no Power Automate.** Master **Automation → When `Needs
  Comms` changes to checked → Copy row to HR Comms Calendar.** Add-only (can't
  update), re-copies on re-check, and drags master columns along — but free and
  five minutes. Good for a pilot.
- **Smartsheet DataMesh** (if your org has it) does the add-*and*-update keyed
  sync natively, no flow — but no AI drafting; pair it with the keyword flag for
  suggestions.
