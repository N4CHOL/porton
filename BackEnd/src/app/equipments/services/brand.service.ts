import { Provider } from '../../provider/model/provider.model';
import { AssetModel } from '../models/asset-model.model';
import { Brand, IBrand } from '../models/brand.model';
import * as assetModelSrv from './asset-model.service';

export const getBrands = async (): Promise<Brand[]> => {
    return Brand.findAll({include: [{model: Provider}, {model: AssetModel}] });
}

export const getBrand = async (brandId: number) => {
    return Brand.findOne({ where: { brandId: brandId }
    });
}

export const saveBrand = async (brand: IBrand): Promise<Brand> => {
    const newBrand: Brand = new Brand({...brand});
    return newBrand.save();
}

export const updateBrand = async (brandId: number, brand: IBrand): Promise<[number, Brand[]]> => {

    return Brand.update(brand, { where: { brandId: brandId }, returning: true });
}
//TODO: Cambiar Update Brands por el nuevo metodo en Provider, Assets, etc. (FUTURE PROOFING)

export const deleteBrand = async (brandId: number): Promise<void> =>{
    const brandDel: Brand | null = await Brand.findByPk(brandId);

    return brandDel?.destroy();
}

export const findOrCreateEmptyBrand = async (): Promise<Brand> => {
    let brand: Brand | null = await Brand.findOne({where: {name: 'Marca Desconocida'}});

    if (!brand) {
        const newBrand: Brand = new Brand({
            name: 'Marca Desconocida',
        });
        const model: AssetModel | null = await assetModelSrv.createEmptyModel();
        if (!model) throw 'La marca no recibió el modelo desconocido';
        await newBrand.save();
        await newBrand.$set<AssetModel>('assetModels', model);
        return newBrand;
    } else {
        return brand;
    }
}

export const createEmptyModelBrand = async () => {
    const brands: Brand[] | null = await getBrands();

    brands.forEach(async (brand: Brand) => {
   
        const emptyModel = brand.assetModels.find(assetModel => assetModel.name == 'Modelo desconocido');
     
        if (!emptyModel) {
         
            const newEmptyModel = await assetModelSrv.createEmptyModel();
            brand.$add<AssetModel>('assetModels', newEmptyModel);
            brand.save();
        }
    })
}