import { ActionAccess } from '../app/user/models/action-access.model'
import * as actionService from '../app/user/services/action.service'
import { ACTIONS } from '../environments/constants'

export const initActions = async () => {
    const actions: string[] = Object.values(ACTIONS)
    actions.forEach(async (value: string) => {
        const countActions: number = await actionService.countActions(value);
        if (!countActions) await actionService.saveAction({ name: value });
    })
}