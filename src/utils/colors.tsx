export interface Color {
    name: string;
    rgba: string;
}

export const colors: Color[] = [
    { name: 'black', rgba: 'rgba(40, 40, 40, 1.0)' },
    { name: 'white', rgba: 'rgba(255, 255, 255, 1.0)' },
    { name: 'background', rgba: 'rgba(244, 244, 244, 1.0)' },
    { name: 'red', rgba: 'rgba(186, 0, 13, 1.0)' },
    { name: 'yellow', rgba: 'rgba(255, 193, 7, 1.0)' },
    { name: 'green', rgba: 'rgba(0, 140, 58, 1.0)' },
    { name: 'grey', rgba: 'rgba(163, 163, 163, 1.0)' },
]

export const findColor = (name: string): string => {
    const color = colors.find((color: Color) => color.name === name);
    return color ? color.rgba : 'rgba(0, 0, 0, 1.0)';
}

export const getResultColor = (rate: number): string => {
    const startColor = { r: 186, g: 0, b: 13, a: 1 };
    const midColor = { r: 255, g: 193, b: 7, a: 1 };
    const endColor = { r: 0, g:140, b: 58, a: 1 };
    let r, g, b;

    if (rate <= 50) {
        const factor = rate / 50;
        r = Math.round(startColor.r + (midColor.r - startColor.r) * factor);
        g = Math.round(startColor.g + (midColor.g - startColor.g) * factor);
        b = Math.round(startColor.b + (midColor.b - startColor.b) * factor);
    } else {
        const factor = (rate - 50) / 50;
        r = Math.round(midColor.r + (endColor.r - midColor.r) * factor);
        g = Math.round(midColor.g + (endColor.g - midColor.g) * factor);
        b = Math.round(midColor.b + (endColor.b - midColor.b) * factor);
    }
    return `rgba(${r}, ${g}, ${b}, ${1.0})`;
}
