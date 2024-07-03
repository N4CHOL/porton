import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

import { Brand, IBrand } from '../models/brand.model';
import { AssetModel, IAssetModel } from '../models/asset-model.model';

import * as brandService from '../services/brand.service';

export const getBrands = async (req: Request, res: Response) => {
    let brands: IBrand[] = await brandService.getBrands();
    res.status(200).json(brands);
}


export const getBrand = async (req: Request, res: Response) => {
    let brandId: number | null = req.params.id ? Number(req.params.id) : null;

    if (!brandId) return res.status(400).send();

    brandService.getBrand(brandId).then((val: Brand | null) => {
        if (!val) return res.status(400).send({ message: 'La marca no existe' });

        return res.status(200).send(val);
    }, (rej: any) => {

        return res.status(500).send(rej);
    });
}


export const postBrand = async (req: Request, res: Response) => {
    const brand: IBrand = req.body;

    brandService.saveBrand(brand).then((val: Brand) => {
        return res.status(200).send({ brand: val });
    }, (rej: any) => {
        return res.status(500).send(rej);
    });
}

// ERROR DE UnhandledPromiseRejectionWarning
// export const updateBrand = async (req: Request, res: Response) => {
//     let brandId: number | null = req.params.id ? Number(req.params.id) : null;
//     let update: IBrand = req.body;

//     if (!(brandId && update)) {
//         return res.status(400).send();
//     }

//     brandService.updateBrand(brandId, update).then((val: [number, Brand[]]) => {
//         if (!val[0]) return res.status(400).send();
//         return res.status(200).send(val[1][0]);
//     });
// }


export const updateBrand = async (req: Request, res: Response) => {
    let brandId: number | null = req.params.id ? Number(req.params.id) : null;
    let update: IBrand | null = req.body;

    if (!(brandId && update)) {
        return res.status(400).send();
    }

    brandService.updateBrand(brandId, update).then((val: [number, Brand[]]) => {
        if (!val[0]) return res.status(400).send();
        return res.status(200).send(val[1][0]);
    });
}


export const deleteBrand = async (req: Request, res: Response) => {
    let brandId: number | null = req.params.id ? Number(req.params.id) : null;
    
    if (!brandId) return res.status(400).send();
    
    brandService.deleteBrand(brandId).then(()=>{
        return res.status(200).send();
    },(rej:any)=>{
        return res.status(500).send(rej);
    })
}