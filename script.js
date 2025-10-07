// ---------------- LIGHTBOX ----------------
function openLightbox(imgElement) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightbox.style.display = "block";
  lightboxImg.src = imgElement.src;
}
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// ---------------- PRINT / PDF EXPORT ----------------
function downloadPortfolio() {
  generateTOC(true);
  alert("Select 'Save as PDF' in your print dialog to export the portfolio.");
  window.print();
}

// ---------------- ADVANCED CLICKABLE TABLE OF CONTENTS ----------------
function generateTOC(estimatePages = false) {
  const tocList = document.getElementById("toc-list");
  tocList.innerHTML = "";

  const sections = Array.from(document.querySelectorAll("section[id]"));
  const paperHeightPx = 1123; // ~A4 printable height at 96dpi
  let currentPage = 3;        // 1 = cover, 2 = TOC, first content ≈ page 3

  sections.forEach((sec, i) => {
    const title = sec.querySelector("h2")?.textContent || `Section ${i + 1}`;
    const pagesUsed = Math.ceil(sec.offsetHeight / paperHeightPx);
    const pageNum = estimatePages ? currentPage : i + 3;
    currentPage += pagesUsed;

    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${sec.id}`;
    link.textContent = `${title} ............................ ${pageNum}`;
    li.appendChild(link);
    tocList.appendChild(li);
  });
}