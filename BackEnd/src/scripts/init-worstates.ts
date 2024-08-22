import { WorState } from "../app/assets/models/worstate.model"


export const initWorStates = async () => {
    const statesN: number = await WorState.count();
    if (statesN > 0) return;
    const states: string[] = [
        'solicitada',
        'promovida',
        'descartada'
    ]

    states.forEach((val: string) => {
        const state: WorState = new WorState({ name: val });
        state.save();
    })
}