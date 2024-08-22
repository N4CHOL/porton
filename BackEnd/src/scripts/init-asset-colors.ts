import { Color } from "../app/equipments/models/color.model"

export const initColors = async () => {
    const colorN: number = await Color.count();
    if (colorN > 0) return;
    const colors: string[] = ['Rojo', 'Negro', 'Amarillo', 'Verde', 'Azul'];
    colors.forEach(async (val: string) => {
        const color = new Color({ name: val });
        color.save();
    })

}