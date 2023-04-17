export function formatText(str: string) {
    let newString = str
        .replace(/_+(\w)/g, (_, p: string) => ` ${p.toUpperCase()}`)
        .replace(/^(\w)/g, (_, p: string) => p.toUpperCase());
    return newString;
}

export function formatNutriText(str: string) {
    let newString = formatText(str);
    if (str.includes('sodium') || str.includes('cholesterol')) {
        newString += " (mg)";
    } else if (str.includes('energy')) {
        newString += " (kcal)";
    } else {
        newString += " (g)";
    }
    return newString;
}
