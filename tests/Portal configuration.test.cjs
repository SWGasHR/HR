const assert = require('node:assert/strict');
const { readFileSync, statSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { runInNewContext } = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = { window: {} };
runInNewContext(readFileSync(path.join(root, 'portal-config.js'), 'utf8'), context);
const { departmentKeyAliases, departmentPortals, projectGroups, sharedSettings, smartsheetFaqs } =
  context.window.HR_PORTAL_DATA;

function assertAsset(fileName, label) {
  assert.ok(fileName, `${label} needs an asset filename`);
  const asset = statSync(path.join(root, fileName), { throwIfNoEntry: false });
  assert.ok(asset?.isFile(), `${label} points to a missing file: ${fileName}`);
}

function assertWebLink(value, label) {
  assert.ok(URL.canParse(value) && /^https?:\/\//i.test(value) && !/INSERT_|_HERE/.test(value),
    `${label} needs a configured web address`);
}

test('portal logos and the shared favicon exist', () => {
  assertAsset(sharedSettings.faviconFileName, 'Shared favicon');
  assertAsset(sharedSettings.logoFileName, 'Shared logo');
  for (const [key, portal] of Object.entries(departmentPortals)) {
    assertAsset(portal.logoFileName, `${key} logo`);
  }
});

test('department routes, group assignments, and published views resolve', () => {
  assert.ok(Object.hasOwn(departmentPortals, sharedSettings.defaultDepartmentKey), 'Unknown default department');
  for (const [alias, key] of Object.entries(departmentKeyAliases)) {
    assert.ok(Object.hasOwn(departmentPortals, key), `Alias "${alias}" points to unknown department "${key}"`);
  }
  for (const [key, portal] of Object.entries(departmentPortals)) {
    const labels = [...(portal.projectGroupLabels || [])];
    if (portal.projectGroupLabel) labels.push(portal.projectGroupLabel);
    assert.ok(labels.length, `${key} needs a project group assignment`);
    for (const label of labels) {
      assert.equal(projectGroups.filter(group => group.label.trim() === label.trim()).length, 1,
        `${key} must reference exactly one group named "${label}"`);
    }
    for (const id of ['home', 'mainInitiatives', 'allDepartmentProjects', portal.defaultViewId || 'home']) {
      assert.ok(Object.hasOwn(portal.views, id), `${key} is missing view "${id}"`);
    }
    for (const [id, view] of Object.entries(portal.views)) {
      const source = view.sourceViewId ? portal.views[view.sourceViewId] : view;
      assertWebLink(source?.embedSrc, `${key} view "${id}"`);
    }
  }
});

test('project IDs are unique across active entries, sections, archives, and draft templates', () => {
  const locations = new Map();
  for (const group of projectGroups) {
    const lists = [
      ['active', group.projects || []],
      ...(group.sections || []).map(section => [section.label, section.projects || []]),
      ['archive', group.archiveProjects || []]
    ];
    for (const [section, projects] of lists) {
      for (const project of projects) {
        const location = `${group.label} / ${section} / ${project.label}`;
        assert.ok(typeof project.id === 'string' && project.id.trim(), `${location} needs a project ID`);
        assert.ok(!locations.has(project.id), `Duplicate ID "${project.id}" in ${location} and ${locations.get(project.id)}`);
        locations.set(project.id, location);
        if (project.visible) assertWebLink(project.linkSrc || project.embedSrc, location);
      }
    }
  }
});

test('each published FAQ has an answer or a configured video', () => {
  for (const faq of smartsheetFaqs.filter(item => item.visible)) {
    const answer = (faq.answerHtml || '').replace(/<[^>]*>/g, '').trim();
    const video = faq.video === true && faq.videoFileName?.trim();
    assert.ok(answer || video, `FAQ "${faq.id}" needs an answer or video before it is published`);
  }
});
