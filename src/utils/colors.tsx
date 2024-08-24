export interface Color {
    name: string;
    rgba: string;
}

export const colors: Color[] =[
    {name: 'black', rgba: 'rgba(40, 40, 40, 1.0)'},
    {name: 'white', rgba: 'rgba(255, 255, 255, 1.0)'},
    {name: 'background', rgba: 'rgba(244, 244, 244, 1.0)'},
    {name: 'dark-green', rgba: 'rgba(6, 70, 53, 1.0)'},
    {name: 'light-green', rgba: 'rgba(81, 146, 89, 1.0)'},
    {name: 'red', rgba: 'rgba(70, 6, 53, 1.0)'},
    {name: 'grey', rgba: 'rgba(163, 163, 163, 1.0)'},
    {name: 'light-blue', rgba: 'rgba(235, 239, 255, 1.0)'},
    {name: 'blue', rgba: 'rgba(11, 30, 203, 1.0)'},
    {name: 'blue-background', rgba: 'rgba(105, 134, 208, 1.0)'},
    {name: 'chart-green', rgba: 'rgba(81, 146, 89, 1.0)'},
    {name: 'chart-yellow', rgba: 'rgba(255, 187, 0, 1.0)'},
    {name: 'chart-blue', rgba: 'rgba(105, 134, 208, 1.0)'},
]

export const findColor = (name: string): string => {
    const color = colors.find((color: Color) => color.name === name);
    return color ? color.rgba : 'rgba(0, 0, 0, 1.0)';
}
