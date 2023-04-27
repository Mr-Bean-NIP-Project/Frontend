import { parseISO, format } from 'date-fns'

import Big, { BigSource } from 'big.js'

export function formatText(str: string) {
    let newString = str
        .replace('id', 'ID')
        .replace(/_+(\w)/g, (_, p: string) => ` ${p.toUpperCase()}`)
        .replace(/^(\w)/g, (_, p: string) => p.toUpperCase());
    return newString;
}

export function formatNutriText(str: string) {
    const mg = ['sodium', 'cholesterol'];
    const g = [
        'protein',
        'total_fat',
        'saturated_fat',
        'trans_fat',
        'carbohydrate',
        'sugars',
        'dietary_fibre']

    let newString = formatText(str);
    if (mg.some(substring => str.includes(substring))) {
        newString += " (mg)";
    } else if (str.includes('energy')) {
        newString += " (kcal)";
    } else if (g.some(substring => str.includes(substring))) {
        newString += " (g)";
    }
    return newString;
}

export function formatDate(str: string | undefined) {
    if (!str) return '';
    const date = parseISO(str);
    return format(date, 'dd/MM/yy h:mma');
}

// Nutrition stored in backend is per grams/ml
// but user interacts with nutrition in per 100g/100ml
export function formatNutriValue(nutrition: BigSource): string {
    return Big(nutrition).times(100).toString();
}