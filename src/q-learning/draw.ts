import { getColor } from "./color";

const CELL_SIZE = 80;

const idx = (i: number, j: number, k: number) => j * 5 * 4 + i * 4 + k;

const createSvgElem = <T extends keyof SVGElementTagNameMap>(
  tag: T,
): SVGElementTagNameMap[T] =>
  document.createElementNS("http://www.w3.org/2000/svg", tag);

const createLine = (
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

const createCircle = (i: number, j: number, color: string) => {
  const s = createSvgElem("circle");
  s.setAttribute("cx", String(CELL_SIZE * (i + 0.5)));
  s.setAttribute("cy", String(CELL_SIZE * (j + 0.5)));
  s.setAttribute("r", String(CELL_SIZE / 8));
  s.setAttribute("fill", color);
  return s;
};

const createArrow = (cx: number, cy: number, color: string, deg: number) => {
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

export const drawGrid = (svgElement: HTMLElement, grid: number[]) => {
  // initialize
  svgElement.setAttribute("width", String(CELL_SIZE * 7));
  svgElement.setAttribute("height", String(CELL_SIZE * 6));
  svgElement.setAttribute(
    "viewBox",
    `${-CELL_SIZE / 2} ${-CELL_SIZE / 2} ${CELL_SIZE * 7} ${CELL_SIZE * 6}`,
  );
  svgElement.innerHTML = "";

  // grid の分割部分
  for (let i = 0; i <= 5; ++i) {
    for (let j = 0; j <= 5; ++j) {
      const group = createSvgElem("g");
      const yoko = createLine(
        i,
        Math.max(0, j - 0.1),
        i,
        Math.min(5, j + 0.1),
        "black",
      );
      group.appendChild(yoko);
      const tate = createLine(
        Math.max(0, i - 0.1),
        j,
        Math.min(5, i + 0.1),
        j,
        "black",
      );
      group.appendChild(tate);
      svgElement.appendChild(group);
    }
  }

  // 壁
  const walls = [
    createLine(0, 0, 0, 5, "black", 2),
    createLine(0, 0, 5, 0, "black", 2),
    createLine(5, 0, 5, 4, "black", 2),
    createLine(0, 5, 5, 5, "black", 2),
    createLine(0, 1, 1, 1, "black", 2),
    createLine(0, 3, 1, 3, "black", 2),
    createLine(2, 1, 4, 1, "black", 2),
    createLine(3, 2, 4, 2, "black", 2),
    createLine(2, 4, 3, 4, "black", 2),
    createLine(4, 4, 5, 4, "black", 2),
    createLine(1, 2, 1, 4, "black", 2),
    createLine(2, 1, 2, 3, "black", 2),
    createLine(2, 4, 2, 5, "black", 2),
    createLine(3, 2, 3, 3, "black", 2),
    createLine(4, 2, 4, 4, "black", 2),
  ];
  for (const wall of walls) {
    svgElement.appendChild(wall);
  }

  // S, G
  svgElement.appendChild(createCircle(0, 0, "blue"));
  svgElement.appendChild(createCircle(4, 0, "blue"));
  svgElement.appendChild(createCircle(0, 4, "blue"));
  svgElement.appendChild(createCircle(5, 4, "red"));

  // 矢印
  // U R D L
  const dx = [-0.1, 0.5, 0.1, -0.5];
  const dy = [-0.5, -0.1, 0.5, 0.1];
  const dir2str = ["上", "右", "下", "左"];
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      for (let k = 0; k < 4; ++k) {
        const group = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g",
        );
        const color = getColor(grid[idx(i, j, k)]);
        const arrow = createArrow(
          i + dx[k],
          j + dy[k],
          color.toString(),
          k * 90 - 180,
        );
        group.appendChild(arrow);
        const title = createSvgElem("title");
        title.textContent = `s${j}${i} a${k} (${dir2str[k]}) の Q 値: ${grid[idx(i, j, k)].toFixed(3)}`;
        group.appendChild(title);
        svgElement.appendChild(group);
      }
    }
  }
};
