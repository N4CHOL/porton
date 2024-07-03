import { Priority } from "../app/shared/classes/priority.model";

export const initPriorities= async () => {
    const statesN: number = await Priority.count();
    if (statesN > 0) return;
    const states: string[] = [
        'Urgente',
        'Alta', 
        'Media',
        'Baja',
    ]

    states.forEach((val: string, index) => {
        const state: Priority = new Priority({ name: val.toUpperCase(), weight: index });
        state.save();
    })
}
