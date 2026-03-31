// Toggle "terug naar boven" knop op basis van scrollpositie.
const backToTopButton = document.getElementById("backToTop");

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
