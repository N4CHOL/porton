import { Action, IAction } from "../models/action.model";

export const saveAction = async (action: IAction): Promise<Action> => {
    const newAction = new Action({...action});
    return newAction.save();
}

export const countActions = async (actionName: string): Promise<number> => {
    return Action.count({ where: { name: actionName } });
}

export const findAction = async (actionName: string): Promise<Action | null> => {
    return Action.findOne({ where: { name: actionName } });
}