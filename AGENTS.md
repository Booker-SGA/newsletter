# Repository Guidelines

## Project Structure & Module Organization
- Root contains `index.html` (single‑page newsletter), inline CSS/JS, and assets.
- Assets live in `images/<month>/...` plus top‑level images like `tornado.png`.
- PDF generation script: `generate-pdf.js` (uses Puppeteer) outputs `october-newsletter.pdf`.
- Node metadata in `package.json`; no framework or bundler; static site only.

## Build, Test, and Development Commands
- Install dependencies: `npm install`.
- Preview locally: `npm run serve` or `npm start`.
- Generate PDF: `npm run pdf` (reads `index.html`, writes `october-newsletter.pdf`).

## Coding Style & Naming Conventions
- HTML/CSS/JS: two‑space indentation; keep JS vanilla and scoped in the bottom `<script>`.
- Assets: add images under `images/<month>/` and reference with relative paths (e.g., `images/october/IMG_3956.jpg`).
- Keep filenames stable; avoid renaming existing assets unless updating references.
- Prefer small, focused edits; avoid introducing external libraries.

## Testing Guidelines
- Manual QA: load `index.html` and verify slideshow arrows, drag/touch, and responsive layout.
- PDF check: run `node generate-pdf.js`; confirm console logs and validate page height and visuals in `october-newsletter.pdf`.
- Visual diffs: attach before/after screenshots or the regenerated PDF in PRs for UI changes.

## Commit & Pull Request Guidelines
- Commits: imperative, concise messages (e.g., `Update October slideshow spacing`, `Fix mobile header height`).
- Branch names: `feat/<topic>`, `fix/<topic>`, or `chore/<topic>`.
- PRs: include context, linked issue (if any), a summary of changes, and screenshots/PDFs demonstrating results. Note any asset additions (`images/<month>/...`).

## Security & Configuration Tips
- Chromium download: `.npmrc` sets `puppeteer_skip_chromium_download=true` to prefer a system Chrome. If needed, set `PUPPETEER_EXECUTABLE_PATH` to your Chrome/Chromium binary, or remove that line to let Puppeteer download its own.
- Keep large media out of Git history when possible; optimize images before adding.

## Architecture Overview
- Static HTML page with inline styles and a lightweight carousel; Node script renders a print‑ready PDF via Puppeteer. No server or build step required.
