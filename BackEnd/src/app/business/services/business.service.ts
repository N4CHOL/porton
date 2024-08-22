import { IBusiness, Business } from '../models/business.model';
import { TypeUnit } from '../models/typeUnit.model';
import { IUnit, Unit } from '../models/unit.model';

export const findAllBusinesses = (): Promise<Business[]> => {
    return Business.findAll();
}

export const findBusinessById = async (businessId: number): Promise<Business | null> => {
    return Business.findByPk(businessId, {
        include: [{
            model: Unit,
            include: [{ model: TypeUnit }]
        }]
    });
}

export const saveBusiness = async (business: IBusiness): Promise<Business> => {
    const newBusiness: Business = new Business({...business});
    return newBusiness.save();
}

export const updateBusiness = async (businessId: number, update: IBusiness): Promise<Business | null> => {
    let updateBusiness: Business | null = await Business.findOne({ where: { businessId: businessId } });
    if (updateBusiness) {
        updateBusiness = updateBusinessValues(updateBusiness, update)
        return updateBusiness.save();
    } else {
        return null;
    }
}

export const deleteBusiness = async (businessId: number): Promise<number> => {
    return Business.destroy({ where: { businessId: businessId } });
}


const updateBusinessValues = (original: Business, target: IBusiness) => {
    let originalB: Business = original;
    originalB.name = target.name ? target.name : originalB.name;
    originalB.businessName = target.businessName ? target.businessName : originalB.businessName;
    originalB.cuit = target.cuit ? target.cuit : original.cuit;
    originalB.direction = target.direction ? target.direction : originalB.direction;
    originalB.isEnabled = target.isEnabled;
    
    if (target.unit) {
        // Sacar del OG los que no estan en el target
        const eliminados: IUnit[] = originalB.unit.filter((value: IUnit) => {
            return target.unit.includes(value);
        })
        originalB.removeUnits(eliminados);
        // Sacar del target los duplicados
        // Agregar al OG los nuevos
        let añadir: IUnit[] = target.unit.filter((value: IUnit) => {
            return !originalB.unit.some((val: Unit) => {
                return val.unitId == value.unitId;
            })
        })
        añadir.forEach((val: IUnit) => {
            Unit.findByPk(val.unitId).then((val: Unit | null) => {
                if (val) {
                    originalB.addUnit(val);
                }
            })
        })
    }

    return originalB;
}