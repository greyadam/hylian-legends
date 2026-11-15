document.addEventListener("DOMContentLoaded", () => {
  const codexBanner = document.querySelector(".codex-motto-chiseled");
  if (!codexBanner) return;

  codexBanner.classList.add("carve-ready");

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
