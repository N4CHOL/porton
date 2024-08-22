import { Business } from "../models/business.model";
import { TypeUnit } from "../models/typeUnit.model";
import { IUnit, Unit } from "../models/unit.model";

export const getUnit = async (idUnit: number): Promise<Unit | null> => {
    return Unit.findByPk(idUnit, { include: [{ model: TypeUnit }] });
}

export const getUnits = async (): Promise<Unit[]> => {
    return Unit.findAll();
}

export const saveUnit = async (unit: IUnit): Promise<Unit> => {
    const newUnit: Unit = new Unit({...unit});
    return newUnit.save();
}

export const saveBusinessUnit = async (businessId: number, unit: IUnit): Promise<Unit | null> => {
    const business: Business | null = await Business.findByPk(businessId);
    if (!business) return null;

    const newUnit: Unit = new Unit({...unit});
    const sav: Unit = await newUnit.save();

    await sav.$set<Business>('business', business);
    const type: TypeUnit | null = await TypeUnit.findByPk(unit.typeUnit.typeUnitId);
    if (!type) return null;

    await sav.$set<TypeUnit>('typeUnit', type);
    return sav;

}

export const updateUnit = async (unitId: number, unit: IUnit): Promise<Unit | null> => {
    let update: Unit | null = await Unit.findByPk(unitId, { include: [{ model: TypeUnit }] });
    if (!update) return null;

    if (!update.typeUnit || !(unit.typeUnit.typeUnitId === update.typeUnit.typeUnitId)) {
   
        const type: TypeUnit | null = await TypeUnit.findByPk(unit.typeUnit.typeUnitId);
        if (!type) return null;
        await update.$set<TypeUnit>('typeUnit', type);
    }
    update.set(unit);
    return update.save();
}