export function isIntersecting(first: HTMLElement, second: HTMLElement) {
  const firstRect = first.getBoundingClientRect();
  const secondRect = second.getBoundingClientRect();

  return (
    firstRect.bottom > secondRect.top &&
    firstRect.right > secondRect.left &&
    firstRect.top < secondRect.bottom &&
    firstRect.left < secondRect.right
  );
}
