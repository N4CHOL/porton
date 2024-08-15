import { DaysOfWeek } from "../classes/daysOfWeek.model";

export const findDaysOfWeek= async (name: string) => {

    return DaysOfWeek.findOne({
        where: {
            name: name.toUpperCase()
        }
    });

}

export const getDaysOfWeek = async (): Promise<DaysOfWeek[]> => {
    return DaysOfWeek.findAll();
}