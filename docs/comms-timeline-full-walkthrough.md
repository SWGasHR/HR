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
| 11 | `Source` | **Dropdown (single select)** | Values: `Power Automate`, `Manual`. |
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

> ### ⚠️ How it updates the tracker without ever touching manual rows
> You want the flow to do real two-way work: look over the master sheet **and**
> the existing comms tracker, then **add** comms that are missing and **update**
> comms that changed on the master — while never disturbing a row a person
> entered by hand. That is exactly what this build does, and the safety comes
> from one idea: **the flow can only ever write to a row it owns.**
>
> 1. **Every row has an owner stamp.** Rows the flow creates are stamped
>    `Source = Power Automate` and carry a **Sync Key** = the master row's ID.
>    Rows people add — by the form or by typing — are `Source = Manual` with a
>    **blank Sync Key**.
> 2. **The flow finds rows only by Sync Key.** For each master row it looks in
>    the tracker for a row whose **Sync Key equals that master row's ID**.
>    Manual rows have no Sync Key, so they can *never* match — they are
>    invisible to the update step. This is the guarantee: the set of rows the
>    flow can update contains *only* rows the flow itself created.
> 3. **Match → update, no match → add.** If it finds its own row, it updates
>    it. If it finds nothing, it adds a new one. It never blind-writes and
>    never deletes.
> 4. **Human-curated fields are protected even on auto rows.** The update step
>    only writes the **master-driven** fields (the deliverable name, initiative,
>    and Send Date). It never writes **Audience, Channel, Status, Owner, or
>    Notes**, so the choices a person makes on a suggested row survive every
>    future run. A **`Locked`** checkbox lets anyone pin an auto row so the flow
>    skips it entirely.
>
> Net effect: master updates flow through to the tracker automatically, manual
> rows are structurally untouchable, and a person's edits to a suggested row
> are kept. That is "override based on updates, but don't touch what people
> added."

Two levels below. Level 1 is 5 minutes, needs nothing but Smartsheet, and is
**add-only** (it can create rows but not update them). Level 2 is the Power
Automate **upsert** described above — it adds *and* updates by Sync Key — done
click by click.

### C0. Prepare both sheets (the upsert needs these)

**On the master HR sheet** — add two columns (right-click a header → Insert
Column Right):

1. `Needs Comms` — **Checkbox**.
2. `Comms Date` — **Date**.

The rule for project owners: when a milestone needs an announcement, check
**Needs Comms** and set the **Comms Date**. The flow keys off the master row's
own ID, so you don't add an ID column — Power Automate reads the Row ID for you.

**On the HR Comms Calendar (tracker)** — you already added `Source` and
`Sync Key` in Part A. Add one more so people can pin a row:

3. `Locked` — **Checkbox**. When checked, the flow leaves that row completely
   alone (even if it's an auto row). Manual rows are protected automatically by
   having no Sync Key; `Locked` is the extra escape hatch for auto rows a
   human wants frozen.

Reminder of the two populations this relies on:

| | Manual rows | Auto rows |
|---|---|---|
| `Source` | `Manual` | `Power Automate` |
| `Sync Key` | *(blank)* | the master row's ID |
| Flow can find it? | **No** — never matched | Yes — matched by Sync Key |
| Flow can change it? | **Never** | Only the master-driven fields, unless `Locked` |

### C1. Level 1 — Smartsheet-only (no Power Automate)

1. Open the **master HR sheet** → **Automation** → **Create workflow → start
   from scratch**.
2. Trigger: **When rows are added or changed** → click "any field" → choose
   **Needs Comms** → "changes to" → **Checked**.
3. Action: **Copy rows to another sheet** → select **HR Comms Calendar**.
4. Name it `Send flagged rows to Comms Calendar` → **Save**.

**What Level 1 can and can't do:** *Copy rows* only ever **appends** new rows —
it cannot update an existing one — so it's safe for manual rows but it does
**not** give you the "update the tracker when the master changes" behavior you
asked for. It re-copies whenever **Needs Comms** flips to checked, so treat
that box as one-way. Use Level 1 only as a quick start; **Level 2 is the design
you actually want** (add *and* update by Sync Key). Copy-row also drags every
master column along on first run — right-click each unwanted header → **Hide
Column** once.

### C2. Level 2 — the Power Automate upsert (what you actually want)

**How it works, in one picture:**

```
Every day (or on demand):
  read all master rows  ─┐
                         ├─ for each master row that needs a comm:
  read all tracker rows ─┘      search the tracker for its Sync Key (MK-<row id>)
                                   ├─ FOUND  → the row is one the flow made:
                                   │            if Locked, skip;
                                   │            else UPDATE only the master-driven
                                   │            fields (deliverable, initiative, date)
                                   └─ NOT FOUND → ADD a new auto row
                                                  (Source=Power Automate, Sync Key set)
  manual rows have no MK- Sync Key → the search never returns them → never touched
```

That is add-or-update keyed by Sync Key, with manual rows structurally out of
reach. Below is every click.

> **License note:** the Smartsheet connector in Power Automate is a **Premium**
> connector. You need a Power Automate Premium license (there's a 90-day trial
> Power Automate offers the first time you add the connector). If your org
> blocks the trial, that license is the one thing to ask IT for.
>
> **No-code alternative:** if your org has **Smartsheet DataMesh**, it does
> exactly this natively — map the master to the tracker on a lookup key, choose
> which columns it may write, and it updates matched rows + adds new ones while
> leaving every other row and column alone. If you have DataMesh, use it and
> skip the flow. Otherwise, Power Automate below.

#### C2-a. One prep step that makes the lookup reliable

The flow finds a tracker row by **searching** for its Sync Key, so the key must
be unique enough that a search can't hit the wrong cell. Use a prefixed key:

> **Sync Key value = `MK-` + the master row's ID** — e.g. `MK-4283719`.

A search for `MK-4283719` matches that one cell and nothing else. (Plain
numbers could collide with other data; the `MK-` prefix prevents that.)

#### C2-b. Create the flow shell

1. Go to **make.powerautomate.com** → sign in with your work (Microsoft 365)
   account.
2. Left menu → **Create** → tile **Scheduled cloud flow** (we want a daily
   reconcile that catches new comms *and* changed dates, not just new rows).
3. In the dialog: **Flow name** `HR Comms – Sync from Master` → set it to
   repeat every **1 Day** at a time like 6:00 AM → **Create**.
4. **Connect Smartsheet** (first time): on the first Smartsheet action you add,
   click **Sign in** → a Smartsheet window opens → sign in → click **Allow** on
   the consent screen.

#### C2-c. Read the master and the tracker

1. **+ New step** → search `Smartsheet` → action **"Get sheet"** →
   **Sheet** = master HR sheet. Rename this card `Get master` (⋯ → Rename).
2. **+ New step** → **"Get sheet"** again → **Sheet** = **HR Comms Calendar**.
   Rename it `Get tracker`. (This copy is only read, to look up Sync Keys.)

#### C2-d. Loop the master rows and branch add-vs-update

1. **+ New step** → **"Apply to each"**. In "Select an output", pick the
   **rows** of `Get master` (Dynamic content → *Get master → rows*).
2. Inside the loop, **Add an action → "Condition"** — this is the "does this
   row need a comm?" gate:
   - `Needs Comms` **is equal to** `true`  **AND**  `Comms Date` **is not
     equal to** *(leave value empty)*.
   - (Referencing a master column value: if your connector shows the columns as
     friendly names, pick them; if it shows a `cells` array, use the
     *Get column value* expression — tell me your connector version and I'll
     paste the exact expressions.)
3. In the Condition's **If yes** branch, **Add an action → Smartsheet
   "Search"** (a.k.a. *Search for sheets and rows* / *Search sheet*):
   - **Query** = `MK-` followed by the master row's **Row ID** (dynamic).
   - Scope it to the **HR Comms Calendar** if the action offers a sheet box.
   - Rename it `Find existing`.
4. Still in **If yes**, add another **"Condition"** named `Exists?`:
   **length of the `Find existing` results** `is greater than` `0`.

**`Exists?` → If yes (the flow already made this row) → UPDATE, field-scoped:**

5. First guard against pinned rows: add a **Condition** `Not locked?` →
   the found row's `Locked` **is not equal to** `true`. In its **If yes**:
6. **Smartsheet → "Update row"**:
   - **Sheet** = HR Comms Calendar.
   - **Row ID** = the found row's id (from `Find existing`).
   - Set **only** these fields — leave every other box empty so curated data
     is never overwritten:

     | Field to write | Value |
     |---|---|
     | Communication / Deliverable | dynamic: master task/milestone name |
     | Initiative / Project | dynamic: master project name |
     | Send Date | dynamic: **Comms Date** |

   - Do **not** put anything in Audience, Channel, Status, Owner, Notes, Source,
     or Sync Key — untouched boxes stay exactly as the human left them.

**`Exists?` → If no (nothing found) → ADD a new auto row:**

7. **Smartsheet → "Add row to a sheet"** → **Sheet** = HR Comms Calendar:

   | Field | Value |
   |---|---|
   | Communication / Deliverable | dynamic: master task/milestone name |
   | Initiative / Project | dynamic: master project name |
   | Send Date | dynamic: **Comms Date** |
   | Owner | dynamic: master owner/assigned-to |
   | Status | type literally: `Suggested (Auto)` |
   | Source | type literally: `Power Automate` |
   | Sync Key | expression: `concat('MK-', <master Row ID>)` |
   | everything else | leave blank — humans fill during review |

#### C2-e. Teams notification (optional)

In the **If no / Add** branch, after Add row: **+ Add an action** → search
`Teams` → **"Post message in a chat or channel"** → Post as **Flow bot**, Post
in **Channel**, pick your HR team/channel, message e.g.
`New suggested comm: ` *(master task name)* ` on ` *(Comms Date)*
` — set its audience & channel on the Comms Timeline.` (Only the *Add* branch
posts, so you're pinged for genuinely new comms, not every date tweak.)

#### C2-f. Save, test, and turn on

1. **Save** (top right). If the **Flow checker** shows a red dot, click it — it
   names the exact box that's missing.
2. **Run it now:** click **Test → Manually → Run**, or wait for the schedule.
3. **Watch it:** left menu **My flows** → your flow → **28-day run history**.
   Green check = success (click to see each step's in/out); red X = click the
   failed step to read the error.
4. Open **HR Comms Calendar** — new comms appear as yellow `Suggested (Auto)`
   rows; changed master dates update the matching rows; manual rows are
   unchanged. All of it is already live on the portal's calendar and list.

#### C2-g. Settings worth knowing (the "advanced" bits)

- **Rename every card** (⋯ → Rename) so the flow reads like a sentence.
- **Retry policy:** ⋯ → **Settings** → Retry Policy — leave the default
  (4 retries, exponential).
- **Concurrency:** leave **off** — a daily reconcile shouldn't overlap itself.
- **Pin a row from automation:** check **`Locked`** on any auto row and the
  flow's `Not locked?` gate skips it forever.
- **Deletions are deliberately manual.** If a comm is dropped from the plan,
  the flow does **not** delete its tracker row (deleting is the one
  irreversible thing). Uncheck its plan, then delete the tracker row by hand,
  or set Status = `Cancelled`. If you ever *want* auto-cancel, add a branch:
  when the master row is no longer flagged, `Update row` → Status `Cancelled`
  (never delete).
- **Co-owner:** flow page → **Edit** next to Owners → add a teammate so the
  flow survives your vacation.

### C3. "What comms does it think are needed?" — optional suggestion layer

The reliable core above is **flag-driven**: a comm reaches the calendar
because a human ticked **Needs Comms**. That covers "comms already in the
plans." To also have the flow *propose* comms nobody flagged — the "thinks
are needed" part — add a light, rule-based suggestion pass. (True AI judgment
isn't something Power Automate does; keyword rules are the dependable stand-in,
and because every suggestion lands as `Suggested (Auto)` for a human to keep
or delete, a wrong guess costs nothing.)

Two ways to do it, easiest first:

1. **Smartsheet-side keyword flag (recommended).** On the master sheet add a
   checkbox column `Comms Suggested` with a column formula that trips on
   milestone words, e.g.:
   ```
   =IF(OR(CONTAINS("launch", [Task Name]@row), CONTAINS("rollout", [Task Name]@row),
          CONTAINS("go-live", [Task Name]@row), CONTAINS("kickoff", [Task Name]@row),
          CONTAINS("open enrollment", [Task Name]@row), CONTAINS("deadline", [Task Name]@row),
          CONTAINS("training", [Task Name]@row)), 1, 0)
   ```
   Then, in the flow's trigger/filter, treat **`Comms Suggested` = checked**
   the same as Needs Comms. These rows arrive as `Suggested (Auto)` for the
   weekly review — owners confirm the good ones and delete the noise. Tune the
   word list to your projects over time.
2. **Power Automate keyword branch.** If you'd rather keep the master sheet
   clean, do the keyword test inside the flow: after the trigger, add a
   **Condition** that checks whether the task-name dynamic field
   **contains** any of your keywords, and only run "Add row" on the true
   branch. Same result, logic lives in the flow instead of a sheet column.

Either way, suggested rows enter as normal auto rows (`Source = Power Automate`,
`Sync Key = MK-<row id>`), so they follow the same rule as everything else: the
flow can later update them, a human can curate or `Locked`-pin them, and manual
rows are never matched or touched.

### C4. The form is erase-safe too

Form submissions follow the exact same rules: the form only ever **adds** a
row (with `Source = Manual`, blank Sync Key). It cannot edit or remove any
existing row, auto or manual. So people adding comms through the form and the
flow adding suggestions never collide — they just append to the same sheet,
and both show up on the calendar and list automatically.

### C5. Test it yourself (how to be sure it "works")

I can't run your Power Automate or Smartsheet from here, so here's the
5-minute proof for **you** to run once it's built. It checks the two things
you care about: updates flow through, and manual work is never touched.

1. **Manual-safety test (the important one).** Type a comm straight into the
   HR Comms Calendar (or submit one via the form) — call it "MANUAL TEST",
   and give it an Audience. **Run** the flow. Confirm "MANUAL TEST" is
   **still there, unchanged**. It has no `MK-` Sync Key, so the flow's search
   can never find it — it's structurally out of reach.
2. **Add test.** Check **Needs Comms** on a master row with a Comms Date →
   run the flow → a yellow `Suggested (Auto)` row appears with the right Send
   Date and a `MK-…` Sync Key.
3. **Update test (the new behavior).** Change that master row's **Comms Date**
   → run the flow again → the matching tracker row's Send Date **updates**,
   and no duplicate is created (it matched by Sync Key and updated in place).
4. **Curated-field test.** On that same auto row, set the **Audience** and
   **Channel** by hand, then change the master date once more and run again.
   Confirm the Send Date updates but your **Audience and Channel survive** —
   the flow only writes the master-driven fields.
5. **Lock test.** Check **`Locked`** on the auto row, change the master date,
   run again → the row does **not** change. Uncheck Locked to resume syncing.

Pass all five and it's doing exactly what you asked: it reconciles the tracker
against the master — adding and updating — while never disturbing manual rows
or the choices people make.

### C6. The weekly human routine (the part automation can't do)

Once a week: open the **List View** tab → find the yellow **Suggested
(Auto)** rows (and anything from the form) → fix up Audience and Channel →
set a real Status. Five minutes, and the calendar stays trustworthy.
