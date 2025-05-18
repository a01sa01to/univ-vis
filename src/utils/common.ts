const inputElement =
  document.querySelector<HTMLTextAreaElement>("textarea#input");
const svgElement = document.querySelector<SVGSVGElement>("svg#svg");
const errElement = document.querySelector<HTMLParagraphElement>("p#error");
const currentLineElement =
  document.querySelector<HTMLSpanElement>("span#round");
const maxLineElement =
  document.querySelector<HTMLSpanElement>("span#round-max");
const rangeElement = document.querySelector<HTMLInputElement>("input#scale");
const showExampleButton = document.querySelector<HTMLButtonElement>(
  "button#show-example",
);

const doesElementExist = <T extends Element>(elem: T | null): elem is T =>
  elem !== null;

if (
  !doesElementExist(inputElement) ||
  !doesElementExist(svgElement) ||
  !doesElementExist(errElement) ||
  !doesElementExist(currentLineElement) ||
  !doesElementExist(maxLineElement) ||
  !doesElementExist(rangeElement) ||
  !doesElementExist(showExampleButton)
) {
  alert(
    "正しく読み込めませんでした。 ページを再読み込みしてください。\n問題が解決しない場合は、 WebClass のメッセージから報告してください。",
  );
  throw new Error("One or more required elements are missing from the DOM.");
}

export const commonComponents = {
  inputElement,
  svgElement,
  errElement,
  currentLineElement,
  maxLineElement,
  rangeElement,
  showExampleButton,
} as const;

export const setError = (msg: string) => {
  errElement.innerHTML = msg;
};

export const getCurrentLine = () => {
  const cur = Number.parseInt(currentLineElement.innerHTML, 10);
  if (Number.isNaN(cur)) {
    currentLineElement.innerHTML = "0";
    rangeElement.value = "0";
    return 0;
  }
  return cur;
};

export const setMaxLine = (max: number) => {
  const cur = getCurrentLine();
  if (cur > max || Number.isNaN(cur)) {
    currentLineElement.innerHTML = String(max);
    rangeElement.value = String(max);
  }

  maxLineElement.innerHTML = String(max);
  rangeElement.max = String(max);
};

export const commonReset = () => {
  setError("");
  setMaxLine(0);
  rangeElement.disabled = true;
};

export const setOnInputChange = (callback: (input: string) => void) => {
  inputElement.addEventListener("input", () => {
    setError("");
    setMaxLine(0);
    rangeElement.disabled = true;
    callback(inputElement.value);
  });
};

export const trigglerInputChange = () => {
  const event = new Event("input", { bubbles: true });
  inputElement.dispatchEvent(event);
};

export const setOnRangeChange = (callback: (round: number) => void) => {
  rangeElement.addEventListener("input", () => {
    setError("");
    const val = rangeElement.value;
    currentLineElement.innerHTML = val;
    const round = Number.parseInt(val, 10);
    if (round < 0 || round > Number.parseInt(maxLineElement.innerHTML, 10)) {
      setError(
        `0 以上 ${maxLineElement.innerHTML} 以下の値を指定してください。`,
      );
      return;
    }
    callback(round);
  });
};

export const setExampleUrl = (url: string) => {
  showExampleButton.addEventListener("click", async () => {
    const sample = await fetch(url).then((res) => res.text());
    inputElement.value = sample;
    trigglerInputChange();
  });
};
