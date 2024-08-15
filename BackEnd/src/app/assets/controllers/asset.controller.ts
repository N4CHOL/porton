import { Request, Response } from 'express';
import * as assetService from '../services/asset.service';
import { check, validationResult } from 'express-validator';
import { Asset } from '../models/asset.model';


export const getAsset = (req: Request, res: Response) => {
    const assetId = Number(req.params.id);
    assetService.getAsset(assetId).then(
        (value: any | null) => {
            if (!value) {
                return res.status(404).json(`The requested asset doesn't exist`);
            }
            return res.status(200).json(value);
        },
        (err: any) => {
     
            return res.status(500).json(err);
        })
}

export const getAssetsNonPaginated = async (req: Request, res: Response) => {
    try {
     
        assetService.getAssetsNonPaginated().then((assets: Asset[]) => {
            return res.status(200).send (assets);
        });
    } catch (e) {
     
        return res.status(500).send(e);
    }
}


export const getAssetsByName = (req: Request, res: Response) => {
    const term = req.params.term;
    assetService.getAssets(term).then()
}

export const getAssets = (req: Request, res: Response) => {

    const page: number = req.query.page ? Number(req.query.page) : 0;
    const limit: number = req.query.limit ? Number(req.query.limit) : 10;


    assetService.getAssetsPage(page, limit).then(
        (pagedAssets: any) => {
     
            return res.status(200).send(pagedAssets);
        },
        (error: any) => {
            return res.status(500).send(error);
        })
}


// TODO Metodo temporal
export const getAssetsWO = async (req: Request, res: Response) => {
    await assetService.getAssetsWO().then((assets: Asset[]) => {
        return res.status(200).send(assets)      
    })
}

export const putAsset = async (req: Request, res: Response) => {
    const assetId = Number(req.params.id);
    const errors = await checkErrors(req);

    if (!errors.isEmpty()) {
        return res.status(401).json(errors);
    }
    // assetService.editAsset(assetId, req.body).then((val: [number, Asset[]]) => {
    assetService.editAsset(assetId, req.body).then((val: Asset | null) => {
        // if (!val[0]) {
        if (!val) {
            return res.status(400).json(`The requested asset doesn't exist`);
        }
        // return res.status(200).json(val[1][0])
        return res.status(200).json(val)
    }, (error: any) => {
        return res.status(500).json(error);
    })
}


export const postAsset = async (req: Request, res: Response) => {
    const errors = await checkErrors(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    assetService.saveAsset(req.body).then((asset: Asset | null) => {
        if (!asset) return res.status(401).send({ message: 'Error en la solicitud' })
        return res.status(201).json(asset);
    }, (error: any) => {

        return res.status(500).json(error);
    })
}

export const deleteAsset = async (req: Request, res: Response) => {
    const assetId: number = Number(req.params.id);
    assetService.deleteAsset(assetId).then((ass: any | null) => {
        if (ass) {
            return res.status(200).json(ass);
        } else {
            return res.status(404).json(new Error('Asset not found'))
        }
    }, (rej: any) => {
        return res.status(500).json(rej);
    })
}

const checkErrors = async (req: Request) => {
    await check(['tag']).not().isEmpty().run(req);
    return validationResult(req);
}