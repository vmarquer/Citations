export interface Color {
    name: string;
    rgba: string;
}

export const colors: Color[] =[
    {name: 'black', rgba: 'rgba(40, 40, 40, 1.0)'},
    {name: 'white', rgba: 'rgba(255, 255, 255, 1.0)'},
    {name: 'background', rgba: 'rgba(244, 244, 244, 1.0)'},
    {name: 'red', rgba: 'rgba(70, 6, 53, 1.0)'},
    {name: 'orange', rgba: 'rgba(255, 165, 0, 1.0)'},
    {name: 'green', rgba: 'rgba(119, 163, 69, 1.0)'},
    {name: 'grey', rgba: 'rgba(163, 163, 163, 1.0)'},
]

export const findColor = (name: string): string => {
    const color = colors.find((color: Color) => color.name === name);
    return color ? color.rgba : 'rgba(0, 0, 0, 1.0)';
}
