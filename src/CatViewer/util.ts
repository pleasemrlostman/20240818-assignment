export function calculatePosition(action: "open" | "close") {
  return function calculate(el: HTMLDivElement, transitionMs: number = 0) {
    const { innerWidth, innerHeight } = window;
    const { height, width, top, left } = el.getBoundingClientRect();
    const scaleBy = innerWidth < innerHeight ? "width" : "height";
    const scale =
      scaleBy === "width" ? innerWidth / width : innerHeight / height;

    // Calculations for translation
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const translateX =
      (innerWidth / 2 - scaledWidth / 2 - (left - (scaledWidth - width) / 2)) /
      scale;
    const translateY =
      scaleBy === "width"
        ? (innerHeight / 2 - scaledHeight / 2 - top) / scale
        : -top / scale;

    // Apply styles based on action
    const styles = {
      opacity: action === "close" ? "1" : "1",
      transform:
        action === "open"
          ? `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0px)`
          : "scale(1) translate3d(0px, 0px, 0px)",
      transition:
        action === "open"
          ? `transform ${transitionMs}ms ease, opacity 0ms`
          : `transform ${transitionMs}ms ease, opacity 0ms ease ${transitionMs}ms, z-index 0ms ease ${transitionMs}ms`,
      zIndex: action === "open" ? "9" : "0",
      pointerEvents: action === "open" ? "initial" : "none",
      touchAction: action === "open" ? "initial" : "none",
      transformOrigin: "50% 0",
    };

    Object.assign(el.style, styles);
  };
}
