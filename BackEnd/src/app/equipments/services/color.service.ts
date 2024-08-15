import { AssetModel } from '../models/asset-model.model';
import { Color } from '../models/color.model';

export const getColorsByModel = async (assetModelId: number): Promise<Color[]> => {
    return Color.findAll({
        where: { assetModel_id: assetModelId }
    })
}

export const getColors = async (): Promise<Color[]> => {
    return Color.findAll();
}