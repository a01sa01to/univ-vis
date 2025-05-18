import {
  commonComponents,
  commonReset,
  setError,
  setExampleUrl,
  setMaxLine,
  setOnInputChange,
  setOnRangeChange,
} from "../utils/common";
import { validateInput } from "../utils/validator";
import { drawGrid } from "./draw";

const { svgElement, rangeElement } = commonComponents;

const initialGridData: number[] = new Array(100).fill(0);

// onLoad
commonReset();
drawGrid(svgElement, initialGridData);

let values: number[][] = new Array(1).fill(initialGridData);

setOnInputChange((val) => {
  const validationResult = validateInput(val, 100, "float");
  if (!validationResult.isValid) {
    setError(validationResult.errorMessage);
    return;
  }

  setMaxLine(validationResult.numLines);
  rangeElement.disabled = false;
  values = [initialGridData, ...validationResult.result];
  drawGrid(svgElement, values[0]);
});

setOnRangeChange((round) => {
  if (round < 0 || round >= values.length) {
    // 起きえないはず？ 念のため
    setError(`0 以上 ${values.length - 1} 以下の値を指定してください。`);
    return;
  }
  drawGrid(svgElement, values[round]);
});

setExampleUrl("/univ-vis/qlearning-example.txt");
