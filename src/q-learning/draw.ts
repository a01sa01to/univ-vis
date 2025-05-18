import { getColor } from "../utils/color";
import {
  CELL_SIZE,
  createArrow,
  createCircle,
  createLine,
  createSvgElem,
  idx,
} from "../utils/draw";

export const drawGrid = (svgElement: SVGSVGElement, grid: number[]) => {
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
