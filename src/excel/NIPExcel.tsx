import { NIP } from "../types/types";
import * as XLSX from "xlsx-js-style";

const NUMBER_OF_ROWS = 15;

export function formatAndDownloadNip(nip: NIP) {
  const wb = XLSX.utils.book_new();
  const contentRows = [
    ["Nutrition Information"],
    [nip.name],
    [`Serving Size: ${nip.serving_size}${nip.serving_unit}`],
    ["Average Quantity"],
    ["", "Per Serving", "", `Per 100${nip.serving_unit}`, ""],
    ["Energy", nip.per_serving.energy, "kcal", nip.per_hundred.energy, "kcal"],
    ["Protein", nip.per_serving.protein, "g", nip.per_hundred.protein, "g"],
    [
      "Total Fat",
      nip.per_serving.total_fat,
      "g",
      nip.per_hundred.total_fat,
      "g",
    ],
    [
      "- Saturated",
      nip.per_serving.saturated_fat,
      "g",
      nip.per_hundred.saturated_fat,
      "g",
    ],
    [
      "Trans Fat",
      nip.per_serving.trans_fat,
      "g",
      nip.per_hundred.trans_fat,
      "g",
    ],
    [
      "Cholesterol",
      nip.per_serving.cholesterol,
      "mg",
      nip.per_hundred.cholesterol,
      "mg",
    ],
    [
      "Carbohydrate",
      nip.per_serving.carbohydrate,
      "g",
      nip.per_hundred.carbohydrate,
      "g",
    ],
    ["- Sugars", nip.per_serving.sugars, "g", nip.per_hundred.sugars, "g"],
    [
      "Dietary Fibre",
      nip.per_serving.dietary_fibre,
      "g",
      nip.per_hundred.dietary_fibre,
      "g",
    ],
    ["Sodium", nip.per_serving.sodium, "mg", nip.per_hundred.sodium, "mg"],
  ];
  const ws = XLSX.utils.aoa_to_sheet(contentRows);

  // s = start, r = row, c=col, e= end
  // 0-indexed, 0: A, 1: B...
  const merges: XLSX.Range[] = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    if (row < 4) {
      // rows 1 to 4
      merges.push(generateMergeRange(row, 0, 4));
    } else if (row === 4) {
      // row 5
      merges.push(generateMergeRange(row, 1, 2)); // for Per Serving
      merges.push(generateMergeRange(row, 3, 4)); // for Per 100 g
    }
  }
  ws["!merges"] = merges;
  ws["!cols"] = [{
    wch: 15
  }]

  XLSX.utils.book_append_sheet(wb, ws, "NIP");
  XLSX.writeFile(wb, "test.xlsx");
}

function generateMergeRange(
  row: number,
  colStart: number,
  colEnd: number
): XLSX.Range {
  return {
    s: {
      r: row,
      c: colStart,
    },
    e: {
      r: row,
      c: colEnd,
    },
  };
}
