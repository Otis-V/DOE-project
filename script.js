// Toggle "terug naar boven" knop op basis van scrollpositie.
const backToTopButton = document.getElementById("backToTop");
const animatedElements = document.querySelectorAll("[data-animate]");

document.body.classList.add("is-ready");

if (animatedElements.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    animatedElements.forEach((element) => revealObserver.observe(element));
  }
}

if (backToTopButton) {
  const toggleBackToTop = () => {
    if (window.scrollY > 360) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
