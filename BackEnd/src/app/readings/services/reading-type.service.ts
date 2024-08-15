import { ReadingType } from "../models/reading-type.model"

export const findOrCreateType = async (name: string): Promise<ReadingType> => {
    let readType: ReadingType | null = await ReadingType.findOne({ where: { name: name } });
    if (!readType) {
        // Create reading Type
        readType = new ReadingType({ name: name });
        await readType.save();
    }
    return readType;
}