import { drawGrid } from "./draw"

const inputElement = document.getElementById("input");
const svgElement = document.getElementById("svg");


if (svgElement) {
  // initialize
  drawGrid(svgElement, new Array(25).fill(0));
}
