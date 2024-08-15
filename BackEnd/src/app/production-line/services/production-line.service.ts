import { PaginatedResponse } from "../../shared/classes/paginated-response";
import { IProductionLine, ProductionLine } from "../models/production-line.model";
import * as pagination from '../../shared/helpers/pagination';
import { Asset, IAsset } from "../../assets/models/asset.model";
import * as assetSrv from "../../assets/services/asset.service"
import ProductionLineAsset from "../models/production-line-asset.model";

export const findAllProductionLines = (): Promise<ProductionLine[]> => {
    return ProductionLine.findAll();
}

export const findProductionLineWithAssets = async (
    productionLineId: number): Promise<ProductionLine | null> => {
    return ProductionLine.findOne({
        where: {productionLineId: productionLineId},
        include: ['assets'
            
            // {
            //     required: false,
            //     model: ProductionLineAsset,
            //     // where: {productionLine_id : productionLineId},
            //     include:[
            //         {
            //         required: false,
            //         model: Asset,
            //         // where: {assetId : assetd}
            //         }
            //     ]
            // }
        ]
    });
}

export const getProductionLinesPage = async (page: number, limit: number): Promise<PaginatedResponse<ProductionLine>> => {
    const findOptions = pagination.getFindOptions(page, limit);
    return ProductionLine.findAndCountAll({
        distinct: true,
        limit: findOptions.limit,
        offset: findOptions.offset,
        include:{ 
            required: false,
            model: Asset
            }
    }).then(
        (result: { rows: ProductionLine[]; count: number; }) => {
            return new PaginatedResponse<ProductionLine>(result.rows, result.count, limit, page, Math.ceil(result.count / limit));
        })
}

export const findProductionLineById = async (productionLineId: number): Promise<ProductionLine | null> => {
    return ProductionLine.findByPk(productionLineId)
}

export const saveProductionLine = async (productionLine: IProductionLine): Promise<ProductionLine> => {
    const newProductionLine: ProductionLine = new ProductionLine({...productionLine});
    
    try {
        //Guardar Assets

        const assetsPromises: Promise<Asset | null>[] = [];
        // let assets: (Asset | null)[] = [];
        productionLine.assets?.forEach(
            async (asset: IAsset) => {

                // No es necesario guardar, ya que ningun dato de asset es modificado
                // assetsPromises.push(assetSrv.saveAsset(asset))

                if (asset.assetId) assetsPromises.push(assetSrv.getAsset(asset.assetId))

            }
        );
   

        let saveProductionLine: ProductionLine = await newProductionLine.save();

        
        // assets = await Promise.all(assetsPromises)
        await Promise.all(assetsPromises).then((val: (Asset|null)[]) => {

            const assetsFound: Asset[] = val.filter<Asset>((asset: Asset|null): asset is Asset => {
                return asset !== null;
            })
            if (productionLine) saveProductionLine.$set<Asset>('assets', assetsFound)
        });
        
        // await saveProductionLine.$set<Asset>('assets', assets)

        return saveProductionLine;
    
    } catch (e) {
    
        return Promise.reject(e)
    }
}

export const updateProductionLine = async (productionLineId: number, productionLine: IProductionLine): Promise<ProductionLine> => {
    try {
        const prodLine: ProductionLine | null = await ProductionLine.findOne({ where: { productionLineId: productionLineId} });
        if (!prodLine) throw 'No existe Linea de Produccion';
        
        prodLine.update(productionLine)

        // Cambiar Activos
        
        
        const arrayAssets: Asset[] = [];
        const arrayPromise: Promise<Asset | null>[] = []
        
        if (productionLine.assets) {
     
            const assets: IAsset[] = productionLine.assets;
            assets.forEach(async (asset) => {
            arrayPromise.push(new Promise<Asset | null>((resolve, reject) => {
                if (!asset.assetId) {
                  
                    const assetSaved: Promise<Asset | null> = assetSrv.saveAsset(asset);
                    if (!assetSaved) throw 'No se pudo guardar el asset';
                    assetSaved.then((value: Asset | null) => {
                        if (!value) throw 'null';
                        arrayAssets.push(value);
                        resolve(assetSaved);
                    }, err => {
                        reject(err);
                    })
                } else {
         
                    const assetEdited: Promise<Asset | null> = assetSrv.editAsset(asset.assetId, asset);
                    if (!assetEdited) throw 'No se pudo encontrar el asset para editar';
                    assetEdited.then((value: Asset | null) => {
                        if (!value) throw 'null';
                        arrayAssets.push(value);
                        resolve(assetEdited)
                    }, err => {
                        reject(err);
                    })
                }
            }))
        });
    
        await Promise.all(arrayPromise).then(async () => {
   
            await prodLine.$set<Asset>('assets', arrayAssets)
        })
        }
        const editedProdLine = await prodLine.save();
     
        return editedProdLine
        // const updateProductionLine: ProductionLine | null = await ProductionLine.findOne({ where: { productionLineId: productionLineId} });
        // if (updateProductionLine) {
        // updateProductionLine = updateProductionLineValues(updateProductionLine, update)
        // //TODO: Cuando se agreguen assets, incorporar chequeo aca
        

        // return updateProductionLine.save();
        // } else {
        //     return null;
        // }
    } catch (e) {
        return Promise.reject(e)
    }
}

export const deleteProductionLine = async (productionLineId: number): Promise<number> => {
    return ProductionLine.destroy({ where: { productionLineId: productionLineId} })
}

const updateProductionLineValues = (original: ProductionLine, target: IProductionLine) => {
    let originalP: ProductionLine = original;
    originalP.name = target.name ? target.name : originalP.name;
    originalP.description = target.description ? target.description : originalP.description;
    return original
}