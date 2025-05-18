export const CELL_SIZE = 80;

export const idx = (i: number, j: number, k: number) => j * 5 * 4 + i * 4 + k;

export const createSvgElem = <T extends keyof SVGElementTagNameMap>(
  tag: T,
): SVGElementTagNameMap[T] =>
  document.createElementNS("http://www.w3.org/2000/svg", tag);

export const createLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  strokeWidth?: number,
) => {
  const s = createSvgElem("line");
  s.setAttribute("x1", String(x1 * CELL_SIZE));
  s.setAttribute("y1", String(y1 * CELL_SIZE));
  s.setAttribute("x2", String(x2 * CELL_SIZE));
  s.setAttribute("y2", String(y2 * CELL_SIZE));
  s.setAttribute("stroke", color);
  if (strokeWidth) s.setAttribute("stroke-width", String(strokeWidth));
  return s;
};

export const createCircle = (i: number, j: number, color: string) => {
  const s = createSvgElem("circle");
  s.setAttribute("cx", String(CELL_SIZE * (i + 0.5)));
  s.setAttribute("cy", String(CELL_SIZE * (j + 0.5)));
  s.setAttribute("r", String(CELL_SIZE / 8));
  s.setAttribute("fill", color);
  return s;
};

export const createArrow = (
  cx: number,
  cy: number,
  color: string,
  deg: number,
) => {
  const s = createSvgElem("path");
  s.setAttribute("d", "M -0.5 -1 L 0 -1 L 0 0.8 L 0.7 0.8 L -0.5 2 Z");
  s.setAttribute(
    "transform",
    `translate(${CELL_SIZE * (cx + 0.5)} ${CELL_SIZE * (cy + 0.5)}) scale(${CELL_SIZE / 8}) rotate(${deg})`,
  );
  s.setAttribute("fill", color);
  s.setAttribute("stroke", "gray");
  s.setAttribute("stroke-width", "0.1");
  s.setAttribute("stroke-linejoin", "round");
  s.setAttribute("stroke-dasharray", "0.1, 0.1");
  return s;
};
