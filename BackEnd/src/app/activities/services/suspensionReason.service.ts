import { SuspensionReason } from "../models/suspensionReason.model";

// export const createNewSuspensionReason = async (reason: string): Promise<SuspensionReason> => {
//     const newSuspensionReason : SuspensionReason = new SuspensionReason({name : reason});
//     return newSuspensionReason.save();
// }

export const findReason = async (name: string) => {
    return SuspensionReason.findOne({
        where: {
            name: name.toUpperCase()
        }
  });
}