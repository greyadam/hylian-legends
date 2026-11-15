document.addEventListener("DOMContentLoaded", () => {
  const codexBanner = document.querySelector(".codex-motto-chiseled");
  if (!codexBanner) return;

  codexBanner.classList.add("carve-ready");

  const svg = codexBanner.querySelector("svg");
  const textGroup = codexBanner.querySelector(".chisel-text");

  if (svg && textGroup && !codexBanner.querySelector(".codex-triforce-side")) {
    const triforceSide = document.createElement("div");
    triforceSide.className = "codex-triforce-side";

    const textSide = document.createElement("div");
    textSide.className = "codex-text-side";

    codexBanner.insertBefore(triforceSide, svg);
    triforceSide.appendChild(svg);

    textSide.appendChild(textGroup);
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
