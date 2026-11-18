const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const read = name => readFileSync(path.join(__dirname, "..", name), "utf8");
const index = read("index.html");
const shell = read("portal.html");
const loader = index.match(/<script>([\s\S]*?)<\/script>/)[1];

// Run the real entry script with local fixtures. No request leaves this process.
async function visit({ page = "/HR/", html = shell, config = "window.HR_PORTAL_DATA = {};" } = {}) {
  const requests = [];
  const errorPanel = { style: {} };
  const location = new URL(page, "https://example.test");
  const result = { requests, markup: null, destination: null };
  location.replace = target => { result.destination = target; };
  const window = { location };
  const document = {
    open() {},
    write(markup) { result.markup = markup; },
    close() {},
    getElementById(id) { return id === "portalError" ? errorPanel : null; },
  };
  const files = { "/HR/portal.html": html, "/HR/portal-config.js": config };
  async function fetch(url, options) {
    requests.push([url, options?.cache]);
    const body = files[url];
    return new Response(body, { status: body == null ? 404 : 200 });
  }

  await vm.runInNewContext(loader, { window, document, fetch, console: { error() {} } });
  return { ...result, window, errorVisible: errorPanel.style.display === "grid" };
}

test("both GitHub Pages entry points use the same loader", () => {
  assert.equal(read("404.html"), index);
});

test("a department deep link checks both deployed files and renders the shell", async () => {
  const loaded = await visit({ page: "/HR/benefits/#home" });
  assert.deepEqual(loaded.requests, [
    ["/HR/portal.html", "no-cache"],
    ["/HR/portal-config.js", "no-cache"],
  ]);
  assert.ok(loaded.window.HR_PORTAL_DATA);
  assert.equal(loaded.markup, shell);
  assert.equal(loaded.errorVisible, false);
});

test("a clean timeline link retains its query and tab without loading the portal", async () => {
  const loaded = await visit({ page: "/HR/comms-timeline/?source=menu#list" });
  assert.equal(loaded.destination, "/HR/comms-timeline.html?source=menu#list");
  assert.equal(loaded.requests.length, 0);
});

test("an HTML fallback returned for the shell shows recovery instead of loading itself", async () => {
  const loaded = await visit({ html: index });
  assert.equal(loaded.errorVisible, true);
  assert.equal(loaded.markup, null);
});

test("a broken configuration reaches the shell's recovery path", async () => {
  for (const config of [null, "window.HR_PORTAL_DATA = {"]) {
    const loaded = await visit({ config });
    assert.ok(loaded.window.__hrPortalConfigError);
    assert.equal(loaded.markup, shell);
  }
});
