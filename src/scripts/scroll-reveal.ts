const REVEAL_SELECTOR = "[data-reveal]";
const STAGGER_SELECTOR = "[data-reveal-stagger]";

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);

const initReveal = () => {
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (el.classList.contains("is-revealed")) return;
    revealObserver.observe(el);
  });

  document.querySelectorAll(STAGGER_SELECTOR).forEach((container) => {
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      if (child.classList.contains("is-revealed")) continue;
      child.style.setProperty("--reveal-index", String(i));
      child.classList.add("reveal-item");
      revealObserver.observe(child);
    }
  });
};

initReveal();
document.addEventListener("astro:page-load", initReveal);
