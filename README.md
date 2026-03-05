# meshfs.io

Official website for MeshFS, deployed on Cloudflare Workers.

## Stack

- Cloudflare Workers (module worker)
- Plain HTML/CSS rendered by Worker
- Node built-in test runner for route/SEO checks

## Local Development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

If you want to bind custom domain `meshfs.io`, set route/domain in Cloudflare dashboard or extend `wrangler.toml` with route config for your zone.

## Validation

```bash
npm run check
```

This verifies:

- JavaScript syntax checks
- Worker route tests
- Core SEO tags presence on homepage
