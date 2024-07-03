import { Attribute, IAttribute } from "../models/attribute.model";


export const saveAttribute = async (attribute: IAttribute): Promise<Attribute | null> => {
    const newAttribute: Attribute = new Attribute({...attribute});
    const saved: Attribute = await newAttribute.save();

    return saved;
}

export const editAttribute = async (attribute: IAttribute): Promise<Attribute | null> => {

    let updateAttribute: Attribute | null = await Attribute.findByPk(attribute.attributeId);

    if (!updateAttribute) return null;
    await updateAttribute.update(attribute);
    return updateAttribute;
}