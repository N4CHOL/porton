import { WorState } from "../models/worstate.model";

export const findState = async (name: string) => {

    return WorState.findOne({
        where: {
            name: name.toUpperCase()
        }
    });

}