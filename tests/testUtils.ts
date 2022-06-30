export const isElementOnScreen = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  if ([rect.top, rect.left].some((v) => v < 0)) return false;

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const isVisible = rect.right <= vw && rect.bottom <= vh;

  return isVisible;
};
