import * as pagination from '../../shared/helpers/pagination';
import { PaginatedResponse } from "../../shared/classes/paginated-response";
import { IPhysicalComponent, PhysicalComponent } from "../models/physical-component.model";
import { Attribute, IAttribute } from '../models/attribute.model';
import { saveAttribute, editAttribute } from './attribute.service';
import { MachineType } from '../../equipments/models/machine-type.model';
import { resolve } from 'bluebird';
import sequelize from 'sequelize';


export const getPhysicalComponents = async (): Promise<PhysicalComponent[]> => {
    return PhysicalComponent.findAll();
    // return PhysicalComponent.findAll({ where: {[sequelize.Op.not]: { name: 'Empty PhysicalComponent'}}});
}

export const getPhysicalComponentsPage = async (page: number, limit: number): Promise<PaginatedResponse<PhysicalComponent>> => {
    const findOptions = pagination.getFindOptions(page, limit);

    return PhysicalComponent.findAndCountAll({
        distinct: true,
        include: [
            {
                model: Attribute,
                
            }, {
                model: MachineType,
                required: true
            }
        ],
        limit: findOptions.limit,
        offset: findOptions.offset
    }).then(
        (result: { rows: PhysicalComponent[]; count: number; }) => {
        
            return new PaginatedResponse<PhysicalComponent>(result.rows, result.count, limit, page, Math.ceil(result.count / limit));
        }
    )
}

export const getPhysicalComponent = async (id: number): Promise<PhysicalComponent | null> => {
    return PhysicalComponent.findByPk(id, {include: [
        { model: Attribute }, { model: MachineType }
    ]});
}

export const savePhysicalComponent = async (pComponent: IPhysicalComponent): Promise<PhysicalComponent | null> => {

    const machineType: MachineType | null = await MachineType.findOne({ where: {machineTypeId: pComponent.machineType.machineTypeId }})
    const arrayAttributes: Attribute[] = [];
    if (pComponent.attributes) {

        for (let i = 0; i < pComponent.attributes.length; i++) {
            const attribute: Attribute | null = await saveAttribute(pComponent.attributes[i])
            if (!attribute) return null;
            arrayAttributes.push(attribute);
        }
    };

    const newPhysicalComponent: PhysicalComponent = new PhysicalComponent({...pComponent});
    const saved: PhysicalComponent = await newPhysicalComponent.save();

    if (!machineType) return null;
    await saved.$set<MachineType>('machineType', machineType)
    await saved.$add<Attribute>('attributes', arrayAttributes);

    return saved;
}

export const editPhysicalComponent = async (id: string, physicalComp: IPhysicalComponent): Promise<PhysicalComponent | null> => {
    let updatePhysicalComp: PhysicalComponent | null = await PhysicalComponent.findByPk(id);
    if (!physicalComp.attributes) throw 'No tiene atributos';
    const attributes: IAttribute[]= physicalComp.attributes;
    const arrayAttributes: Attribute[] = [];
    const arrayPromise: Promise<Attribute | null>[] = [];

    attributes.forEach(async (attribute, index) => {
        arrayPromise.push(new Promise<Attribute | null>((resolve, reject) => {
            if (!attribute.attributeId) {
             
                const attrib: Promise<Attribute | null> = saveAttribute(attribute);
             
                if (!attrib) reject(null);
                attrib.then((value: Attribute | null) => {
                    if (!value) return null;
                    arrayAttributes.push(value);
                    resolve(attrib);
                }, (err: any) => {
                    reject(err);
                });
            } else {
            
                const attrib: Promise<Attribute | null> = editAttribute(attribute);
                if (!attrib) reject(null);
                attrib.then((value: Attribute | null) => {
                    if (!value) return null;
                    arrayAttributes.push(value);
                    resolve(attrib);
                }, err => {
                    reject(err);
                })
            }
        }))
    })

    Promise.all(arrayPromise).then(async () => {
        if (!updatePhysicalComp) return null;
        await updatePhysicalComp.update(physicalComp);
        await updatePhysicalComp.$set<Attribute>('attributes', arrayAttributes);
    });

    return updatePhysicalComp;
}

export const deletePhysicalComponent = async (id: number): Promise<number | null> => {
    return PhysicalComponent.destroy({ where: { physicalComponentId: id } });
}

export const findOrCreateEmptyPC = async (): Promise<PhysicalComponent> => {
    let physicalComp: PhysicalComponent | null = await PhysicalComponent.findOne({ where: {name: 'Componente Físico Desconocido'}}); 
    if (!physicalComp) {
        const pComponentNull: PhysicalComponent = new PhysicalComponent ({
            name: 'Componente Físico Desconocido'
        })
        return pComponentNull.save();
    }
    return physicalComp;
}
