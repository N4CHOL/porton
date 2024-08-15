import { ActState } from "../app/activities/models/actstate.model";
import { ACTIVITYSTATES } from "../environments/constants";

export const initActStates = async () => {
    // const statesN: number = await ActState.count();
    // if (statesN > 0) return;

    const states: string[] = [
        'pendiente realizacion',
        'en proceso',
        'listo',
        'cancelada',
        'suspendida'
        //SOLO SE CONTEMPLAN LOS ESTADOS PARA EL OPERARIO
    ]

    states.forEach(async (val: string) => {
        const stateN : number = await ActState.count({where : { name: val.toUpperCase() }})
        if(!stateN) {
            const state: ActState = new ActState({ name: val });
            state.save();
        }
    })
}

// export const initActStates = async () => {
//     const actions: string[] = Object.values(ACTIVITYSTATES)
//     actions.forEach(async (value: string) => {
//         const countActions: number = await activityService.countActions(value);
//         if (!countActions) await actionService.saveAction({ name: value });
//     })
// }
