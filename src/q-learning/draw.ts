import { CELL_SIZE, idx } from "./main"

const generateCircle = (i: number, j: number, color: string) => {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx", (CELL_SIZE * (i + 0.5)).toString());
  s.setAttribute("cy", (CELL_SIZE * (j + 0.5)).toString());
  s.setAttribute("r", (CELL_SIZE / 4).toString());
  s.setAttribute("fill", color);
  return s;
};

const generateArrow = (cx: number, cy: number, color: string, deg: number) => {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "path");
  s.setAttribute("d", "M -0.2 -1 L 0.2 -1 L 0.2 0 L 0.7 0 L 0 1 L -0.7 0 L -0.2 0 Z");
  s.setAttribute("transform", `translate(${CELL_SIZE * (cx + 0.5)} ${CELL_SIZE * (cy + 0.5)}) scale(${CELL_SIZE / 8}) rotate(${deg})`);
  s.setAttribute("fill", color);
  return s;
};

export const drawGrid = (svgElement: HTMLElement, grid: number[]) => {
  svgElement.setAttribute("width", (CELL_SIZE * 6).toString());
  svgElement.setAttribute("height", (CELL_SIZE * 6).toString());
  svgElement.setAttribute("viewBox", `${-CELL_SIZE / 2} ${-CELL_SIZE / 2} ${CELL_SIZE * 6} ${CELL_SIZE * 6}`);
  svgElement.innerHTML = "";

  // grid の分割部分
  for (let i = 0; i <= 5; ++i) {
    for (let j = 0; j <= 5; ++j) {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const yoko = document.createElementNS("http://www.w3.org/2000/svg", "line");
      yoko.setAttribute("x1", (i * CELL_SIZE).toString());
      yoko.setAttribute("y1", (Math.max(0, j - 0.1) * CELL_SIZE).toString());
      yoko.setAttribute("x2", (i * CELL_SIZE).toString());
      yoko.setAttribute("y2", (Math.min(5, j + 0.1) * CELL_SIZE).toString());
      yoko.setAttribute("stroke", "black");
      group.appendChild(yoko);
      const tate = document.createElementNS("http://www.w3.org/2000/svg", "line");
      tate.setAttribute("x1", (Math.max(0, i - 0.1) * CELL_SIZE).toString());
      tate.setAttribute("y1", (j * CELL_SIZE).toString());
      tate.setAttribute("x2", (Math.min(5, i + 0.1) * CELL_SIZE).toString());
      tate.setAttribute("y2", (j * CELL_SIZE).toString());
      tate.setAttribute("stroke", "black");
      group.appendChild(tate);
      svgElement.appendChild(group);
    }
  }

  // 壁
  const wall = document.createElementNS("http://www.w3.org/2000/svg", "line");
  wall.setAttribute("x1", (2 * CELL_SIZE).toString());
  wall.setAttribute("y1", (1 * CELL_SIZE).toString());
  wall.setAttribute("x2", (2 * CELL_SIZE).toString());
  wall.setAttribute("y2", (4 * CELL_SIZE).toString());
  wall.setAttribute("stroke", "black");
  wall.setAttribute("stroke-width", "5");
  svgElement.appendChild(wall);

  // S, G
  svgElement.appendChild(generateCircle(0, 2, "blue"));
  svgElement.appendChild(generateCircle(4, 0, "red"));
  svgElement.appendChild(generateCircle(4, 4, "red"));
  svgElement.appendChild(generateCircle(3, 4, "black"));

  // 矢印
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.appendChild(generateArrow(i - 0.5, j - 0.1, "green", 90));
      group.appendChild(generateArrow(i + 0.5, j + 0.1, "green", 270));
      group.appendChild(generateArrow(i - 0.1, j - 0.5, "green", 180));
      group.appendChild(generateArrow(i + 0.1, j + 0.5, "green", 0));
      svgElement.appendChild(group);
    }
  }
};
