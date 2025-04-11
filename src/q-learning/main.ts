import { drawGrid } from "./draw"
import sampleCode from "./sample-code"

const inputElement = document.getElementById("input");
const svgElement = document.getElementById("svg");
const sampleCodePre = document.getElementById("sample-code");

if (svgElement && inputElement && sampleCodePre) {
  // initialize
  drawGrid(svgElement, new Array(25).fill(100));

  sampleCodePre.innerHTML = sampleCode;
}
else {
  alert("正しく読み込まれませんでした。 再読み込みしてみてください。");
}
