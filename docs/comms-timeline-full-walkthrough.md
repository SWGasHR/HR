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

Two levels. Level 1 is 5 minutes and needs nothing but Smartsheet. Level 2
adds Power Automate for clean field mapping and Teams notifications — done
click by click as requested.

### C0. Prepare the master HR sheet (both levels need this)

In the **master HR sheet**, add two columns (right-click a header → Insert
Column Right):

1. `Needs Comms` — **Checkbox**.
2. `Comms Date` — **Date**.

The rule for project owners: when a milestone needs an announcement, check
**Needs Comms** and set the **Comms Date**. Everything downstream is
automatic. (This beats having automation "guess" what needs comms — guessing
produces junk rows people learn to ignore.)

### C1. Level 1 — Smartsheet-only (no Power Automate)

1. Open the **master HR sheet** → **Automation** → **Create workflow → start
   from scratch**.
2. Trigger: **When rows are added or changed** → click "any field" → choose
   **Needs Comms** → "changes to" → **Checked**.
3. Action: **Copy rows to another sheet** → select **HR Comms Calendar**.
4. Name it `Send flagged rows to Comms Calendar` → **Save**.

**Caveat to know:** copy-row brings *every* master-sheet column along, so the
first run will append the master's columns to the right side of the comms
sheet. Right-click each unwanted new column header → **Hide Column** (once).
Copied rows also arrive without Status/Source set — you'll fill those during
review. If that annoys you, use Level 2.

### C2. Level 2 — Power Automate (recommended), from absolute zero

**How it works:** a Smartsheet automation copies flagged rows into a small
**staging sheet**; Power Automate watches the staging sheet, then writes a
*clean, mapped* row into HR Comms Calendar (Status = Suggested (Auto),
Source = Power Automate) and pings Teams. The staging sheet absorbs the
copy-row clutter so your calendar stays clean.

> **License note:** the Smartsheet connector in Power Automate is a
> **Premium** connector. You need a Power Automate Premium license (there's a
> 90-day trial — Power Automate will offer it the first time you add the
> connector). If your org blocks the trial, this is the one thing to ask IT
> for.

#### C2-a. Create the staging sheet (in Smartsheet)

1. Create a new grid sheet named **Comms Intake (Auto)** (same clicks as A1).
2. No columns needed beyond the default — the copy-row automation will bring
   the master's columns with it on first run.
3. In the **master HR sheet**, build the same automation as C1 but pointing
   at **Comms Intake (Auto)** instead of the calendar:
   *Automation → Create workflow → When rows are added or changed → Needs
   Comms changes to Checked → Copy rows to another sheet → Comms Intake
   (Auto) → Save.*
4. Test now: check **Needs Comms** on any master row → within a minute the
   row appears in Comms Intake (Auto). (Uncheck/recheck later re-copies, so
   only check it when it's real.)

#### C2-b. Create the flow

1. In your browser go to **make.powerautomate.com** and sign in with your
   work (Microsoft 365) account.
2. Left menu → **Create**.
3. Choose the tile **Automated cloud flow**.
4. In the dialog:
   - **Flow name:** `HR Comms – New Suggested Comm`
   - In **"Choose your flow's trigger"**, type `Smartsheet` in the search
     box.
   - Select **"When a new row is created (Smartsheet)"**.
   - Click **Create**.
5. **Connect Smartsheet** (first time only): a sign-in prompt appears on the
   trigger card → click **Sign in** → a Smartsheet window opens → enter your
   Smartsheet credentials → click **Allow** on the "Power Automate wants
   access" consent screen. The card now shows your connection.
6. On the trigger card **"When a new row is created"**:
   - Click the **Sheet** dropdown → pick **Comms Intake (Auto)**.
   - That's the only required setting.

#### C2-c. Add the "write to the calendar" step

1. Click **+ New step** (or the **+** under the trigger → "Add an action").
2. Search `Smartsheet` → under Actions choose **"Add row to a sheet"**.
3. On the card:
   - **Sheet** dropdown → **HR Comms Calendar**.
   - The card now shows one input per column of the calendar sheet. Fill
     them like this (click into a box, then pick from the **Dynamic
     content** panel that pops up on the right — dynamic content = values
     from the staging row that triggered the flow):

     | Calendar column | What to put in it |
     |---|---|
     | Communication / Deliverable | dynamic: the master row's task/milestone name column |
     | Initiative / Project | dynamic: the master row's project name column |
     | Send Date | dynamic: **Comms Date** |
     | Owner | dynamic: the master row's owner/assigned-to column |
     | Status | type literally: `Suggested (Auto)` |
     | Source | type literally: `Power Automate` |
     | Sync Key | dynamic: **Row ID** (the trigger's row id) |
     | everything else | leave blank — humans fill it during review |

   - If a dynamic field you expect isn't listed, click **"See more"** in the
     dynamic content panel.

#### C2-d. Add the Teams notification (optional but worth it)

1. **+ New step** → search `Teams` → choose **"Post message in a chat or
   channel" (Microsoft Teams)**.
2. On the card:
   - **Post as:** `Flow bot`
   - **Post in:** `Channel`
   - **Team:** your HR team → **Channel:** wherever comms folks look.
   - **Message:** e.g.
     `New suggested comm: ` *(dynamic: task name)* ` on ` *(dynamic: Comms
     Date)* ` — review it on the Comms Timeline and set the audience/channel.`

#### C2-e. Save, test, and turn on

1. Click **Save** (top right). If the **Flow checker** (top right) shows a
   red dot, click it — it tells you exactly which box is missing.
2. Real test: in the **master HR sheet**, check **Needs Comms** on a test row
   with a Comms Date → wait ~1 minute (Smartsheet copies it to staging) →
   the flow fires.
3. Watch it run: left menu **My flows** → click the flow →
   **28-day run history**. A green check = success; click the run to see
   every step's inputs/outputs. A red X = click the failed step to read the
   error message.
4. Open **HR Comms Calendar** — the new row should be there in yellow
   (Suggested (Auto)), and it's already on the portal's calendar and list.
5. The flow is **On** automatically after saving. To pause it later: My
   flows → ⋯ next to the flow → **Turn off**.

#### C2-f. Settings worth knowing (the "advanced" bits)

- **Rename steps** so future-you understands the flow: click the **⋯** on any
  card → **Rename**.
- **Retry policy:** ⋯ on a card → **Settings** → Retry Policy. The default
  (4 retries, exponential) is right — don't change it.
- **Concurrency:** trigger card ⋯ → Settings → Concurrency Control. Leave
  OFF — comms rows are rare, and order doesn't matter here.
- **Failure emails:** Power Automate emails you automatically when a flow
  fails repeatedly — no setup needed.
- **Co-owner:** flow page → **Edit** next to Owners → add a teammate, so the
  flow doesn't die if you're out.
- **Duplicates:** each staging row triggers exactly once, so duplicates only
  happen if someone unchecks and re-checks Needs Comms. The **Sync Key**
  column shows you the source row id — if you ever see two rows with the
  same Sync Key, delete one and ask the owner to stop toggling the box. 🙂

### C3. The weekly human routine (the part automation can't do)

Once a week: open the **List View** tab → find the yellow **Suggested
(Auto)** rows (and anything from the form) → fix up Audience and Channel →
set a real Status. Five minutes, and the calendar stays trustworthy.
