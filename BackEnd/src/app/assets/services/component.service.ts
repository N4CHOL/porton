import { Asset } from "../models/asset.model";
import * as assetService from '../services/asset.service';
import * as spareComponentService from '../services/spare-component.service';
import { Composite, IComposite } from "../models/composite.model";
import { SpareComponentHistory } from "../models/spare-component-history.model";
import { CompositeComponent } from "../models/composite-component.model";
import sequelize from "sequelize";
import { PhysicalComponent } from "../models/physical-component.model";
import { Attribute } from "../models/attribute.model";

export const getComponentById = async (id: number | undefined): Promise<Composite | null> => {

    return Composite.scope('full').findByPk(id);

}

export const getComponentByTag = async (tag: string): Promise<Composite | null> => {
    let component: Composite | null = await Composite.scope(['full', 'hasChildren']).findOne({
        where: { tag: tag }, include: [{ model: PhysicalComponent, include: [{ model: Attribute }] }, { model: Asset, required: false }]
    });
    if (!component) return null;

    return component;
}

export const saveComponent = async (comp: IComposite, parentTag: string): Promise<Composite | null> => {
    let parentAssetTag;
    //Check if parent exists
    let physicalComp: PhysicalComponent | null = await PhysicalComponent.findByPk(comp.physicalComponent?.physicalComponentId);
    let parent: Composite | Asset | null = await getComponentByTag(parentTag);

    if (parent) {
      
        //Verifica si el componente tiene asociado un activo. De lo contrario, es un subcomponente
        if (!parent.asset) {
            parentAssetTag = parent.parentAssetTag;
        } else {
            parentAssetTag = parent.asset.tag
        }

    
    } else {
   
        parent = await assetService.findAssetByTag(parentTag);
        parentAssetTag = parent?.tag;
       
    }

    if (!parent || !parentAssetTag) return null;
    const newComp: Composite = new Composite({...comp});
    newComp.parentAssetTag = parentAssetTag;

    let savedComp: Composite = await newComp.save();


    const history = await new SpareComponentHistory().save();
    await savedComp.$set<SpareComponentHistory>('history', history);
    await parent.$add<Composite>('components', newComp);
    if (physicalComp) {
        await newComp.$set<PhysicalComponent>('physicalComponent', physicalComp)
    }
    await spareComponentService.replaceSpareComponentByTag({ dateInstalled: new Date() }, savedComp.tag);

  
    return savedComp;
}

export const getComponentChildrenByTag = async (tag: string): Promise<Composite[] | null> => {
    let result: Composite[] | null = await Composite.scope(['lean', 'hasChildren']).findAll({
        include: [
            {
                model: Composite,
                as: 'parent',
                where: {
                    tag: tag
                }
            }]
    })
    // Verifica si es un component o un asset
    if (!result || result.length < 1) {
        result = await Composite.scope(['lean', 'hasChildren']).findAll({
            include: [
                {
                    model: Asset,
                    where: {
                        tag: tag
                    }
                }]
        })
    }
    return result;
}

export const editComponent = async (tag: string, comp: IComposite): Promise<Composite | null> => {
    let result: Composite | null = await Composite.findOne({ where: { tag: tag } });
    // let physicalComp: PhysicalComponent | null = await PhysicalComponent.findByPk(comp.physicalComponent?.physicalComponentId);

    // if (!result || !physicalComp) return null;
    if (!result) return null;
    result.set({ tag: comp.tag, name: comp.name });
    // result.$set<PhysicalComponent>('physicalComponent', physicalComp);

    return result.save();
}

export function deleteComponent(id: number) {
    return Composite.destroy({ where: { compositeId: id } });
}

export const getComponentsByString = async (substring: string, assetId: string): Promise<Composite[] | null> => {
    const asset: Asset | null = await Asset.findOne({ where: { assetId: assetId } })
    if (!asset) return null;
    let tag: string = asset.tag;

    // return Asset.findAll({ where: { [Op.or]: [{ serialNumber: { [Op.like]: `%${term}%` } }, { tag: { [Op.like]: `%${term}%` } }] } });
    let result: Composite[] | null = await Composite.findAll(
        {
            where: {
                [sequelize.Op.and]: [{
                    name: {
                        [sequelize.Op.iLike]: '%' + substring + '%'
                    }
                },
                { parentAssetTag: tag }
                ]
            },
            // attributes: ['name', 'tag'],
            // include: [{
            //     model: Composite, attributes: ['name', 'tag'],
            //     as: 'components'
            // }]
        });

    if (!result) return null;
    return result;
}

// Identico al metodo anterior, no usa un substring para filtrar
export const getAllComponentChildren = async (tag: string): Promise<Composite[] | null> => {
    const asset: Asset | null = await Asset.findOne({ where: { tag: tag } })
    if (!asset) return null;

    // return Asset.findAll({ where: { [Op.or]: [{ serialNumber: { [Op.like]: `%${term}%` } }, { tag: { [Op.like]: `%${term}%` } }] } });
    let result: Composite[] | null = await Composite.findAll(
        {
            where: {            
                parentAssetTag: tag 
            }                
        },
    );

    if (!result) return null;
    return result;
}

export const getAllComponents = async (): Promise<Composite[]> => {
    try {
        return Composite.findAll({
            include: [
                {
                    model: PhysicalComponent
                }
            ]
        });
    } catch (e) {
        return Promise.reject(e);
    }
}