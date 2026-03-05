import assert from "node:assert/strict";
import test from "node:test";

import worker from "../src/worker.js";

test("GET / returns SEO-ready HTML", async () => {
  const request = new Request("https://meshfs.io/");
  const response = await worker.fetch(request);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8");
  assert.match(html, /<title>MeshFS \| Cloud Filesystem for Human-Agent Collaboration<\/title>/);
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /<script type="application\/ld\+json">/);
});

test("www.meshfs.io redirects to meshfs.io with path and query", async () => {
  const request = new Request("https://www.meshfs.io/docs?a=1&b=2");
  const response = await worker.fetch(request);

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://meshfs.io/docs?a=1&b=2");
});

test("HEAD / has no body", async () => {
  const request = new Request("https://meshfs.io/", { method: "HEAD" });
  const response = await worker.fetch(request);
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.equal(body, "");
});

test("robots.txt references sitemap", async () => {
  const request = new Request("https://meshfs.io/robots.txt");
  const response = await worker.fetch(request);
  const text = await response.text();

  assert.equal(response.status, 200);
  assert.match(text, /Sitemap: https:\/\/meshfs.io\/sitemap.xml/);
});

test("sitemap.xml includes root URL", async () => {
  const request = new Request("https://meshfs.io/sitemap.xml");
  const response = await worker.fetch(request);
  const text = await response.text();

  assert.equal(response.status, 200);
  assert.match(text, /<loc>https:\/\/meshfs.io\/<\/loc>/);
});

test("unknown route returns 404", async () => {
  const request = new Request("https://meshfs.io/nope");
  const response = await worker.fetch(request);
  const text = await response.text();

  assert.equal(response.status, 404);
  assert.equal(text, "Not Found");
});
