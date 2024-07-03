import { Asset, IAsset } from '../models/asset.model';
import * as pagination from '../../shared/helpers/pagination';
import { PaginatedResponse } from '../../shared/classes/paginated-response';
import { AssetModel } from '../../equipments/models/asset-model.model';
import { Brand } from '../../equipments/models/brand.model';
import { MachineType } from '../../equipments/models/machine-type.model';
import { Color } from '../../equipments/models/color.model';
import { PurchaseData } from '../models/purchaseData.model';
import { savePurchaseData, editPurchaseData, deletePurchaseData } from './purchaseData.service';
import { Provider } from '../../provider/model/provider.model';

import { Composite } from '../models/composite.model';
import { Op } from 'sequelize';

export const getAsset = async (id: number | undefined): Promise<Asset | null> => {
    return Asset.findByPk(id, {
        include: [
            {
                model: AssetModel,
                include: [
                    { model: Brand },
                    { model: MachineType }
                ]
            },
            {
                model: PurchaseData,
                include: [
                    { model: Provider }]
            },
            { model: Color },
            { model: MachineType },
            { model: Brand }
        ]
    });
}

export const getAssets = async (term: string): Promise<Asset[]> => {
    return Asset.findAll({ where: { [Op.or]: [{ serialNumber: { [Op.like]: `%${term}%` } }, { tag: { [Op.like]: `%${term}%` } }] } });
}

export const getAssetsNonPaginated = async (): Promise<Asset[]> => {
    try {
        // return Asset.findAll({ where: { [Op.or]: [{ serialNumber: { [Op.like]: `%${term}%` } }, { tag: { [Op.like]: `%${term}%` } }] } });
        return Asset.findAll();
    } catch (e) {

        return Promise.reject(e);
    }
}


// TODO Metodo temporal
export const getAssetsWO = async (): Promise<Asset[]> => {
    return Asset.findAll();
}


export const getAssetsPage = async (page: number, limit: number): Promise<PaginatedResponse<Asset>> => {
    const findOptions = pagination.getFindOptions(page, limit)

    return Asset.findAndCountAll({
        include: [{
            model: AssetModel,
            include: [{ model: Brand }]
        },
        { model: PurchaseData }],
        limit: findOptions.limit,
        offset: findOptions.offset
    }).then(
        (result: { rows: Asset[]; count: number; }) => {

            return new PaginatedResponse<Asset>(result.rows, result.count, limit, page, Math.ceil(result.count / limit));
        })
}

export const saveAsset = async (asset: IAsset): Promise<Asset | null> => {
    // Verificar si name y tag están presentes
    if (!asset.name || !asset.tag) {
        return null;
    }

    // Verificar si purchaseData existe y guardarla si está presente
    let purchaseData: PurchaseData | null = null;
    if (asset.purchaseData) {
        purchaseData = await savePurchaseData(asset.purchaseData);
        if (!purchaseData) {
            return null;
        }
    }

    // Verificar y obtener assetModel si existe
    let assModel: AssetModel | null = null;
    
    if (asset.assetModel && asset.assetModel.assetModelId) {
        assModel = await AssetModel.findByPk(asset.assetModel.assetModelId);
        if (!assModel) {
            return null;
        }
    }

    // Verificar y obtener assetBrand si existe
    let assBrand: Brand | null = null;
    if (asset.brand && asset.brand.brandId) {
        assBrand = await Brand.findByPk(asset.brand.brandId);
        if (!assBrand) {
            return null;
        }
    }

    // Obtener assColor si existe
    const assColor: Color | null = asset.color?.colorId ? await Color.findByPk(asset.color.colorId) : null;

    // Crear una nueva instancia de Asset
    const newAsset: Asset = new Asset({ ...asset });
    console.log(newAsset, asset);
    
    // Asignar los valores a la nueva instancia
    const saved: Asset = await newAsset.save();
    if (assModel) {
        saved.$set<AssetModel>('assetModel', assModel);
    }
    if (assColor) {
        saved.$set<Color>('color', assColor);
    }
    if (purchaseData) {
        saved.$set<PurchaseData>('purchaseData', purchaseData);
    }

    if (assBrand) {
        saved.$set<Brand>('brand', "1");
    }

    return saved;
}


export const editAsset = async (id: number, asset: IAsset): Promise<Asset | null> => {
    let update: Asset | null = await Asset.findByPk(id, { include: [{ model: MachineType }, { model: AssetModel }] });
    if (!update) return null;

    // Verifica si assetModel existe y si es diferente en comparación con la actualización
    if (asset.assetModel && (!update.assetModel || update.assetModel.assetModelId !== asset.assetModel?.assetModelId)) {
        const newAssetModel: AssetModel | null = await AssetModel.findByPk(asset.assetModel?.assetModelId);
        if (!newAssetModel) return null;
        await update.$set<AssetModel>('assetModel', newAssetModel);
    }

      // Verifica si assetBrand existe y si es diferente en comparación con la actualización
      if (asset.brand && (!update.brand || update.brand.brandId !== asset.brand?.brandId)) {
        const newAsseBrand: Brand | null = await Brand.findByPk(asset.brand?.brandId);
        if (!newAsseBrand) return null;
        await update.$set<Brand>('brand', newAsseBrand);
    }

    // Verifica si purchaseData existe y si es diferente en comparación con la actualización
    if (asset.purchaseData && (!update.purchaseData || update.purchaseData.purchaseDataId !== asset.purchaseData?.purchaseDataId)) {
        const newPurchaseData: PurchaseData | null = await editPurchaseData(asset.purchaseData);
        if (!newPurchaseData) return null;
        await update.$set<PurchaseData>('purchaseData', newPurchaseData);
    }

    // Resto del código para actualizar asset.color y otras propiedades...

    update.set(asset);
    await update.update(asset);

    const saved: Asset = await update.save();
    return saved;
}

export const deleteAsset = async (id: number): Promise<number> => {

    // await deletePurchaseData(deleteAsset.assetId);
    return Asset.destroy({ where: { assetId: id } });
}
export function findAssetByTag(tag: string): Promise<Asset | null> {
    return Asset.findOne({ where: { tag: tag } })
}

