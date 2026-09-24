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

## Responsive gallery images

The gallery uses 480, 960, and 1600 px WebP browsing copies selected by the browser
for each card's size. Images load lazily, and the existing media frames reserve
their layout space. The original PNG files remain the artwork download links and
the fallback for browsers without WebP support.

The full 960 px set is 1.24 MB versus 6.24 MB for the original PNG set, an 80%
reduction. A page loads the selected variants as needed, not all three sizes.

To regenerate browsing copies from the originals with Python and Pillow:

```bash
python -m pip install Pillow
python scripts/build_gallery_images.py
```

The builder preserves original files, color profiles, and transparency. The
configured variants require source images at least 1600 px wide.
