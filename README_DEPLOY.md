# LinchKey PWA Contest Build

Build: 2026-07-19 / Contest PWA v1.0.1

## Upload structure

Upload these exact names to the repository root:

- index.html
- app.js
- styles.css
- config.json
- manifest.webmanifest
- sw.js
- README_DEPLOY.md
- DEPLOY_CHECKLIST.txt

Create these folders and upload their contents:

- data/modules.json
- icons/linchkey-logo.jpg
- worker/worker.js
- worker/wrangler.toml

## What works

- Installable PWA shell
- Dynamic Yes / No / Unknown reasoning
- Dynamic Why panel
- Date-controlled nodes
- Federal PKPA + Texas + Virginia curated registry
- Fifty-state growth registry
- Donation/support switch disabled in contest mode

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy free

Upload the project to GitHub Pages or Cloudflare Pages.

## Donations

Support is disabled in `config.json`. Keep it disabled for the contest.
