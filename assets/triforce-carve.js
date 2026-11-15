document.addEventListener("DOMContentLoaded", () => {
  const codexBanner = document.querySelector(".codex-motto-chiseled");
  if (!codexBanner) return;

  codexBanner.classList.add("carve-ready");

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
