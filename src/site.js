const LAST_MODIFIED = "2026-03-05";

export const stylesCss = `
:root {
  --bg: #f8f9f4;
  --paper: #fcfcf7;
  --ink: #111111;
  --muted: #575757;
  --line: #141414;
  --accent: #0b5fff;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink);
  background:
    radial-gradient(circle at 20% 0%, #fefefe 0, transparent 55%),
    repeating-linear-gradient(0deg, transparent 0, transparent 23px, rgba(0, 0, 0, 0.025) 24px),
    var(--bg);
}

a {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

a:hover {
  color: var(--accent);
}

.frame {
  max-width: 920px;
  margin: 32px auto;
  border: 1px solid var(--line);
  background: var(--paper);
}

.inner {
  padding: 30px 24px;
}

.eyebrow {
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 13px;
}

h1,
h2,
p,
li,
pre,
code {
  font-size: 15px;
  font-weight: 400;
  margin: 0;
}

h1 {
  margin: 0 0 8px;
  letter-spacing: 0.01em;
}

h2 {
  margin: 24px 0 8px;
}

.lede {
  margin-bottom: 6px;
}

.muted {
  color: var(--muted);
}

.separator {
  border: 0;
  border-top: 1px solid var(--line);
  margin: 22px 0;
}

ul {
  margin: 8px 0 0;
  padding-left: 22px;
}

li {
  margin-bottom: 4px;
}

.cmd {
  margin-top: 8px;
  border: 1px solid var(--line);
  padding: 10px 12px;
  overflow-x: auto;
  background: #fbfbfb;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: 8px;
}

.links a {
  white-space: nowrap;
}

.footer {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

@media (max-width: 700px) {
  .frame {
    margin: 12px;
  }

  .inner {
    padding: 18px 14px;
  }
}
`;

export function renderHomePage(origin) {
  const canonical = `${origin}/`;
  const title = "MeshFS | Cloud Filesystem for Human-Agent Collaboration";
  const description =
    "MeshFS is a cloud filesystem for human-agent collaboration: near real-time sync, deterministic overwrite behavior, full version history, filesystem + REST access.";

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MeshFS",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    license: "https://github.com/meshfs/meshfs/blob/main/LICENSE",
    url: canonical,
    downloadUrl: "https://github.com/meshfs/meshfs",
    description
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
  <meta name="theme-color" content="#f8f9f4" />
  <meta name="author" content="MeshFS" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="MeshFS" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${origin}/og.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${origin}/og.svg" />
  <link rel="stylesheet" href="/styles.css" />
  <script type="application/ld+json">${structuredData}</script>
</head>
<body>
  <main class="frame">
    <div class="inner">
      <p class="eyebrow">meshfs.io // official website</p>
      <h1>MeshFS</h1>
      <p class="lede">Cloud filesystem for human-agent collaboration.</p>
      <p class="muted">Near real-time sync. Deterministic overwrite behavior (last-write-wins). Full history with restore. Filesystem + REST APIs.</p>

      <hr class="separator" />

      <h2>Quick Start</h2>
      <p>Deploy MeshFS control plane to Cloudflare free tier:</p>
      <pre class="cmd"><code>meshfs deploy cloudflare-workers-free-tier \\
  --token &lt;CLOUDFLARE_API_TOKEN&gt;</code></pre>
      <p class="muted">Then connect client: <code>meshfs --server https://&lt;your-worker&gt;.workers.dev sync --target ./meshfs-mirror</code></p>

      <h2>Core Capabilities</h2>
      <ul>
        <li>push updates via <code>sync/ws</code>, catch-up via <code>sync/pull</code>, snapshot stream via <code>sync/stream</code></li>
        <li>every write creates a new version; deterministic head version</li>
        <li>device code flow auth + refresh token rotation + revoke/logout</li>
        <li>tenant rate limit, quota controls, and audit events</li>
      </ul>

      <h2>Links</h2>
      <div class="links">
        <a href="https://github.com/meshfs/meshfs" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://github.com/meshfs/meshfs/blob/main/README.md" target="_blank" rel="noreferrer">README</a>
        <a href="https://github.com/meshfs/meshfs/blob/main/docs/user-guide.md" target="_blank" rel="noreferrer">User Guide</a>
        <a href="/index.md">/index.md</a>
      </div>

      <footer class="footer">
        <p>Apache-2.0. Built for engineers who value deterministic systems.</p>
      </footer>
    </div>
  </main>
</body>
</html>`;
}

export function renderRobots(origin) {
  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
}

export function renderSitemap(origin) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

export function renderIndexMarkdown(origin) {
  return `# MeshFS

Cloud filesystem for human-agent collaboration.

- Near real-time multi-device synchronization
- Deterministic overwrite behavior (last-write-wins)
- Full version history with restore
- Filesystem-style access and REST API access

## Quick Start (Cloudflare Workers Free Tier)

\`\`\`bash
meshfs deploy cloudflare-workers-free-tier --token <CLOUDFLARE_API_TOKEN>
\`\`\`

GitHub: https://github.com/meshfs/meshfs
Website: ${origin}/
`;
}

export function renderOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fcfcf7" />
      <stop offset="100%" stop-color="#f2f4ea" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)" />
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#111111" stroke-width="2" />
  <text x="90" y="180" font-family="Menlo, Monaco, Consolas, monospace" font-size="78" fill="#111111">MeshFS</text>
  <text x="90" y="245" font-family="Menlo, Monaco, Consolas, monospace" font-size="30" fill="#111111">Cloud filesystem for human-agent collaboration.</text>
  <text x="90" y="325" font-family="Menlo, Monaco, Consolas, monospace" font-size="24" fill="#313131">sync/ws   sync/pull   versioning   Cloudflare Workers</text>
  <text x="90" y="540" font-family="Menlo, Monaco, Consolas, monospace" font-size="24" fill="#313131">meshfs.io</text>
</svg>
`;
}

export function renderFaviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#f8f9f4" />
  <rect x="4" y="4" width="56" height="56" fill="none" stroke="#111111" stroke-width="3" />
  <text x="13" y="40" font-family="Menlo, Monaco, Consolas, monospace" font-size="26" fill="#111111">M</text>
</svg>
`;
}
