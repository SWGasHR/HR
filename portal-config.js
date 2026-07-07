/* ============================================================
   HR PROJECT PORTAL — CONTENT FILE (THE ONLY FILE YOU EDIT)

   Everything editable lives in this one file: the departments and
   leaders, their Smartsheet links, the project and archive lists,
   the FAQs, and the optional Ask Copilot URL.

   JUST SAVE — NO VERSION BUMP NEEDED. The portal fetches a fresh
   copy of this file on every page load, so your edit is live as
   soon as you save (refresh the portal to see it).

   QUICK JUMPS — use your browser's Find (Ctrl+F / Cmd+F):
     • To add a project:  search for   HOW TO ADD A PROJECT
     • To add an FAQ:     search for   HOW TO ADD AN FAQ

   IF THE PORTAL SHOWS "didn't load correctly" AFTER YOUR EDIT:
   your change has a small typo — usually a missing comma or a
   missing " quote on the line you added. Undo that one change
   (or fix the typo) and save again.

   (portal.html holds the layout and behavior; you should not need
   to touch it for everyday content changes.)
   ============================================================ */

window.HR_PORTAL_DATA = {

/* ==========================================================
   ASK COPILOT  (optional AI assistant side panel)

   Paste your Microsoft Copilot Studio "Embed" URL between the quotes
   below to turn on the Ask Copilot panel. While it is empty, nothing
   changes and the Smartsheet FAQ panel stays exactly as it is.

   HOW TO SET IT UP:
   1. In Microsoft Copilot Studio, create an agent and add your
      knowledge (a doc about your dashboards + how Smartsheet works;
      your FAQ content is a good start).
   2. Publish it, then open Channels -> Custom website / "Embed".
   3. Copy the embed URL (it looks like
      https://copilotstudio.microsoft.com/environments/.../webchat?...)
      and paste it below.
   4. Save this file — your change is live on the next page load.

   When this is set, the "Smartsheet FAQs" buttons become "Ask Copilot"
   and open the assistant instead of the FAQ list.
   ========================================================== */
  copilotEmbedUrl: "",

  /* ==========================================================
     SHARED PORTAL SETTINGS
     These stay the same across the single repository.
     ========================================================== */
  sharedSettings: {
    defaultDepartmentKey: "albert-taylor",
    siteBasePath: "/HR/",
    faviconFileName: "department.png",
    logoFileName: "images/swgas-benefits.png",
    contactEmail: "Benjamin.Bell@swgas.com",
    allHrPersonalTasksUrl: "https://workapps.smartsheet.com/app/wJm2VpWWq27w5cPQ5rc399qrFc",

    supportLinks: {
      projectCreationRequest: "https://app.smartsheet.com/b/form/019a16dd2b3d7e2d96db9a9e8c1aedc7",
      smartsheetSupport: "https://app.smartsheet.com/b/form/019a16e297d77bd2b18acb36bc27e593"

    }
  },

/* ==========================================================
   SINGLE-REPOSITORY PORTAL DIRECTORY

   Edit department- and leader-specific settings only in this object.
   The key is used in the clean portal path, for example:
     /HR/benefits/
     /HR/talent-acquisition/

   The legacy ?department=... format is still accepted and is
   automatically converted to the matching clean path.

   Top-right logo files are relative to this index.html and use the
   swgas-...png naming pattern. Leader entries may use projectGroupLabels
   to define which groups they can browse; leader groups remain collapsed
   and are never preloaded. You may place logo files in a folder by
   changing a value to something like:
     "images/swgas-benefits.png"
   ========================================================== */
  departmentPortals: {
    benefits: {
      departmentName: "Benefits",
      portalTitle: "Benefits Project Portal",
      projectGroupLabel: "Benefits",
      logoFileName: "images/swgas-benefits.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/Benefits",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=13971636efc64535bca834c5bd2b499a",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=3d336acb529a47e1bd3701ecd71b22a9",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=bbb5a5a6a2d9411990d7442a2dfec3ae",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    compensation: {
      departmentName: "Compensation",
      portalTitle: "Compensation Project Portal",
      projectGroupLabel: "Compensation",
      logoFileName: "images/swgas-compensation.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR/SitePages/Compensation.aspx",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=75aa0b5581f44af69fe272c372896f9c",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=8c3f57fa7ffb46b7bc460ea2668df035",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=02d933f0f5e74b0598633f7f16834e81",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    dei: {
      departmentName: "DE&I",
      portalTitle: "DE&I Project Portal",
      projectGroupLabel: "DE&I",
      logoFileName: "images/swgas-dei.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/dei/SitePages/VolunteerCenter.aspx",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=c5391d7667514bd9a4b78a04e9ed637a",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=3afa72eb25444f0097fe00081a918a3e",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=bbebdce23f244f19b0651962b37bfba4",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    "employee-experience": {
      departmentName: "Employee Experience",
      portalTitle: "Employee Experience Project Portal",
      projectGroupLabel: "Employee Experience",
      logoFileName: "images/swgas-ex.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/EmployeeExperience",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=c2275394becf433fa6c4dc3b80c5557a",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=ddb74b83300d40c68c638bcad2fcce27",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=9c1f35b775eb43499442dc354f942e29",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    hrbp: {
      departmentName: "HRBP",
      portalTitle: "HRBP Project Portal",
      projectGroupLabel: "HRBP",
      logoFileName: "images/swgas-hrbp.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR/SitePages/HRBP.aspx",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=a08ad990af604a578a070e2fb37bdd5c",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=1cd7570b643d48beb47669e64a62ddb7",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=60c315971bf0434f99c20e0ad7c209ae",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    hrcm: {
      departmentName: "HRCM",
      portalTitle: "HRCM Project Portal",
      projectGroupLabel: "HRCM",
      logoFileName: "images/swgas-hrcm.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/ocm",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=13f0d7daeeef42d4b67653e8ac8bc300",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=cc7e27e122784e45a742d2514ecc4eac",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=5137b71f2ab4424d97e9409c9a394de3",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    hrs: {
      departmentName: "HRS",
      portalTitle: "HRS Project Portal",
      projectGroupLabel: "HRS",
      logoFileName: "images/swgas-hrs.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR/SitePages/SWGreat!-Employee-Connect.aspx?source=SiteSettings",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=a529d49a8ed54ab6afe2dd735a8a4d83",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=3a44cbb05c4c4f73be39398e26ec1bf9",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=9ea976219c43416bb036a21079930168",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    hrss: {
      departmentName: "HRSS",
      portalTitle: "HRSS Project Portal",
      projectGroupLabel: "HRSS",
      logoFileName: "images/swgas-hrss.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR/SitePages/HRSS%20Homepage.aspx",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=e512f05eca204107b878b7a3a88a9f85",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=1d47c057552844bfa434594938e0a0af",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=1644aa961a924c839a5e664914edc414",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    "labor-relations": {
      departmentName: "Labor Relations",
      portalTitle: "Labor Relations Project Portal",
      projectGroupLabel: "Labor Relations",
      logoFileName: "images/swgas-labor-relations.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=3a865e6093644c498ddbba24d76a01d0",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=812d155b9f994ffa95c7f6277d8a0019",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=dd446e59894f4f95a4f53d3a7b899281",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    "talent-acquisition": {
      departmentName: "Talent Acquisition",
      portalTitle: "Talent Acquisition Project Portal",
      projectGroupLabel: "Talent Acquisition",
      logoFileName: "images/swgas-ta.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR/SitePages/Talent-Acquisition(1).aspx",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=11696a9614634710ac74c0a18d9c0169",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=e2e24d980f244a25b0031bf1b14a57ab",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=198aafc9244746c0be20502c9a57ad61",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    "talent-development": {
      departmentName: "Talent Development",
      portalTitle: "Talent Development Project Portal",
      projectGroupLabel: "Talent Development",
      logoFileName: "images/swgas-td.png",
      departmentSharePointUrl: "https://swgas.sharepoint.com/sites/TalentDevelopment",
      defaultViewId: "home",
      views: {
        home: {
          label: "Home",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=ec459cfed1564a51a49c2fa23518775f",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        mainInitiatives: {
          label: "(Department Name) Main Initiatives",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=89cb409e94ee40deb85390bc1674dea2",
          viewOnlyNote: false,
          refreshNote: true,
          preload: true
        },
        allDepartmentProjects: {
          label: "All (Department Name) Projects (View Only)",
          embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=38579bee1de54fbeb7823d9e29a4c6bb",
          viewOnlyNote: true,
          refreshNote: false,
          preload: true
        }
      }
    },

    "albert-taylor": {
    portalType: "leader",
    departmentName: "HR",
    portalTitle: "HR Project Portal",
    projectGroupLabels: [
      "Benefits",
      "Compensation",
      "DE&I",
      "Employee Experience",
      "HRBP",
      "HRCM",
      "HRS",
      "HRSS",
      "Labor Relations",
      "Talent Acquisition",
      "Talent Development"
    ],
    logoFileName: "images/swgas-albert-taylor.png",
    departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR",
    defaultViewId: "home",
    views: {
      home: {
        label: "Home",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=7d9f27cd03244d95b758b8093f3a90dd",
        viewOnlyNote: false,
        refreshNote: true,
        preload: true
      },
      mainInitiatives: {
        label: "All HR Projects Dashboard",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=51b6077469244ea4b04fc5ba07e52876",
        viewOnlyNote: false,
        refreshNote: true,
        preload: true
      },
      allDepartmentProjects: {
        label: "All HR Projects (View Only)",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=a8c8d9416f8a45079c62e3aefe2d73e4",
        viewOnlyNote: true,
        refreshNote: false,
        preload: true
      }
    }
  },

    "gail-carmona": {
    portalType: "leader",
    departmentName: "HR Operations",
    portalTitle: "HR Operations Project Portal",
    projectGroupLabels: [
      "HRBP",
      "HRCM",
      "HRSS",
      "Labor Relations"
    ],
    logoFileName: "images/swgas-gail-carmona.png",
    departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR",
    defaultViewId: "home",
    views: {
      home: {
        label: "Home",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=89905a5832ba4935b09e46adb96e5842",
        viewOnlyNote: false,
        refreshNote: true,
        preload: true
      },
      mainInitiatives: {
        label: "HR Operations Main Initiatives",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=e9aa2f05ffe34f69925a84b306922fc3",
        viewOnlyNote: false,
        refreshNote: true,
        preload: true
      },
      allDepartmentProjects: {
        label: "All HR Operations Projects (View Only)",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=8dfe65d12d204a36b2380172a8cc9c7b",
        viewOnlyNote: true,
        refreshNote: false,
        preload: true
      }
    }
  },

    "mike-bryant": {
    portalType: "leader",
    departmentName: "HR COMP, BEN, & HRS",
    portalTitle: "HR COMP, BEN, & HRS Project Portal",
    projectGroupLabels: [
      "Benefits",
      "Compensation",
      "HRS"
    ],
    logoFileName: "images/swgas-mike-bryant.png",
    departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR",
    defaultViewId: "home",
    views: {
      home: {
        label: "Home",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=7c519e87f82b480ab66ec680ab74068c",
        viewOnlyNote: false,
        refreshNote: true,
        preload: true
      },
      mainInitiatives: {
        label: "HR COMP, BEN, & HRS Main Initiatives",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=7c62e92983d04df4b556b375116110a7",
        viewOnlyNote: false,
        refreshNote: true,
        preload: true
      },
      allDepartmentProjects: {
        label: "All HR COMP, BEN, & HRS Projects (View Only)",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=b475dcf41ebc4fa6a330e982f1d0fdeb",
        viewOnlyNote: true,
        refreshNote: false,
        preload: true
      }
    }
  },

    "courtney-moore": {
    portalType: "leader",
    departmentName: "HR DE&I, EX, & TA",
    portalTitle: "HR DE&I, EX, & TA Project Portal",
    projectGroupLabels: [
      "DE&I",
      "Employee Experience",
      "Talent Acquisition"
    ],
    logoFileName: "images/swgas-courtney-moore.png",
    departmentSharePointUrl: "https://swgas.sharepoint.com/sites/HR",
    defaultViewId: "home",
    views: {
      home: {
        label: "Home",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=3a13a5699eeb4bc69171db1144cd3ebb",
        viewOnlyNote: false,
        refreshNote: true,
        preload: true
      },
      mainInitiatives: {
        label: "HR DE&I, EX, & TA Main Initiatives",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=efbcd2919ddf49038b9a653e124ffba8",
        viewOnlyNote: false,
        refreshNote: true,
        preload: true
      },
      allDepartmentProjects: {
        label: "All HR DE&I, EX, & TA Projects (View Only)",
        embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=bf3834f629ec49d99eb373e5d016138a",
        viewOnlyNote: true,
        refreshNote: false,
        preload: true
      }
    }
  }
  },

  /* Short names that also work in links, e.g. /HR/ta/ opens
     Talent Acquisition. Left side = alias, right side = the real
     key from departmentPortals above. */
  departmentKeyAliases: {
    ex: "employee-experience",
    employeeexperience: "employee-experience",
    "employee-experience": "employee-experience",
    cm: "hrcm",
    "hr-change-management": "hrcm",
    lr: "labor-relations",
    "labor-relations": "labor-relations",
    ta: "talent-acquisition",
    "talent-acquisition": "talent-acquisition",
    td: "talent-development",
    "talent-development": "talent-development",
    albert: "albert-taylor",
    alberttaylor: "albert-taylor",
    "albert-taylor": "albert-taylor",
    gail: "gail-carmona",
    gailcarmona: "gail-carmona",
    "gail-carmona": "gail-carmona",
    mike: "mike-bryant",
    mikebryant: "mike-bryant",
    "mike-bryant": "mike-bryant",
    courtney: "courtney-moore",
    courtneymoore: "courtney-moore",
    "courtney-moore": "courtney-moore"
  },

  /*
    Shared Smartsheet FAQ settings:
    - faqVideoFolder is relative to this index.html.
    - Questions and videos are shared across every department and leader portal.
    - Videos remain lazy-loaded until a question is expanded.

    --------------------------------------------------------
    HOW TO ADD AN FAQ
    --------------------------------------------------------
    Add a new entry to the  smartsheetFaqs: [ ... ]  list below. Copy an
    existing entry and edit it. A text-answer FAQ looks like this:

        {
          id: "how-do-i-share-a-sheet",
          question: "How do I share a sheet?",
          visible: true,
          answerHtml: "<p>Open the sheet, click <strong>Share</strong>, " +
                      "enter the person's email, then click Share again.</p>",
          video: false,
          videoFileName: "",
          repeat: false
        },

      • question   = the question text shown in the FAQ panel
      • answerHtml = the answer; basic HTML is allowed (<p>, <strong>,
                     <a href="...">, <ul><li>, etc.). Leave "" for none.
      • visible    = true to show it, false to hide it
      • video      = set true and put an .mp4 file name in videoFileName
                     to show a how-to video instead of (or with) text.

    Keep the comma after each entry's closing } except the very last one.
  */
  faqVideoFolder: "",

  smartsheetFaqs: [
    {
      id: "how-to-use-this-portal",
      question: "How do I use this portal? (Start here)",
      visible: true,
      answerHtml: "<p>This portal is your home base for HR project tracking. Use the blue bar at the top to move around:</p>" +
                  "<ul>" +
                  "<li><strong>Main Initiatives</strong> &mdash; the dashboard view: overall status, each team's progress, and total vs. remaining tasks at a glance.</li>" +
                  "<li><strong>All Projects (View Only)</strong> &mdash; browse every project's tasks in one read-only list.</li>" +
                  "<li><strong>All HR Personal Tasks</strong> &mdash; just the tasks assigned to you, which you can edit.</li>" +
                  "<li><strong>All Projects</strong> dropdown &mdash; open a specific project to view or update it.</li>" +
                  "<li><strong>Navigation</strong> dropdown &mdash; jump to another department or leader.</li>" +
                  "</ul>",
      video: false,
      videoFileName: "",
      repeat: false
    },
    {
      id: "view-differences",
      question: "What's the difference between the Dashboard, All Projects, and Personal Tasks?",
      visible: true,
      answerHtml: "<p><strong>Main Initiatives / Dashboard</strong> is for <em>seeing status</em> &mdash; the gauges and task counts roll up how everything is going.</p>" +
                  "<p><strong>All Projects (View Only)</strong> is for <em>browsing</em> every project's tasks without changing anything.</p>" +
                  "<p><strong>All HR Personal Tasks</strong> is for <em>doing your work</em> &mdash; it shows only the tasks assigned to you and lets you update them.</p>" +
                  "<p>To change a whole project, open it from the <strong>All Projects</strong> dropdown.</p>",
      video: false,
      videoFileName: "",
      repeat: false
    },
    {
      id: "update-a-project",
      question: "How do I update or edit a project?",
      visible: true,
      answerHtml: "<p>Open the project from the <strong>All Projects</strong> dropdown at the top, then edit it like a normal Smartsheet grid.</p>" +
                  "<p><strong>Important:</strong> Smartsheet does not auto-save. Click the <strong>Save</strong> icon at the top-left of the sheet before you leave the page, or your changes can be lost.</p>",
      video: false,
      videoFileName: "",
      repeat: false
    },
    {
      id: "request-access",
      question: "How do I get access to edit a project?",
      visible: true,
      answerHtml: "<p>If a project opens as read-only, use the <strong>Request Access</strong> button (top-right) to email the portal owner for editing access.</p>",
      video: false,
      videoFileName: "",
      repeat: false
    },
    {
      id: "full-screen-help",
      question: "How do I make a dashboard or sheet bigger?",
      visible: true,
      answerHtml: "<p>Click the <strong>full-screen</strong> button (the expand icon next to the logo, top-right) to make the current dashboard or project sheet fill the whole screen &mdash; handy for wide project sheets and for status meetings. Press <strong>Esc</strong> or the <strong>Exit full screen</strong> button to come back.</p>",
      video: false,
      videoFileName: "",
      repeat: false
    },
    {
      id: "row-section-topic-task",
      question: "How do I make a row into a Section, Topic, and Task?",
      visible: true,
      answerHtml: "",
      video: false,
      videoFileName: "row-section-topic-task.mp4",
      repeat: false
    },
    {
      id: "add-row",
      question: "How do I add a row?",
      visible: true,
      answerHtml: "",
      video: false,
      videoFileName: "add-row.mp4",
      repeat: false
    },
    {
      id: "delete-row",
      question: "How do I delete a row?",
      visible: true,
      answerHtml: "",
      video: false,
      videoFileName: "delete-row.mp4",
      repeat: false
    },
    {
      id: "people-column-notifications",
      question: "What are the notifications that get sent out as I add users to the People and Individual Contributor Columns?",
      visible: true,
      answerHtml: "",
      video: false,
      videoFileName: "people-column-notifications.mp4",
      repeat: false
    },
    {
      id: "use-filters",
      question: "How do I use filters?",
      visible: true,
      answerHtml: "",
      video: false,
      videoFileName: "use-filters.mp4",
      repeat: false
    },
    {
      id: "use-copilot-project-plan",
      question: "How do I use Copilot to help make my project plan?",
      visible: true,
      answerHtml: "",
      video: false,
      videoFileName: "use-copilot-project-plan.mp4",
      repeat: false
    }
  ],

  /* ========================================================
     SHARED PROJECT DIRECTORY

     ACTIVE-PORTAL BEHAVIOR:
     Department portals automatically open and preload their assigned group.
     HR leader portals keep every group collapsed and load projects on click.
     Do not manually switch these values for each portal.

     --------------------------------------------------------
     HOW TO ADD A PROJECT  (you only edit this one list)
     --------------------------------------------------------
     1. Find the group you want below by its  label:  — the groups are:
          Benefits, Compensation, DE&I, Employee Experience, HRBP,
          HRCM, HRS, HRSS, Labor Relations, Talent Acquisition,
          Talent Development.
     2. Inside that group's  projects: [ ... ]  list, either:
          (a) fill in one of the ready-made "Project Template" lines —
              change its label, paste your link into embedSrc, and set
              visible: true ; OR
          (b) copy an existing line and edit it.
     3. A project line looks like this (keep the commas and braces):

          { id: "open-enrollment-2027", label: "Open Enrollment 2027", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=PASTE_YOURS", visible: true },

        • id      = any short unique name, lowercase-with-dashes
        • label   = the text shown in the menu
        • embedSrc = the Smartsheet "Publish" link
        • visible = true to show it, false to hide it
     4. To put a project under "Archive" instead, add it to that group's
        archiveProjects: [ ... ]  list the same way.

     TIP: every item in a list except the last ends with a comma. If the
     portal ever looks blank after an edit, a missing comma or a missing
     " quote is the usual cause — undo your last change and try again.
     ======================================================== */
  projectGroups: [
{
      label: "Benefits",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-benefits", label: "Short-Term Projects (Benefits)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=d575dd0772a144f3b5e57aa51803d403", visible: true },
        { id: "open enrollment 2026", label: "Open Enrollment 2026", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=379a936b6187472faf634ba8aaf80c8b", visible: true },
        { id: "benefits-project-template-1", label: "Project Template 1", embedSrc: "INSERT_BENEFITS_PROJECT_TEMPLATE_1_EMBED_LINK_HERE", visible: false },
        { id: "benefits-project-template-2", label: "Project Template 2", embedSrc: "INSERT_BENEFITS_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "benefits-project-template-3", label: "Project Template 3", embedSrc: "INSERT_BENEFITS_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "benefits-project-template-4", label: "Project Template 4", embedSrc: "INSERT_BENEFITS_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-benefits", label: "Short-Term Projects Archive (Benefits)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=3ec3a7381d124c7193552e291d0ac87c", visible: true },
        { id: "open enrollment 2025", label: "Open Enrollment 2025", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=e606315264984f84bd6e288a6871ec5a", visible: true },
        { id: "benefits-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_BENEFITS_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: false},
        { id: "benefits-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_BENEFITS_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "benefits-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_BENEFITS_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "benefits-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_BENEFITS_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "Compensation",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-compensation", label: "Short-Term Projects (Compensation)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=2e0fb8962bb6449cad85da6fd92c626a", visible: true },
        { id: "promotion-timeline-changes", label: "Promotion Timeline Changes", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=4b61b07051704901992629b165e5ae4a", visible: true },
        { id: "compensation-project-template-2", label: "Project Template 2", embedSrc: "INSERT_COMPENSATION_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "compensation-project-template-3", label: "Project Template 3", embedSrc: "INSERT_COMPENSATION_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "compensation-project-template-4", label: "Project Template 4", embedSrc: "INSERT_COMPENSATION_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-compensation", label: "Short-Term Projects Archive (Compensation)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=a804efa9592b4ea29d31132482d42927", visible: true },
        { id: "compensation-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_COMPENSATION_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "compensation-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_COMPENSATION_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "compensation-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_COMPENSATION_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "compensation-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_COMPENSATION_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "DE&I",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-dei", label: "Short-Term Projects (DE&I)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=ab57594639f5477b8cf810217530e5e9", visible: true },
        { id: "dei-project-template-1", label: "Project Template 1", embedSrc: "INSERT_DEI_PROJECT_TEMPLATE_1_EMBED_LINK_HERE", visible: false },
        { id: "dei-project-template-2", label: "Project Template 2", embedSrc: "INSERT_DEI_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "dei-project-template-3", label: "Project Template 3", embedSrc: "INSERT_DEI_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "dei-project-template-4", label: "Project Template 4", embedSrc: "INSERT_DEI_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-dei", label: "Short-Term Projects Archive (DE&I)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=9422817be80f471fa4f6487b5ce6dc50", visible: true },
        { id: "dei-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_DEI_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "dei-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_DEI_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "dei-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_DEI_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "dei-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_DEI_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "Employee Experience",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-ex", label: "Short-Term Projects (EX)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=5c7efc0357a5471f8559cde63936a16f", visible: true },
        { id: "employee-experience-project-template-5", label: "Project Template 5", embedSrc: "INSERT_EMPLOYEE_EXPERIENCE_PROJECT_TEMPLATE_5_EMBED_LINK_HERE", visible: false },
        { id: "employee-experience-project-template-1", label: "Project Template 1", embedSrc: "INSERT_EMPLOYEE_EXPERIENCE_PROJECT_TEMPLATE_1_EMBED_LINK_HERE", visible: false },
        { id: "employee-experience-project-template-2", label: "Project Template 2", embedSrc: "INSERT_EMPLOYEE_EXPERIENCE_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "employee-experience-project-template-3", label: "Project Template 3", embedSrc: "INSERT_EMPLOYEE_EXPERIENCE_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "employee-experience-project-template-4", label: "Project Template 4", embedSrc: "INSERT_EMPLOYEE_EXPERIENCE_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-ex", label: "Short-Term Projects Archive (EX)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=adce2600c0bb4b168a6fc1d2b53d1c22", visible: true },
        { id: "tyctwd-2026", label: "TYCTWD (2026)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=d47cd6a5a19f4c5f92e94a813dcc3be0", visible: true },
        { id: "employee-experience-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_EMPLOYEE_EXPERIENCE_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "employee-experience-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_EMPLOYEE_EXPERIENCE_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "employee-experience-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_EMPLOYEE_EXPERIENCE_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "HRBP",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-hrbp", label: "Short-Term Projects (HRBP)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=9fa3c4a5dcc24a1da11ece562921c7c5", visible: true },
        { id: "form-185.2-project-plan", label: "Form 185.2 Project Plan", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=9185a65e98384b469d5f88cc765c3b55", visible: true },
        { id: "hrbp-project-template-2", label: "Project Template 2", embedSrc: "INSERT_HRBP_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "hrbp-project-template-3", label: "Project Template 3", embedSrc: "INSERT_HRBP_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "hrbp-project-template-4", label: "Project Template 4", embedSrc: "INSERT_HRBP_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-hrbp", label: "Short-Term Projects Archive (HRBP)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=44ebd292781c46d0879ef1174f657e75", visible: true },
        { id: "hrbp-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_HRBP_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "hrbp-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_HRBP_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "hrbp-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_HRBP_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "hrbp-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_HRBP_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "HRCM",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-hrcm", label: "Short-Term Projects (HRCM)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=b57a2524e6144de2a06b6fd3eb60faa7", visible: true },
        { id: "evp-rollout-plan", label: "EVP Rollout Plan", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=de1146e552624a2dbc19ab8821465d03", visible: true },
        { id: "hr-change-management-project-template-1", label: "Project Template 1", embedSrc: "INSERT_HR_CHANGE_MANAGEMENT_PROJECT_TEMPLATE_1_EMBED_LINK_HERE", visible: false },
        { id: "hr-change-management-project-template-2", label: "Project Template 2", embedSrc: "INSERT_HR_CHANGE_MANAGEMENT_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "hr-change-management-project-template-3", label: "Project Template 3", embedSrc: "INSERT_HR_CHANGE_MANAGEMENT_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "hr-change-management-project-template-4", label: "Project Template 4", embedSrc: "INSERT_HR_CHANGE_MANAGEMENT_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-hrcm", label: "Short-Term Projects Archive (HRCM)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=b0dde73313f04cbcbb1c91a2a97fecde", visible: false },
        { id: "hr-change-management-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_HR_CHANGE_MANAGEMENT_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: true },
        { id: "hr-change-management-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_HR_CHANGE_MANAGEMENT_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "hr-change-management-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_HR_CHANGE_MANAGEMENT_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "hr-change-management-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_HR_CHANGE_MANAGEMENT_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "HRS",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-hrs", label: "Short-Term Projects (HRS)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=54bbc1becb764181b981021e4f5bcc99", visible: true },
        { id: "hrs-project-template-1", label: "Project Template 1", embedSrc: "INSERT_HRS_PROJECT_TEMPLATE_1_EMBED_LINK_HERE", visible: false },
        { id: "hrs-project-template-2", label: "Project Template 2", embedSrc: "INSERT_HRS_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "hrs-project-template-3", label: "Project Template 3", embedSrc: "INSERT_HRS_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "hrs-project-template-4", label: "Project Template 4", embedSrc: "INSERT_HRS_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-hrs", label: "Short-Term Projects Archive (HRS)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=5211c76e0916469996bc22aefe4870b6", visible: true },
        { id: "hrs-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_HRS_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "hrs-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_HRS_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "hrs-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_HRS_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "hrs-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_HRS_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "HRSS",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-hrss", label: "Short-Term Projects (HRSS)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=c10a615ed1464de49c96d275592e908d", visible: true },
        { id: "hrsss-specialists-training-plan-kayle", label: "HRSS Specialists Training Plan Kayle", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=989958f443b1469ebc356286b32263dc", visible: true },
        { id: "hrss-specialists-training-plan-lori", label: "HRSS Specialists Training Plan Lori", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=1c4f79dfca7f469e9c6f73b9595dfede", visible: true },
        { id: "ta-hrss-systems", label: "TA / HRSS Systems", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=333559a0c5a547b7b54b316ad6c79150", visible: true },
        { id: "hrss-project-template-2", label: "Project Template 2", embedSrc: "INSERT_HRSS_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "hrss-project-template-3", label: "Project Template 3", embedSrc: "INSERT_HRSS_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "hrss-project-template-4", label: "Project Template 4", embedSrc: "INSERT_HRSS_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-hrss", label: "Short-Term Projects Archive (HRSS)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=0fd987cb93b84f2aa57223f4f0643c49", visible: true },
        { id: "hrss-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_HRSS_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "hrss-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_HRSS_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "hrss-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_HRSS_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "hrss-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_HRSS_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "Labor Relations",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-labor-relations", label: "Short-Term Projects (LR)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=3b119c94e2a54f4585a838bf6e4bce00", visible: true },
        { id: "readiness", label: "Readiness", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=cd4faaab81c04c92b07b3f46adf80d68", visible: true },
        { id: "summer-intern-projects", label: "Summer Intern Projects", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=be3638b35df84dcea0ee453384cb00e1", visible: true },
        { id: "labor-relations-project-template-2", label: "Project Template 2", embedSrc: "INSERT_LABOR_RELATIONS_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "labor-relations-project-template-3", label: "Project Template 3", embedSrc: "INSERT_LABOR_RELATIONS_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "labor-relations-project-template-4", label: "Project Template 4", embedSrc: "INSERT_LABOR_RELATIONS_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-lr", label: "Short-Term Projects Archive (LR)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=09cea3f0fcac432fa19f46ba5a8405d5", visible: false },
        { id: "labor-relations-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_LABOR_RELATIONS_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: true },
        { id: "labor-relations-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_LABOR_RELATIONS_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "labor-relations-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_LABOR_RELATIONS_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "labor-relations-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_LABOR_RELATIONS_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "Talent Acquisition",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-talent-acquisition", label: "Short-Term Projects (TA)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=6971c2f6cbd64b4390af95b58670c485", visible: true },
        { id: "candidate-assessment-process", label: "Candidate Assessment Process", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=b92ed59874604dea8f2b0215a258d528", visible: true },
        { id: "talent-acquisition-project-template-1", label: "Project Template 1", embedSrc: "INSERT_TALENT_ACQUISITION_PROJECT_TEMPLATE_1_EMBED_LINK_HERE", visible: false },
        { id: "talent-acquisition-project-template-2", label: "Project Template 2", embedSrc: "INSERT_TALENT_ACQUISITION_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "talent-acquisition-project-template-3", label: "Project Template 3", embedSrc: "INSERT_TALENT_ACQUISITION_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "talent-acquisition-project-template-4", label: "Project Template 4", embedSrc: "INSERT_TALENT_ACQUISITION_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-ta", label: "Short-Term Projects Archive (TA)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=c115e046a7844c8085446316d193d9c7", visible: true },
        { id: "talent-acquisition-archive-template-2", label: "Project Template 2", embedSrc: "INSERT_TALENT_ACQUISITION_ARCHIVE_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "talent-acquisition-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_TALENT_ACQUISITION_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "talent-acquisition-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_TALENT_ACQUISITION_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "talent-acquisition-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_TALENT_ACQUISITION_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    },
{
      label: "Talent Development",
      openByDefault: false,
      embed: true,
      preload: false,
      projects: [
        { id: "short-term-projects-talent-development", label: "Short-Term Projects (TD)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=00df3436d89e46f8be081df151c0b3a5", visible: true },
        { id: "competency-configuration-rollout-plan", label: "Competency Configuration / Rollout Plans", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=a32b2110d3d5400dac1760825bfa6281", visible: true },
        { id: "succession-planning-and-development-plans", label: "Succession Planning & Development Plans", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=b28d26edde0145d9ab91518a807c04fc", visible: true },
        { id: "talent-development-project-template-1", label: "Project Template 1", embedSrc: "INSERT_TALENT_DEVELOPMENT_PROJECT_TEMPLATE_1_EMBED_LINK_HERE", visible: false },
        { id: "talent-development-project-template-2", label: "Project Template 2", embedSrc: "INSERT_TALENT_DEVELOPMENT_PROJECT_TEMPLATE_2_EMBED_LINK_HERE", visible: false },
        { id: "talent-development-project-template-3", label: "Project Template 3", embedSrc: "INSERT_TALENT_DEVELOPMENT_PROJECT_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "talent-development-project-template-4", label: "Project Template 4", embedSrc: "INSERT_TALENT_DEVELOPMENT_PROJECT_TEMPLATE_4_EMBED_LINK_HERE", visible: false }
      ],
      archiveProjects: [
        { id: "short-term-projects-archive-td", label: "Short-Term Projects Archive (TD)", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=48fe80fa373a4a5db96360740e15832e", visible: true },
        { id: "elo transition plan", label: "ELO Transition Plan", embedSrc: "https://app.smartsheet.com/b/publish?EQBCT=46376cb1ff6e47bf9b7ed1e62019ecd7", visible: true },
        { id: "talent-development-archive-template-3", label: "Project Template 3", embedSrc: "INSERT_TALENT_DEVELOPMENT_ARCHIVE_TEMPLATE_3_EMBED_LINK_HERE", visible: false },
        { id: "talent-development-archive-template-4", label: "Project Template 4", embedSrc: "INSERT_TALENT_DEVELOPMENT_ARCHIVE_TEMPLATE_4_EMBED_LINK_HERE", visible: false },
        { id: "talent-development-archive-template-5", label: "Project Template 5", embedSrc: "INSERT_TALENT_DEVELOPMENT_ARCHIVE_TEMPLATE_5_EMBED_LINK_HERE", visible: false }
      ]
    }
  ]
};
