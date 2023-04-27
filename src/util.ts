import Big, { BigSource } from "big.js";
import { parseISO, format } from "date-fns";

export enum SERVING_UNIT {
  G = "g",
  ML = "ml",
  MG = "mg",
  KCAL = "kcal",
}

export enum NUTRITION_DP {
  energy = 0,
  protein = 1,
  total_fat = 1,
  saturated_fat = 1,
  trans_fat = 1,
  cholesterol = 0,
  carbohydrate = 1,
  sugars = 1,
  dietary_fibre = 1,
  sodium = 0,
}

export enum NUTRITION {
  SODIUM = "sodium",
  CHOLESTEROL = "cholesterol",
  PROTEIN = "protein",
  TOTAL_FAT = "total_fat",
  SATURATED_FAT = "saturated_fat",
  TRANS_FAT = "trans_fat",
  CARBOHYDRATE = "carbohydrate",
  SUGARS = "sugars",
  DIETARY_FIBRE = "dietary_fibre",
  ENERGY = "energy",
}

export const NUTRITION_MG = [NUTRITION.SODIUM, NUTRITION.CHOLESTEROL];
export const NUTRITION_G = [
  NUTRITION.PROTEIN,
  NUTRITION.TOTAL_FAT,
  NUTRITION.SATURATED_FAT,
  NUTRITION.TRANS_FAT,
  NUTRITION.CARBOHYDRATE,
  NUTRITION.SUGARS,
  NUTRITION.DIETARY_FIBRE,
];
export const NUTRITION_KCAL = [NUTRITION.ENERGY];

export const NUTRITION_FIELDS: string[] = [
  ...NUTRITION_MG,
  ...NUTRITION_G,
  ...NUTRITION_KCAL,
];

export function formatText(str: string) {
  return str
    .replace("id", "ID")
    .replace(/_+(\w)/g, (_, p: string) => ` ${p.toUpperCase()}`)
    .replace(/^(\w)/g, (_, p: string) => p.toUpperCase());
}

export function formatNutriText(str: string) {
  let newString = formatText(str);
  if (NUTRITION_MG.some((substring) => str.includes(substring))) {
    newString += ` (${SERVING_UNIT.MG})`;
  } else if (NUTRITION_KCAL.some((substring) => str.includes(substring))) {
    newString += ` (${SERVING_UNIT.KCAL})`;
  } else if (NUTRITION_G.some((substring) => str.includes(substring))) {
    newString += ` (${SERVING_UNIT.G})`;
  }
  return newString;
}

export function formatDate(str: string | undefined) {
  if (!str) return "";
  const date = parseISO(str);
  return format(date, "dd/MM/yy h:mma");
}

// Nutrition stored in backend is per grams/ml
// but user interacts with nutrition in per 100g/100ml
// nutriKey is something like energy, sodium etc
// nutriVal is the actual numeric value
export function formatNutriValue(
  nutriKey: NUTRITION,
  nutriVal: BigSource
): string {
  const numDp = NUTRITION_DP[nutriKey];
  return Big(nutriVal).times(100).toFixed(numDp);
}

export function divideNutriValue(
  nutriKey: NUTRITION,
  nutriVal: BigSource
): string {
  const numDp = NUTRITION_DP[nutriKey];
  return Big(nutriVal).div(100).toString();
}
