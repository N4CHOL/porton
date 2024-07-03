import { Access } from '../models/access.model'
import { Feature } from '../models/feature.model';
import * as featureService from './feature.service'
import * as actionService from './action.service';
import { Action } from '../models/action.model';

export const createAccess = async (feature: string, actions: string[]) => {
    // Buscar en BD la Feature
    const feat: Feature | null = await featureService.findFeature(feature);
    if (!feat) throw 'No existe la feature';
    // Buscar en BD la Accion
    const acts: Promise<Action | null>[] = actions.map<Promise<Action | null>>((act: string) => {
        return actionService.findAction(act);
    })
    const dbActions: Action[] = []
    await Promise.all(acts).then((actions: (Action | null)[]) => {
        actions.forEach((action: Action | null) => {
            if (action) dbActions.push(action);
        })
    })
    if (dbActions.length < 1) throw 'No existe la acción';
    // Devolver el objeto Access
    const newAccess: Access = new Access();
    await newAccess.save();
    newAccess.$set<Feature>('feature', feat);
    newAccess.$add<Action>('actions', dbActions);
    return newAccess;
}

export const editRoleAccess = async (roleId: number, featId: number, actions: string[]) => {
    //Revisar si el rol tiene acceso a la feature
    //Si no las tiene, crear el acceso
    //Si las tiene, editar las acciones
    throw 'No implementada';
}