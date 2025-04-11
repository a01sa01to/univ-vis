import { drawGrid } from "./draw"

const inputElement = document.getElementById("input");
const svgElement = document.getElementById("svg");


if (svgElement && inputElement) {
  // initialize
  drawGrid(svgElement, new Array(25).fill(100));

}
else {
  alert("正しく読み込まれませんでした。 再読み込みしてみてください。");
}
