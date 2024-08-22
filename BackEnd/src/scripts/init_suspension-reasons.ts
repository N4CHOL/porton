import { SuspensionReason } from "../app/activities/models/suspensionReason.model";


export const initSuspensionReasons = async () => {
    const statesN: number = await SuspensionReason.count();
    if (statesN > 0) return;

    const reasons: string[] = [
        'Turno para comer',
        'Urgencia en planta',
        'Cambio de turno',
        'Otro'
        //SOLO SE CONTEMPLAN LOS ESTADOS PARA EL OPERARIO
    ]

    reasons.forEach(async (val: string) => {
        // const stateN : number = await SuspensionReason.count({where : { name: val.toUpperCase() }})
        // if(!stateN) {
            const reason: SuspensionReason = new SuspensionReason({ name: val });
            reason.save();
        // }
    })
}

// export const initActStates = async () => {
//     const actions: string[] = Object.values(ACTIVITYSTATES)
//     actions.forEach(async (value: string) => {
//         const countActions: number = await activityService.countActions(value);
//         if (!countActions) await actionService.saveAction({ name: value });
//     })
// }