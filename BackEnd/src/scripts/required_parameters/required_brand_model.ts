import * as brandSrv from '../../app/equipments/services/brand.service';
import * as modelSrv from '../../app/equipments/services/asset-model.service';
import { Brand } from '../../app/equipments/models/brand.model';

export const initRequiredBrand = async () => {
    await brandSrv.findOrCreateEmptyBrand();
    await brandSrv.createEmptyModelBrand();
}