# HR Project Portal

The [HR Project Portal](https://swgashr.github.io/HR/) brings department project views, Smartsheet resources, and the HR Comms Timeline together.

## Making an update

| To change | Edit |
| --- | --- |
| Department links, projects, FAQs, and timeline sources | `portal-config.js` |
| Portal layout, navigation, and guided tour | `portal.html` |
| Communications calendar, list, and form tabs | `comms-timeline.html` |
| How the portal opens from the homepage or a department bookmark | `index.html` and `404.html` together |

The homepage and department bookmarks check for the latest shell and configuration each time they open. Existing links continue to work after deployment.

Run `node --test` from the repository root using Node.js 20 or later. The checks use local files and cover the Pages entry points, department assets, project links, and published FAQ content. Test an affected Smartsheet view or form with an account from its intended audience before rollout.

For timeline setup and audience settings, see the [Comms Timeline setup guide](docs/comms-timeline-setup.md).
