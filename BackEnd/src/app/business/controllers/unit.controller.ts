import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { IUnit, Unit } from '../models/unit.model';

import * as unitService from '../services/unit.service';

export const getUnits = async (req: Request, res: Response) => {
    unitService.getUnits().then((units: Unit[]) => {
        return res.status(200).send(units);
    }, (err: any) => {
        return res.status(500).send();
    })
}

export const getUnit = async (req: Request, res: Response) => {
    const unitId: number | null = req.params.unitId ? Number(req.params.unitId) : null;
    if (!unitId) return res.status(401).send();

    unitService.getUnit(unitId).then((val: Unit | null) => {
        if (!val) return res.status(404).send();

        return res.status(200).send(val);
    })
}

export const postUnit = async (req: Request, res: Response) => {
    const unit: IUnit = req.body;
    const businessId: number | null = req.params.businessId ? Number(req.params.businessId) : null;
    if (!businessId) return res.status(401).send();
    unitService.saveBusinessUnit(businessId, unit).then((val: Unit | null) => {
        if (!val) return res.status(404).send({ message: 'No se encontró empresa' })
        return res.status(200).send(val);
    }, (rej: any) => {
        return res.status(500).send(rej);
    })
}

export const updateUnit = async (req: Request, res: Response) => {
    const unitId: number | null = req.params.unitId ? Number(req.params.unitId) : null;
    const updUnit: IUnit = req.body;
    if (!unitId) return res.status(400).send();
    unitService.updateUnit(unitId, updUnit).then((value: Unit | null) => {
        if (!value) return res.status(404).send();

        return res.status(200).send(value);
    }, (rej: any) => {
        return res.status(500).send(rej);
    })
}

