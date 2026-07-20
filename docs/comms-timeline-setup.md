# Comms Timeline — Setup Guide

The **Comms Timeline** page (Navigation dropdown → Comms Timeline) shows every
communication going out from HR in three tabs:

| Tab | What it is |
| --- | --- |
| **Calendar View** | The HR Comms Calendar sheet, published in Calendar View |
| **List View** | The same sheet, published as a read-only grid |
| **Add Comms** | The same sheet's intake form |

All three are windows onto **one Smartsheet sheet** — the *HR Comms Calendar*.
A comm added through the form (or by Power Automate) instantly appears in both
the calendar and the list. Nothing is ever entered twice, and the calendar and
list can never drift apart.

```
Master HR sheet ──(Power Automate, daily)──▶
                                             HR Comms Calendar sheet
People ──────────(Add Comms form)──────────▶        │
                                                    ├──▶ Calendar View tab
                                                    └──▶ List View tab
```

Setup is one-time and takes about 15 minutes in Smartsheet, plus the Power
Automate flow.

> Never built a sheet or a flow before? Use the click-by-click version
> instead: **[comms-timeline-full-walkthrough.md](comms-timeline-full-walkthrough.md)**
> spells out every screen and button.

---

## Step 1 — Build the "HR Comms Calendar" sheet

Create a new sheet named **HR Comms Calendar** with these columns:

| Column | Type | Values / notes |
| --- | --- | --- |
| **Communication / Deliverable** | Text (primary) | e.g. "Open Enrollment kickoff email" |
| **Initiative / Project** | Dropdown (allow other) | The project driving the comm, e.g. "Open Enrollment 2026" |
| **Send Date** | Date | The date the comm goes out — this drives the calendar |
| **Audience** | Dropdown | All Employees, All Leaders, White Glove, HR Only, Field Employees, Corporate Employees, Other |
| **Owner** | Contact List | Who is responsible for the comm |
| **Channel** | Multi-select Dropdown | Corp HR Email, Corp Comms Post, Weekly Roundup, Manager Cascade, SharePoint / Intranet, Teams Post, Town Hall, Mailer (Home), Other |
| **Status** | Dropdown | Suggested (Auto), Draft, In Review, Approved, Scheduled, Sent, On Hold, Cancelled |

Recommended extra columns (these earn their keep quickly):

| Column | Type | Why |
| --- | --- | --- |
| **Approver** | Contact List | Who signs off before it goes out |
| **Draft Due Date** | Date | Work-back date so drafting doesn't slip to send day |
| **Link to Draft / Asset** | Text | Where the actual email/post lives |
| **Key Message / Notes** | Text | One-liner on what the comm says |
| **Source** | Dropdown: Power Automate, Manual | Shows which rows the flow suggested vs. people added |
| **Sync Key** | Text | Filled by the flow (master row ID) so it never adds the same comm twice — see Step 4 |

Tips:

- Use **conditional formatting** on Status (e.g. yellow for "Suggested (Auto)",
  green for "Sent") — the colors carry into the published calendar.
- "Suggested (Auto)" exists so Power Automate rows arrive clearly marked as
  *needs human review*, not as approved comms.

## Step 2 — Turn on Calendar View, the form, and publishing

In the HR Comms Calendar sheet:

1. **Calendar View** — switch the view to *Calendar* (bottom/top view toggle),
   choose **Send Date** as the date column, then **save** so Calendar is the
   sheet's saved view.
2. **Form** — menu **Forms → Create Form**. Keep: Communication / Deliverable,
   Initiative / Project, Send Date, Audience, Owner, Channel, plus Notes.
   Set hidden defaults on the form: `Status = Draft`, `Source = Manual`.
   Copy the form link.
3. **Publish** — **File → Publish**:
   - Turn on **Read Only – Full** → this is the **calendar** link (it opens in
     the sheet's saved view, which is now Calendar; viewers can also flip to
     grid).
   - Turn on **Read Only – HTML** → this is the **list** link (lightweight
     read-only grid).

> Alternative if you want the two tabs fully independent: create two
> **reports** on the sheet (one saved in Calendar View, one in Grid), and
> publish each report — each report gets its own publish link.

## Step 3 — Paste the links into `portal-config.js`

Open `portal-config.js`, find `commsTimeline:` near the top, and paste:

```js
commsTimeline: {
  calendarEmbedUrl: "PASTE the Read Only - Full publish link",
  listEmbedUrl:     "PASTE the Read Only - HTML publish link",
  addFormUrl:       "PASTE the form link",
  openSheetUrl:     "OPTIONAL: the sheet's normal permalink"
},
```

Save the file — the change is live on the next page load (no version bump
needed). Until a link is pasted, its tab shows these setup steps instead.

Two optional extras in the same section:

- **`extraViews`** adds more tabs, each a published *report* on the same
  sheet — perfect for a "This Week" tab (report filtered to the next 7 days)
  or a "By Audience" tab (report grouped by Audience). Uncomment an example
  line and paste the report's publish link:

  ```js
  extraViews: [
    { label: "This Week", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=..." }
  ],
  ```

- **`statusLegend`** shows a small color key above the calendar and list.
  Set the colors to match the conditional formatting you chose in Step 1 so
  viewers can read the calendar at a glance:

  ```js
  statusLegend: [
    { label: "Suggested (Auto)", color: "#f5c94e" },
    { label: "Sent", color: "#57b96b" }
  ]
  ```

**Tip — keep the list focused on what's next:** once the sheet has months of
history, point `listEmbedUrl` at a published **report** filtered to
`Send Date` is *today or later* (sorted soonest first) instead of the raw
sheet, and add a "Full History" entry under `extraViews`. Same single source
of truth — reports are just filtered lenses on the sheet.

## Step 4 — The Power Automate flow (master sheet → comms calendar)

Goal: every day, look at the **master HR sheet**, find project work that needs
a communication, and add it to the HR Comms Calendar as a **suggestion** for a
human to confirm.

> **It never erases manual entries.** The flow's only calendar action is *Add
> row* — never update or delete — and it only ever looks at its own
> `Source = Power Automate` rows (tagged with a Sync Key). Rows people add by
> hand or via the form are `Source = Manual` with no Sync Key, so the flow
> can't see them or change them. Full explanation and a self-test are in
> [comms-timeline-full-walkthrough.md](comms-timeline-full-walkthrough.md),
> Part C.

**Make the master sheet flow-friendly first (recommended).** Rather than
having the flow guess which rows are comms, add two columns to the master
sheet: a **"Needs Comms"** checkbox and a **"Comms Date"** date column that
project owners fill in. The flow then only picks up rows that are explicitly
flagged — far more reliable than inference, and owners already know which
milestones need announcing.

Flow outline (Power Automate, using the Smartsheet connector — note it is a
*premium* connector):

1. **Trigger:** Recurrence — daily, e.g. 6:00 AM.
2. **Smartsheet – List rows** on the master HR sheet.
3. **Filter array:** `Needs Comms` is checked AND `Comms Date` is not empty
   AND `Comms Date` is today or later.
4. **For each** remaining row:
   1. **Compose a Sync Key** = the master sheet row ID (plus a suffix if one
      project can generate multiple comms).
   2. **Smartsheet – List rows** on *HR Comms Calendar*, filtered to
      `Sync Key = <that value>` — if a row already exists, **skip** (this is
      what prevents duplicates on every daily run).
   3. **Smartsheet – Add row** to *HR Comms Calendar*:
      - Communication / Deliverable ← the master row's task/milestone name
      - Initiative / Project ← the master row's project name
      - Send Date ← Comms Date
      - Owner ← the master row's owner
      - Audience / Channel ← mapped from the project when obvious, otherwise
        leave blank for the human pass
      - **Status ← "Suggested (Auto)"**, **Source ← "Power Automate"**,
        Sync Key ← the composed key
5. **(Optional) notify:** post to Teams or email the comms owner: "3 new
   suggested comms were added to the HR Comms Calendar — review and approve."

The weekly human routine is then just: open the **List View** tab, filter
Status = "Suggested (Auto)", fix up Audience/Channel, and flip Status to
Draft/Approved.

> **Simpler alternative with no Power Automate:** since both sheets live in
> Smartsheet, a native Smartsheet **automation** ("When Needs Comms becomes
> checked → Copy row to HR Comms Calendar") does the core job without a
> premium connector. Power Automate is worth it when you want the daily
> sweep, Teams notifications, or smarter field mapping.

## Step 5 — Automations that make it run itself (recommended)

All of these are built in the HR Comms Calendar sheet under
**Automation → Create workflow** and take a couple of minutes each. They are
what turn the calendar from a log into a system that keeps itself on time.

1. **Draft reminder** — *When a date is reached: 3 days before Draft Due
   Date* → alert the **Owner**, condition `Status is one of: Suggested
   (Auto), Draft`. Message: "Your comm '{{Communication / Deliverable}}' is
   due for draft in 3 days."
2. **Send-date readiness check** — *2 days before Send Date* → alert
   **Owner and Approver**, condition `Status is NOT one of: Approved,
   Scheduled, Sent`. This is the "it's about to go out and isn't approved
   yet" safety net.
3. **New form submission alert** — *When rows are added*, condition
   `Source = Manual` → alert the comms calendar owner. Nothing lands on the
   calendar silently; you review form adds the same way you review the
   Power Automate suggestions.
4. **Monday digest** — most people will never open the portal weekly on
   their own, so push the week to them: create a report filtered to
   `Send Date` in the next 7 days, then use **Schedule** (in the report's
   File menu) to email it every Monday morning — or add a Power Automate
   step that posts the same list to a Teams channel. The portal stays the
   deep-dive; the digest builds the habit.

## Conflict spotting and blackout dates

The classic comms failure is two all-employee messages landing on the same
day. Two cheap safeguards:

- **Conflict flag** — add a checkbox column named `Conflict` with this
  column formula, then add conditional formatting to turn the row red when
  it is checked (the red carries into the published calendar):

  ```
  =IF(COUNTIFS([Send Date]:[Send Date], [Send Date]@row,
               Audience:Audience, Audience@row) > 1, 1, 0)
  ```

  Any two comms aimed at the same audience on the same day now light up.

- **Blackout dates** — add a `Type` dropdown column (values: Communication,
  Blackout) and drop "Blackout" rows on the calendar for payroll weeks, open
  enrollment, company holidays, and other no-send windows. Give Blackout
  rows their own conditional formatting color (e.g. gray) and add it to the
  `statusLegend`. Planners now see when *not* to schedule before they pick a
  date.

## FAQ

- **Why one sheet instead of a calendar and a separate list?** The calendar
  and list tabs are just two published views of the same rows. There is
  nothing to keep in sync, ever.
- **Who can see the tabs?** Published Smartsheet links are viewable by anyone
  with the link (read-only). The form only lets people *add* rows; editing
  still requires being shared on the sheet.
- **Changing dropdown choices later** (new channel, new audience) is a normal
  Smartsheet column edit — no portal change needed.
