const categories = [
  { id: "all", label: "All work" },
  { id: "campaign", label: "Campaign systems" },
  { id: "operations", label: "Operations explainers" },
  { id: "event", label: "Event and poster work" },
  { id: "quote", label: "Quote formats" },
];

function makeProject(config) {
  return { featured: false, ...config };
}

const campaignSeries = Array.from({ length: 16 }, (_, index) =>
  makeProject({
    slug: `election-series-${String(index + 1).padStart(2, "0")}`,
    title: `Election Series ${String(index + 1).padStart(2, "0")}`,
    category: "campaign",
    categoryLabel: "Campaign system",
    collection: "Election series",
    indexLabel: `${String(index + 1).padStart(2, "0")} / 16`,
    description:
      "One piece from a larger election communication series designed to stay recognizable across repeated publication.",
    image: `assets/images/election-series-${String(index + 1).padStart(2, "0")}.png`,
    featured: index === 0,
  })
);

const topicProjects = [
  ["business-development", "Business Development"],
  ["donors-tracking", "Donors Tracking"],
  ["financial-monitoring", "Financial Monitoring"],
  ["internal-audit", "Internal Audit"],
  ["product-design", "Product Design"],
  ["suppliers-management", "Suppliers Management"],
  ["vp-fund", "VP Fund"],
].map(([slug, title]) =>
  makeProject({
    slug,
    title,
    category: "operations",
    categoryLabel: "Operations explainer",
    collection: "Operational topics",
    indexLabel: "Guide visual",
    description:
      "An icon-led explainer graphic built to make a formal topic easier to scan and easier to communicate.",
    image: `assets/images/${slug}.png`,
  })
);

const eventProjects = [
  ["cafe-talk-event", "Cafe Talk Event", "Public-facing event work", "Event visual", true],
  ["guest-poster", "Guest Poster", "Public-facing event work", "Event visual", false],
  ["poster-subject", "Poster Subject", "Public-facing event work", "Poster concept", false],
  ["tfarej-poster", "Tfarej Poster", "Public-facing event work", "Poster concept", false],
  ["youth-talk-blue", "Youth Talk Blue", "Youth Talk series", "Series variant", false],
  ["youth-talk-orange", "Youth Talk Orange", "Youth Talk series", "Series variant", false],
  ["youth-talk-main", "Youth Talk Main Poster", "Youth Talk series", "Main poster", true],
].map(([slug, title, collection, indexLabel, featured]) =>
  makeProject({
    slug,
    title,
    category: "event",
    categoryLabel: "Event poster",
    collection,
    indexLabel,
    description:
      "Poster-led communication work built around atmosphere, hierarchy, and fast public readability.",
    image: `assets/images/${slug}.png`,
    featured,
  })
);

const quoteProjects = [
  ["quote-black", "Quote Black"],
  ["quote-white-black", "Quote White Black"],
  ["quote-white-yellow", "Quote White Yellow"],
  ["quote-with-photo", "Quote With Photo"],
  ["quote-yellow", "Quote Yellow"],
].map(([slug, title]) =>
  makeProject({
    slug,
    title,
    category: "quote",
    categoryLabel: "Quote format",
    collection: "Quote series",
    indexLabel: "Format study",
    description:
      "A quote-driven social format focused on contrast, typographic framing, and message-first composition.",
    image: `assets/images/${slug}.png`,
  })
);

const imageProjects = [...campaignSeries, ...topicProjects, ...eventProjects, ...quoteProjects];

const documents = [
  ["Contract Elections", "PDF document", "A contract-format document included as part of the wider election communication work.", "contract-elections.pdf"],
  ["DC AG19", "PDF dossier", "Long-form editorial work showing multi-page pacing and document structure.", "dc-ag19-dossier.pdf"],
  ["Dossier Elections", "PDF dossier", "A substantial election-related dossier presented as part of the print portfolio.", "elections-dossier-small.pdf"],
  ["Magazine 101", "PDF magazine", "Magazine-style layout work with a stronger editorial rhythm than a single-page handout.", "magazine-101.pdf"],
  ["NDI Flyer", "PDF flyer", "A flyer-format public communication piece prepared as a printable deliverable.", "ndi-flyer-final.pdf"],
  ["NDI Notebook", "PDF booklet", "A smaller booklet-format document that extends the printed communication materials.", "ndi-notebook.pdf"],
  ["NDI Letterhead", "PDF stationery", "Brand support material for more formal document applications.", "ndi-letterhead-grey.pdf"],
].map(([title, format, description, file]) => ({
  title,
  format,
  description,
  href: `assets/documents/${file}`,
}));

const state = { activeCategory: "all" };

const filterBar = document.querySelector("#filter-bar");
const galleryGrid = document.querySelector("#gallery-grid");
const documentGrid = document.querySelector("#document-grid");
const imageCount = document.querySelector("#image-count");
const documentCount = document.querySelector("#document-count");
const collectionCount = document.querySelector("#collection-count");
const lightbox = document.querySelector("#lightbox");
const lightboxBackdrop = document.querySelector("#lightbox-backdrop");
const lightboxClose = document.querySelector("#lightbox-close");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxCategory = document.querySelector("#lightbox-category");
const lightboxDescription = document.querySelector("#lightbox-description");

function formatCount(value) {
  return value.toString().padStart(2, "0");
}

function uniqueCollectionCount() {
  return new Set(imageProjects.map((project) => project.collection)).size;
}

function filteredProjects() {
  return state.activeCategory === "all"
    ? imageProjects
    : imageProjects.filter((project) => project.category === state.activeCategory);
}

function buildFilters() {
  filterBar.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${state.activeCategory === category.id ? " is-active" : ""}`;
    button.textContent = category.label;
    button.addEventListener("click", () => {
      state.activeCategory = category.id;
      buildFilters();
      renderGallery();
    });
    filterBar.appendChild(button);
  });
}

function createGalleryCard(project) {
  const card = document.createElement("article");
  card.className = `gallery-card${project.featured ? " featured" : ""}`;
  card.innerHTML = `
    <div class="gallery-media">
      <img src="${project.image}" alt="${project.title}">
    </div>
    <div class="gallery-copy">
      <div class="gallery-meta">
        <span class="gallery-category">${project.categoryLabel}</span>
        <span class="gallery-index">${project.indexLabel}</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <button class="gallery-action" type="button">Open preview</button>
    </div>
  `;
  card.querySelector(".gallery-media").addEventListener("click", () => openLightbox(project));
  card.querySelector(".gallery-action").addEventListener("click", () => openLightbox(project));
  return card;
}

function renderGallery() {
  galleryGrid.innerHTML = "";
  filteredProjects().forEach((project) => galleryGrid.appendChild(createGalleryCard(project)));
}

function renderDocuments() {
  documentGrid.innerHTML = "";

  documents.forEach((documentItem) => {
    const card = document.createElement("article");
    card.className = "document-card";
    card.innerHTML = `
      <div class="document-swatch">
        <p class="document-kicker">${documentItem.format}</p>
        <h3>${documentItem.title}</h3>
      </div>
      <div class="document-copy">
        <h3>${documentItem.title}</h3>
        <p>${documentItem.description}</p>
        <a class="document-link" href="${documentItem.href}" target="_blank" rel="noreferrer">Open PDF</a>
      </div>
    `;
    documentGrid.appendChild(card);
  });
}

function openLightbox(project) {
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  lightboxImage.src = project.image;
  lightboxImage.alt = project.title;
  lightboxCategory.textContent = `${project.categoryLabel} / ${project.collection}`;
  lightboxTitle.textContent = project.title;
  lightboxDescription.textContent = project.description;
  lightboxClose.focus({ preventScroll: true });
}

function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

function updateStats() {
  imageCount.textContent = formatCount(imageProjects.length);
  documentCount.textContent = formatCount(documents.length);
  collectionCount.textContent = formatCount(uniqueCollectionCount());
}

lightboxBackdrop.addEventListener("click", closeLightbox);
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

updateStats();
buildFilters();
renderGallery();
renderDocuments();
