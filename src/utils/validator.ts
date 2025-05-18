interface ValidResult {
  isValid: true;
  numLines: number;
  result: number[][];
}

interface InvalidResult {
  isValid: false;
  errorMessage: string;
}

type ValidationResult = ValidResult | InvalidResult;

// すべての行が、 cnt 個の type で構成されていることを確認する
export const validateInput = (
  input: string,
  cnt: number,
  type: "int" | "float",
): ValidationResult => {
  // 各行に分割
  const lines = input.split("\n").filter((v) => v.length > 0);

  // 正規表現と変換関数
  const numRegex = type === "int" ? /^-?\d+$/ : /^-?\d+(\.\d+)?$/;
  const parseNum = (s: string) =>
    type === "int" ? Number.parseInt(s, 10) : Number.parseFloat(s);

  for (let i = 0; i < lines.length; ++i) {
    // 各行を空白で分割
    const line = lines[i].split(" ").filter((v) => v.length > 0);

    // 個数チェック
    if (line.length !== cnt) {
      return {
        isValid: false,
        errorMessage: `${i + 1} 行目の要素数が正しくありません。 ${line.length} 個の値があります。 ${cnt} 個の要素を空白区切りで指定してください。`,
      };
    }

    // 数値チェック
    for (let j = 0; j < line.length; ++j) {
      // まず正規表現でチェック
      if (!numRegex.test(line[j])) {
        return {
          isValid: false,
          errorMessage: `${i + 1} 行目の ${j + 1} 番目の値 "${line[j]}" は数値ではありません。`,
        };
      }

      // 変換チェック
      if (Number.isNaN(parseNum(line[j]))) {
        return {
          isValid: false,
          errorMessage: `${i + 1} 行目の ${j + 1} 番目の値 "${line[j]}" は数値ではありません。`,
        };
      }
    }
  }

  // すべての行が正しい場合に返す
  const result = lines.map((line) =>
    line
      .split(" ")
      .filter((v) => v.length > 0)
      .map((v) => parseNum(v)),
  );

  return { isValid: true, numLines: lines.length, result };
};
