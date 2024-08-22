import { AssetModel, IAssetModel } from '../models/asset-model.model';
import { Brand } from '../models/brand.model';
import { Color } from '../models/color.model';
import { MachineType } from '../models/machine-type.model';
import * as machineTypeSrv from './machine-type.service';

export const getAllModels = async (): Promise<AssetModel[]> => {
    return AssetModel.findAll();
}

export const getModelsByBrandId = async (brandId: number): Promise<AssetModel[]> => {
    return AssetModel.findAll({
        include: [
            {
                model: Brand,
                where: {
                    brandId: brandId
                }
            },
            {
                model: Color,
            }, {
                model: MachineType
            }]
    });
}

export const getModel = async (modelId: number): Promise<AssetModel | null> => {

    return AssetModel.findByPk(modelId, { include: [Brand, MachineType, Color] });
}

export const saveModel = async (model: IAssetModel): Promise<AssetModel | null> => {
    const brand: Brand | null = await Brand.findByPk(model.brand.brandId);
    if (!model.machineType) return null;
    const machineType: MachineType | null = await MachineType.findByPk(model.machineType.machineTypeId);
    const arrayColors: Color[] = [];
    if (model.colors) {
        for (let i = 0; i < model.colors.length; i++) {
            const color: Color | null = await Color.findByPk(model.colors[i].colorId);
            if (!color) return null;
            arrayColors.push(color);
        }
    }
    if (!brand || !machineType) return null;
    const assModel: AssetModel = new AssetModel({...model});
    const saved: AssetModel = await assModel.save()
    await saved.$set<Brand>('brand', brand);
    await saved.$set<MachineType>('machineType', machineType);
    await saved.$add<Color>('color', arrayColors);
    return saved;
}

// export const updateModel = async (assetId: number, model: IAssetModel): Promise<[number, AssetModel[]]> => {

//     return AssetModel.update(model, { where: { assetModelId: assetId }, returning: true });
// }

export const updateModel = async (assetId: number, model: IAssetModel): Promise<AssetModel | null> => {
    let updateAssetModel: AssetModel | null = await AssetModel.findOne({ where: { assetModelId: assetId } });
    if (!model.machineType || !model.colors) return null;
    const machineType: MachineType | null = await MachineType.findByPk(model.machineType.machineTypeId);
    const arrayColors: Color[] = [];
    for (let i = 0; i < model.colors.length; i++) {
        const color: Color | null = await Color.findByPk(model.colors[i].colorId);
        if (!color) return null;
        arrayColors.push(color);
    }
    if (!updateAssetModel || !machineType || !arrayColors) return null;
    await updateAssetModel.update(model);
    await updateAssetModel.$set<MachineType>('machineType', machineType);
    await updateAssetModel.$set<Color>('colors', arrayColors);
    // return AssetModel.update(model, { where: { assetModelId: assetId } });
    return updateAssetModel;
}

export const deleteModel = async (assetId: number): Promise<void> => {
    const assetDel = await AssetModel.findByPk(assetId);
    return assetDel?.destroy();
}

export const createEmptyModel = async (): Promise<AssetModel> => {
    const emptyMachineType: MachineType = await machineTypeSrv.findOrCreateEmptyMachineType();
    if (!emptyMachineType) throw 'No se pudo obtener el tipo de máquina desconocida';
    const newModel: AssetModel = new AssetModel({
        name: 'Modelo desconocido',
    });
    await newModel.save();
    await newModel.$set<MachineType>('machineType', emptyMachineType);
    if (!newModel) throw 'no se pudo crear el modelo desconocido';
    return newModel.save();
}