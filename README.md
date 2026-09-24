# Design and Video Portfolio

This repository contains a static portfolio site for Majd Ben Chobba. The current public release focuses on design and communication work drawn from campaign systems, event visuals, quote formats, and editorial PDF documents.

## What is included

- A responsive portfolio site built with plain HTML, CSS, and JavaScript
- 35 image-based portfolio pieces
- 7 downloadable PDF documents with cover previews
- Filtered gallery browsing and direct links to the artwork

## Structure

- `index.html` contains the page layout
- `styles.css` contains the visual system and responsive styling
- `app.js` contains the content model, gallery filters, and document cards
- `assets/images` contains the published image work
- `assets/documents` contains the linked PDF work

## Notes

The repository name leaves room for future video work, but the current public cut is centered on design assets and longer-form communication materials.

## PDF viewing copies

The document cards offer smaller web copies of the two largest dossiers, with
file sizes and separate links to the unchanged originals.

- Elections dossier: 34.4 MB original, 4.3 MB web copy. Illustrator editing
  payloads were removed; all 12 rendered pages remain pixel-identical.
- DC AG19: 14.4 MB original, 5.4 MB web copy. Decorative graphics are optimized
  for screen viewing while original text remains selectable.

Page counts, page sizes, and extracted text were verified against the originals.
Use the original PDFs for full print/editing detail.

## Document covers

Each PDF card shows its actual first page. The seven WebP covers total about
235 KB and load lazily. The layout keeps the whole page visible, including the
landscape flyer, and adapts from three columns to two on tablets and one on phones.
Clicking a cover opens the corresponding PDF; the separate download links remain
available below it.
