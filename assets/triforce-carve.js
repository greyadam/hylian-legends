document.addEventListener("DOMContentLoaded", () => {
  const codexBanner = document.querySelector(".codex-motto-chiseled");
  if (!codexBanner) return;

  codexBanner.classList.add("carve-ready");

  const originalSvg = codexBanner.querySelector("svg");
  const textGroup = codexBanner.querySelector(".chisel-text");

  if (originalSvg && textGroup && !codexBanner.querySelector(".codex-triforce-side")) {
    const triforceSide = document.createElement("div");
    triforceSide.className = "codex-triforce-side";

    const textSide = document.createElement("div");
    textSide.className = "codex-text-side";

    const textSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    textSvg.setAttribute("viewBox", "0 0 400 170");
    textSvg.setAttribute("aria-hidden", "true");

    codexBanner.insertBefore(triforceSide, originalSvg);
    triforceSide.appendChild(originalSvg);

    textSvg.appendChild(textGroup);
    textSide.appendChild(textSvg);
    codexBanner.appendChild(textSide);
  }

  codexBanner.querySelector(".text-courage")?.classList.add("chisel-courage");
  codexBanner.querySelector(".text-wisdom")?.classList.add("chisel-wisdom");
  codexBanner.querySelector(".text-power")?.classList.add("chisel-power");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        codexBanner.classList.add("is-carving");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(codexBanner);
});
