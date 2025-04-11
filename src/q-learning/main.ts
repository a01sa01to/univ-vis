import { drawGrid } from "./draw"
import sampleCode from "./sample-code"

const inputElement = document.getElementById("input") as HTMLTextAreaElement;
const svgElement = document.getElementById("svg")
const sampleCodePre = document.getElementById("sample-code");

if (sampleCodePre) sampleCodePre.innerHTML = sampleCode;

if (svgElement) drawGrid(svgElement, new Array(25).fill(100));

if (inputElement) {
  inputElement.addEventListener("change", (e) => {
    const val = inputElement.value;
  })
}