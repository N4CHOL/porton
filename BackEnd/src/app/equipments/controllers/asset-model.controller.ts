import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

import * as assetModelService from '../services/asset-model.service';
import { AssetModel, IAssetModel } from '../models/asset-model.model';

export const getAllModels = async (req: Request, res: Response) => {
    assetModelService.getAllModels().then((val: AssetModel[]) => {
        return res.status(200).send(val);
    }, (rej: any) => {
        return res.status(400).send(rej);
    }).catch((reason: any) => {
        return res.status(500).send(reason);
    });
}

export const getModels = async (req: Request, res: Response) => {
    let brandId: number | null = req.params.brand ? Number(req.params.brand) : null;

    if (brandId) {
        assetModelService.getModelsByBrandId(brandId).then(
            (val: AssetModel[]) => {
                res.status(200).send(val);
            }, (err: any) => {
                res.status(500).send({ message: 'Error en la petición solicitada' })
            })

    } else {
        assetModelService.getAllModels().then(
            (val: AssetModel[]) => {
                return res.status(200).send(val);
            },
            (err: any) => {
                return res.status(500).send({ message: 'Error en la petición' })
            });
    }
}

export const getModel = async (req: Request, res: Response) => {
    let modelId: number | null = req.params.id ? Number(req.params.id) : null;

    if (!modelId) return res.status(401).send({ message: 'Error en la peticion' });

    assetModelService.getModel(modelId).then((val: AssetModel | null) => {
        if (!val) return res.status(400).send({ message: 'El modelo no existe' });
        return res.status(200).send(val);
    });
}

export const postModel = async (req: Request, res: Response) => {

    const newModel: IAssetModel | null = req.body;

    if (!newModel) return res.status(400).send();

    assetModelService.saveModel(newModel).then(
        (val: AssetModel | null) => {
            if (!val) return res.status(400).send({ message: 'Error al guardar el modelo' });
            return res.status(200).send(val);
        },
        (err: any) => {
            return res.status(500).send(err);
        });
}

export const updateModel = async (req: Request, res: Response) => {
    let modelId: number | null = req.params.id ? Number(req.params.id) : null;
    let update: IAssetModel | null = req.body;


    if (!(modelId && update)) {
        return res.status(400).send();
    }

    assetModelService.updateModel(modelId, update).then(
        (val: any) => {
        if (!val) return res.status(400).send({ message: 'El modelo no ha sido actualizado' });
        return res.status(200).send({model: AssetModel });
    }, (err: any) => {
        return res.status(500).send(err);
    })
}

export const deleteModel = async (req: Request, res: Response) => {
    let modelId: number | null = req.params.id ? Number(req.params.id) : null;

    if (!modelId) return res.status(400).send();
    assetModelService.deleteModel(modelId).then(() => {
        return res.status(200).send();
    },
        (rej: any) => {
            return res.status(500).send(rej);
        })
}