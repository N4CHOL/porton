import { Activity } from "../models/activity.model";
import { ActState } from "../models/actstate.model";

export const findState = async (name: string) => {

    return ActState.findOne({
        where: {
            name: name.toUpperCase()
        }
    });

}

//TODO: Migrar todos los estados que se resuelven en activity.service a esta maquina de estados

export const StateCancelActivity = async (act: Activity): Promise<Activity> => {
    try {
        if (!act) throw 'No existe la Actividad';
        const state: ActState | null = await findState('cancelada');
        if (!state) throw 'No hay estado \'cancelada\''
        await act.$set<ActState>('state', state);
        return act.save(); 
    } catch (e) {
        return Promise.reject(e);
    }
}