import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { ISector, Sector } from '../models/sector.model';

import * as sectorService from '../services/sector.service';

export const getSector = async (req: Request, res: Response) => {
    const sectorId: number | null = req.params.sectorId ? Number(req.params.sectorId) : null;

    if (!sectorId) return res.status(404).send();

    sectorService.findSectorById(sectorId).then((val: Sector | null) => {
        if (!val) return res.status(404).send();
        return res.status(200).send(val);
    }, (err: any) => {
        return res.status(500).send(err);
    })
}

export const postSector = async (req: Request, res: Response) => {
    const businessId: number | null = req.params.businessId ? Number(req.params.businessId) : null;
    const unitId: number | null = req.params.unitId ? Number(req.params.unitId) : null;

    if (!(businessId && unitId)) return res.status(401).send();

    // Validate
    await check('name', 'El nombre no puede estar vacio')
        .not()
        .isEmpty()
        .run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).send(errors);

    // Let's GO!
    sectorService.saveSector(businessId, unitId, req.body).then((val: Sector | null) => {
        if (!val) return res.status(404).send({ message: 'La empresa no existe' });

        return res.status(201).send(val);
    }, (err: any) => {
        return res.status(500).send(err);
    })

}

export const updateSector = async (req: Request, res: Response) => {
    const businessId: number | null = req.params.businessId ? Number(req.params.businessId) : null;
    const unitId: number | null = req.params.unitId ? Number(req.params.unitId) : null;

    if (!(businessId && unitId)) return res.status(401).send();

    // Validate
    await check('name', 'El nombre no puede estar vacio')
        .not()
        .isEmpty()
        .run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).send(errors);

    const sector: ISector = req.body;
    sectorService.updateSector(sector).then((val: Sector | null) => {

        if (!val) return res.status(404).send();

        return res.status(200).send(val);
    }, (err: any) => {
        return res.status(500).send(err);
    })
}
