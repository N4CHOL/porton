import { WOState } from "../app/maintenance-plan/models/wostate.model"

export const initWoStates = async () => {
    const statesN: number = await WOState.count();
    if (statesN > 0) return;
    const states: string[] = [
        'Generada',              // redundante
        'pendiente asignacion',  // cuando una OT es creada pero no asignada
        'pendiente realizacion', // OT asignada pero no comenzada
        'en proceso',            // cuando comienza una actividad de una OT
        'listo',                 // cuando todas las actividades pasan a 'Listo'
        'suspendido',            // cuando se suspende una OT, sea por operario o encargado
        'finalizada',            // cuando se da por revisada la OT, estado final
        'cancelada'      ,        // estado final
        'demorada'
    ]

    states.forEach((val: string) => {
        const state: WOState = new WOState({ name: val });
        state.save();
    })
}