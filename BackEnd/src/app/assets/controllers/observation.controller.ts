import { Request, Response } from 'express';
import { Asset } from '../models/asset.model';
import { Composite } from '../models/composite.model';
import { Observation } from '../models/observation.model';
import * as assetService from '../services/asset.service';
import * as componentService from '../services/component.service';
import * as observationService from '../services/observation.service';

export const getWorkOrderRequestsPaginated = async (req: Request, res: Response) => {
    const page: number = req.query.page ? Number(req.query.page) : 0;
    const limit: number = req.query.limit ? Number(req.query.limit) : 10;


    observationService.getWorkOrderRequestsPaginated(page, limit).then(
        (pagedWorkOrderRequests: any) => {
            return res.status(200).send(pagedWorkOrderRequests)
        },
        (error: any) => {
            return res.status(500).send(error);
        }
    )
}

export const getWorkOrderRequest = (req: Request, res: Response) => {
    let workOrderRequestId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!workOrderRequestId) {
        return res.status(401).send();
    }
    observationService.getWorkOrderRequest(workOrderRequestId).then((WOR: Observation | null) => {
        if (!WOR) return res.status(404).send({ message: 'No se encontró la solicitud de OT'});
        return res.status(200).send(WOR);
        }, (error: any) => {
            return res.status(500).send({ message: error});
    })
}

export const getAssetsByName = (req: Request, res: Response) => {
    const term = req.params.term;
    assetService.getAssets(term).then()   
}

export const getAssetsNonPaginated = (req: Request, res: Response) => {
    try {
        assetService.getAssetsNonPaginated().then((assets: Asset[]) => {
            return res.status(200).send(assets)
        });
    } catch (e) {

        return res.status(500).send(e)
    }
}

export const getObservationsByAsset = async (req: Request, res: Response) => {
    try {
        await observationService.getObservationsByAsset(req.params.id).then((observations: Observation[] | null) => {
        return res.status(200).send(observations);
        })
    } catch (e) {
        return res.status(500).send(e)
    }
}

export const getObservationsByComponent = async (req: Request, res: Response) => {

    try {
        await observationService.getObservationsByComponent(req.params.parentId).then((observations: Observation[] | null) => {
        return res.status(200).send(observations);
        })
    } catch (e) {
        return res.status(500).send(e)
    }
}

export const postObservation = (req: Request, res: Response) => {
  
    observationService.saveObservation(req.body).then((obs: Observation | null) => {
        if (obs) {
            return res.status(200).send(obs)
        } else {
            return res.status(404).send(new Error('Observation not found'))
        }
    }, (err: any) => {
        return res.status(500).send(err)
    })
}

export const discardWOR = (req: Request, res: Response) => {
    try {
        const obsId: string | null = req.params.id ? req.params.id : null;
        if (!obsId)
            return res.status(400).send({ message: 'No recibi Id de WOR' });
        observationService.discardWOR(obsId).then(
            (wor: Observation) => {
                return res.status(200).send(wor);
            },
            (rej: any) => {
                res.status(400).send({ rej})
            }
        );
    } catch (e) {
        return res.status(500).send(e)
    }
    
}

export const getAllComponentChildren = async (req: Request, res: Response) => {

    const tag: string | null = req.params.tag ? req.params.tag : null;
    if (!tag) return res.status(401).send();
    const component: Composite[] | null = await componentService.getAllComponentChildren(tag);
    if (!component) return res.status(404).send();

    return res.status(200).send(component);
}

export const getComponentParent = async (req: Request, res: Response) => {
    try {
        await observationService.getComponentParent(req.params.parentTag).then((parent: Asset | null) => {
        return res.status(200).send(parent);
        })
    } catch (e) {
        return res.status(500).send(e)
    }
}