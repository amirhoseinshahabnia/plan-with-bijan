export function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: getScrollBehavior() });
}

export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({ behavior: getScrollBehavior() });
}
