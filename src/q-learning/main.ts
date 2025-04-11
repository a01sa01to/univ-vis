import { drawGrid } from "./draw"

const inputElement = document.getElementById("input");
const svgElement = document.getElementById("svg");

export const CELL_SIZE = 80;

export const idx = (i: number, j: number) => i * 5 + j;

if (svgElement) {
  drawGrid(svgElement, new Array(25).fill(0));
}
