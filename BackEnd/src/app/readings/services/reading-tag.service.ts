import { ReadingTag } from "../models/reading-tag.model";

export const findOrCreateTag = async (tag: string): Promise<ReadingTag> => {
    let readTag: ReadingTag | null = await ReadingTag.findOne({ where: { tag: tag } });
    if (!readTag) {
        readTag = new ReadingTag({ tag: tag });
        await readTag.save();
    }
    return readTag;
}