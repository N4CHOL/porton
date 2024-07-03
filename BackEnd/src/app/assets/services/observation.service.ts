import { Profile } from "../../profile/models/profile.model";
import * as pagination from '../../shared/helpers/pagination';
import { User } from "../../user/models/user.model";
import { Asset } from "../models/asset.model";
import { Composite } from "../models/composite.model";
import { IObservation, IObservationQuery, Observation } from "../models/observation.model";
import { SpareComponentHistory } from "../models/spare-component-history.model";
import { SpareComponent } from "../models/spare-component.model";
import * as assetService from '../services/asset.service';
import * as SPCHService from '../services/spare-component-history.service'
import * as profileService from '../../profile/services/profile.service'
import  * as worStateService from "../services/worstate.service";
import { Category } from "../../shared/models/category.model";
import { PaginatedResponse } from "../../shared/classes/paginated-response";
import { WorState } from "../models/worstate.model";

export const getWorkOrderRequestsPaginated = async (page: number, limit: number): Promise<PaginatedResponse<Observation>> => {
 
    const findOptions = pagination.getFindOptions(page, limit)

    return Observation.findAndCountAll({
        order: [
            ['observationId', 'ASC'],
            // ['name', 'ASC'],
        ],
        include: [{   
                model: Asset
            },
            {
                model: SpareComponent,
                include: [
                    {
                        model: SpareComponentHistory,
                        include: [
                            {
                                model: Composite,
                            }
                        ]                            
                    }
                ]
            },
            {   
                model: Category
            },
            {   
                required: true,
                model: Profile.scope('noUser'),
            },
            {
                model: WorState,
                where: { name: 'SOLICITADA' }
            }
        ],
        limit: findOptions.limit,
        offset: findOptions.offset
    }).then(
        (result: { rows: Observation[]; count: number; }) => {
       
            return new PaginatedResponse<Observation>(result.rows, result.count, limit, page, Math.ceil(result.count / limit));
        })
}

export const getWorkOrderRequest = async (workOrderRequestId: number): Promise<Observation | null> => {
    const WOR = await Observation.findOne({
        where: {observationId: workOrderRequestId},
        include: [{
                model: Asset
            },
            {
                model: SpareComponent,
                include: [
                    {
                        model: SpareComponentHistory,
                        include: [
                            {
                                model: Composite,
                            }
                        ]                            
                    }
                ]
            },
            {
                required: true,
                model: Profile
            },
            {
                model: Category
            }
        ]
    })

    return WOR
}

export const getAssets = async (term: string): Promise<Asset[]> => {
    return assetService.getAssets(term);
}


export const getObservationsByAsset = async (
    assetId: string,
): Promise<Observation[] | null> => {
    try {
        return Observation.findAll({
            include:[
                {
                    required: true,
                    model: Asset,
                    where: {assetId: assetId}
                }
            ]
        })
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getObservationsByComponent = async (
    parentId: string,
    // parentAssetTag: string | null,
): Promise<Observation[] | null> => {
    const parentAsset: Asset | null = await Asset.findByPk(parentId)
    let parentAssetTag: string = '';
    if(parentAsset){
        parentAssetTag = parentAsset?.tag

    } else {
     
    }
    try {
      
        return Observation.findAll({
            // include:[
            //     {
            //         required: true,
            //         model: Composite,
            //         where: {parentAssetTag: parentAssetTag},
            //         include: [
            //             {
            //                 required: true,
            //                 model: SpareComponentHistory,
            //                 include: [
            //                     {
            //                         required: true,
            //                         model: SpareComponent
            //                     }
            //                 ]                            
            //             }
            //         ]
            //     }
            // ]
            include:[
                {
                    required: true,
                    model: SpareComponent,
                    include: [
                        {
                            required: true,
                            model: SpareComponentHistory,
                            include: [
                                {
                                    required: true,
                                    model: Composite,
                                    where: {parentAssetTag: parentAssetTag}
                                }
                            ]                            
                        }
                    ]
                }
            ]
        })
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getComponentParent = async (parentTag: string): Promise<Asset | null> => {
 
    let parentAsset: Asset | null = await Asset.findOne({ where: {tag: parentTag}})

    return parentAsset;
}

export const saveObservation = async (obs: IObservationQuery): Promise<Observation | null> => {
    const categoriesPromises: Promise<Category | null>[] = [];
    //Asignarle Categorías
    let categories: (Category | null)[] = [];
    obs.categories?.forEach(
        async (element: Category) => {
            const categ: Promise<Category | null> = Category.findByPk(element.categoryId);
            if (!categ)
                throw 'No se encontró la categoría';
            categoriesPromises.push(categ);
    });
    categories = await Promise.all(categoriesPromises)
    let asset: Asset | null = null
    if (obs.asset) asset = await Asset.findOne({ where: { assetId: obs.asset.assetId }})
    // const asset: Asset | null = await Asset.findOne({ where: { assetId: obs.asset.assetId }})
    let component: Composite | null = null
    if (obs.component) component = await Composite.findOne({ where: { compositeId: obs.component?.compositeId}})
    let spareName: SpareComponent | null = null
    if (obs.component) {
        asset = null; // Si no se setea en null se guardan ambos parametros (Asset y Componente) y confunde los Scopes
        if (!component) throw 'No se encontro un componente en la observacion'
        const newSpare: SpareComponentHistory | null = await SPCHService.getSpareComponentbyComponentId(component)
        if (!newSpare) throw ' No se encontro el historial de componentes'
        spareName = newSpare.spareComponents[0]
    } else {
      
    }
    if (!obs.responsible) throw 'No existe el responsable de la observacion'
    const responsible: Profile | null = await profileService.findProfileByUserId(obs.responsible.userId)
    const newObservation: Observation = new Observation({...obs});
    const saved: Observation = await newObservation.save();
    // if(!asset) return null;
    
    //Comienza a guardar, siempre registrando a un responsable, y excluyentemente un asset o un spare
    if (responsible) {
        await saved.$set<Profile>('responsible', responsible)
    } else { 

    }

    // Verificar que la promesa de Categorias se haya cumplido antes de guardar
    await  Promise.all(categories).then((val: (Category|null)[])=>{
        const categoriesFound: Category[] = val.filter<Category>((cat: Category|null): cat is Category=>{
            return cat !== null;
        })
        if(obs) saved.$add<Category>('categories',categoriesFound);
    })

    if (obs.component && spareName) {
  
        await saved.$set<SpareComponent>('spare', spareName)
    }

    if (obs.asset) {
    
        await saved.$set<Asset>('asset', asset)
    }

    if (!obs.asset && !obs.component) {
     
    }

    // Definir estado, por defecto 'Solicitada', cuando aumente en complejidad, deberia tener su propia State Machine
    try {
        const state: WorState | null = await worStateService.findState('solicitada')
        if (!state) throw 'No se encontro el estado de la observacion';
     
        await saved.$set<WorState>('state', state)
  
    } catch (e) {
      
    }

    return saved
}

export const discardWOR = async (obsId: string): Promise<Observation> => {
    try {
        let obs: Observation | null = await Observation.findByPk(obsId)
        if (!obs) throw 'No existe observacion'
        const state: WorState | null = await worStateService.findState('descartada')
        if (!state) throw 'No se encontro el estado de la observacion';

        await obs.$set<WorState>('state', state)
  
        const saved: Observation = await obs.save();
        return saved
    } catch (e) {
 
        return Promise.reject(e)
    }
}

export const promoteWOR = async (obsId: string): Promise<Observation> => {
    try {
        let obs: Observation | null = await Observation.findByPk(obsId)
        if (!obs) throw 'No existe observacion'
        const state: WorState | null = await worStateService.findState('promovida')
        if (!state) throw 'No se encontro el estado de la observacion';
   
        await obs.$set<WorState>('state', state)
   
        const saved: Observation = await obs.save();
        return saved
    } catch (e) {
     
        return Promise.reject(e)
    }
}