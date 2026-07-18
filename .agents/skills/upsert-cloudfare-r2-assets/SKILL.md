---
name: upsert-cloudfare-r2-assets
description: Convert numbered local image sets into AVIF, WebP, and JPEG variants and upsert them to Cloudflare R2 with correct MIME types, immutable caching, and round-trip verification. Use when asked to upload, replace, redeploy, optimize, or verify website image assets in an R2 bucket.
---

# Upsert Cloudflare R2 Assets

Use Wrangler for R2 operations and the bundled script for deterministic conversion, upload, and verification.

## Workflow

1. Load the Cloudflare and Wrangler skills before invoking Wrangler.
2. Inspect and naturally sort the source files. Confirm the intended bucket and object prefix from repository configuration or `wrangler r2 bucket list`; never use an application cache bucket for public assets.
3. Resolve the public asset domain with `wrangler r2 bucket domain list <bucket>` when URLs are needed.
4. Run `scripts/upsert-r2-images.mjs` from the repository root. The script requires the repository's `sharp` and `wrangler` packages.
5. Report the bucket, exact object keys, formats, cache policy, and verification result. State whether repository files changed.

## Command

```bash
node .agents/skills/upsert-cloudfare-r2-assets/scripts/upsert-r2-images.mjs \
  --source 'public/images/project-*.png' \
  --bucket portfolio-assets \
  --prefix work/project
```

Optional flags:

- `--webp-quality <1-100>` defaults to `82`.
- `--avif-quality <1-100>` defaults to `55`.
- `--jpg-quality <1-100>` defaults to `85`.
- `--cache-control <value>` defaults to `public,max-age=31536000,immutable`.
- `--dry-run` converts and prints planned uploads without changing R2.
- `--keep-temp` preserves generated and downloaded verification files.

## Guardrails

- Treat the bucket and prefix as required. Do not guess when multiple plausible asset buckets remain after inspection.
- Number destination files from `1` in natural source-file order.
- Flatten transparency onto white only for JPEG; retain transparency in AVIF and WebP.
- Set `image/avif`, `image/webp`, or `image/jpeg` explicitly on every upload.
- Upload to remote R2 and verify every object by downloading it and comparing bytes.
- Use a temporary directory for derivatives; do not add generated variants to the repository unless explicitly requested.
- Stop on the first failed conversion, upload, download, or comparison.
