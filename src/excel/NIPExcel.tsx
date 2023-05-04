import { NIP } from "../types/types";
import * as XLSX from "xlsx";

export function formatAndDownloadNip(nip: NIP) {
  const wb = XLSX.utils.book_new();
  const contentRows = [
    ["Nutrition Information", "", "", "", ""],
    [nip.name, "", "", "", ""],
    [`Serving Size: ${nip.serving_size}${nip.serving_unit}`, "", "", "", ""],
    ["", "Average Quantity", "", "", ""],
    ["", "Per Serving", "", `Per 100${nip.serving_unit}`, ""],
    ["Energy", nip.per_serving.energy, "kcal", nip.per_hundred.energy, "kcal"],
    ["Protein", nip.per_serving.protein, "g", nip.per_hundred.protein, "g"],
    ["Total Fat", nip.per_serving.total_fat, "g", nip.per_hundred.total_fat, "g"],
    ["- Saturated", nip.per_serving.saturated_fat, "g", nip.per_hundred.saturated_fat, "g"],
    ["Trans Fat", nip.per_serving.trans_fat, "g", nip.per_hundred.trans_fat, "g"],
    ["Cholesterol", nip.per_serving.cholesterol, "mg", nip.per_hundred.cholesterol, "mg"],
    ["- Sugars", nip.per_serving.sugars, "g", nip.per_hundred.sugars, "g"],
    ["Dietary Fibre", nip.per_serving.dietary_fibre, "g", nip.per_hundred.dietary_fibre, "g"],
    ["Sodium", nip.per_serving.sodium, "mg", nip.per_hundred.sodium, "mg"],
  ];
  const ws = XLSX.utils.aoa_to_sheet(contentRows);

  XLSX.utils.book_append_sheet(wb, ws, "NIP");
  XLSX.writeFile(wb, "test.xlsx");
}
