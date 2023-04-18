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
