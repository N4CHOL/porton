import { Priority } from "../classes/priority.model";

export const findPriority = async (name: string) => {

    return Priority.findOne({
        where: {
            name: name.toUpperCase()
        }
    });

}

export const getPriorities = async (): Promise<Priority[]> => {
    return Priority.findAll();
}