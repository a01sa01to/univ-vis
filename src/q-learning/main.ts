import { drawGrid } from "./draw"
import sampleCode from "./sample-code"

const inputElement = document.getElementById("input") as HTMLTextAreaElement;
const svgElement = document.getElementById("svg")
const sampleCodePreElement = document.getElementById("sample-code");
const errElement = document.getElementById("error");
const rangeDisplayElement = document.getElementById("round");
const rangeMaxElement = document.getElementById("round-max");
const rangeElement = document.getElementById("scale") as HTMLInputElement;
const showExampleButton = document.getElementById("show-example") as HTMLButtonElement;

if (sampleCodePreElement) sampleCodePreElement.innerHTML = sampleCode;

if (svgElement) drawGrid(svgElement, new Array(100).fill(0));

let values = new Array(1).fill(new Array(100).fill(0));

const onChange = () => {
  const val = inputElement.value;
  const round = val.split("\n").filter((v) => v.length > 0)
  if (rangeMaxElement) rangeMaxElement.innerHTML = String(round.length);
  if (rangeElement) rangeElement.max = String(round.length);
  if (errElement) errElement.innerHTML = "";

  for (let i = 0; i < round.length; ++i) {
    const line = round[i].split(" ").filter((v) => v.length > 0);
    if (line.length !== 100) {
      if (errElement) errElement.innerHTML = `${i + 1} 行目の要素数が正しくありません。 ${line.length} 個の値があります。 100 個の要素を空白区切りで指定してください。`;
      return;
    }
    for (let j = 0; j < line.length; ++j) {
      const num = Number(line[j]);
      if (Number.isNaN(num)) {
        if (errElement) errElement.innerHTML = `${i + 1} 行目の ${j + 1} 番目の値 "${line[j]}" は数値ではありません。`;
        return;
      }
    }
  }

  values = round.map((line) => line.split(" ").filter((v) => v.length > 0).map((v) => Number(v)));
  if (svgElement) drawGrid(svgElement, values[0]);
}

if (inputElement) {
  inputElement.addEventListener("change", onChange)
}

if (rangeElement) {
  rangeElement.addEventListener("input", () => {
    const val = rangeElement.value;
    if (rangeDisplayElement) rangeDisplayElement.innerHTML = val;
    const round = Number(val) - 1;
    if (round < 0 || round >= values.length) {
      if (errElement) errElement.innerHTML = `1 以上 ${values.length} 以下の値を指定してください。`;
      return;
    }
    if (svgElement) drawGrid(svgElement, values[round]);
  })
}

if (showExampleButton) {
  showExampleButton.addEventListener("click", async () => {
    const sample = await fetch("/qlearning-example.txt").then((res) => res.text());
    if (inputElement) inputElement.value = sample;
    onChange();
  })
}