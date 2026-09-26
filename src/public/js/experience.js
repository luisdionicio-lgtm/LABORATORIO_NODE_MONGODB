const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--rx", ((0.5 - y) * 10) + "deg");
      card.style.setProperty("--ry", ((x - 0.5) * 12) + "deg");
      card.style.setProperty("--mx", (x * 100) + "%");
      card.style.setProperty("--my", (y * 100) + "%");
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
  document.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", event.clientX + "px");
    document.documentElement.style.setProperty("--pointer-y", event.clientY + "px");
  });
}
document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.setProperty("--reveal-delay", Math.min(index * 70, 350) + "ms");
});
