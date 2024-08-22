import { DaysOfWeek } from '../app/shared/classes/daysOfWeek.model';

export const initDaysOfWeek= async () => {
    const statesN: number = await DaysOfWeek.count();
    if (statesN > 0) return;
    const states: string[] = [
        'Lunes',
        'Martes', 
        'Miércoles ',
        'Jueves',
        'Viernes', 
        'Sábado ',
        'Domingo',
    ]

    states.forEach((val: string, index) => {
        const state: DaysOfWeek = new DaysOfWeek({ name: val.toUpperCase(), weight: index });
        state.save();
    })
}
