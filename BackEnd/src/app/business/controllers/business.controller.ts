import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { Business, IBusiness } from '../models/business.model';

// Services
import * as businessService from '../services/business.service';

export const getBusinesses = async (req: Request, res: Response) => {
    await businessService.findAllBusinesses().then((businesses: Business[]) => {
        return res.status(200).send(businesses);
    })
};

export const getBusiness = async (req: Request, res: Response) => {
    let businessId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!businessId) {
        return res.status(401).send();
    }
    businessService.findBusinessById(businessId).then((business: Business | null) => {
        if (!business) return res.status(404).send({ message: `No se encontró la empresa` });
        return res.status(200).send(business);
    }, (error: any) => {
        return res.status(500).send({ message: error });
    })
}

export const postBusiness = async (req: Request, res: Response) => {
    await check('name', 'El nombre no puede estar vacío')
        .not()
        .isEmpty()
        .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    const business: IBusiness = req.body;
    businessService.saveBusiness(business).then((val: Business) => {
        return res.status(201).send(val);
    }, (error: any) => {
        return res.status(500).send(error);
    })

};

export const updateBusiness = async (req: Request, res: Response) => {

    // Get the parameters
    let businessId: number | null = req.params.id ? Number(req.params.id) : null;
    let update: IBusiness | null = req.body;

    // Validate
    if (!businessId) return res.status(404).send();
    if (!update) return res.status(401).send();

    await check('name', 'El nombre no puede estar vacío')
        .not()
        .isEmpty()
        .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(500).send(errors.array());

    // Let's GO!!!!
    businessService.updateBusiness(businessId, update).then((value: Business | null) => {
        if (!value) return res.status(404).send();

        return res.status(200).send(value);
    }, (rej: any) => {
        res.status(500).send(rej);
    })
}

export const deleteBusiness = async (req: Request, res: Response) => {
    const businessId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!businessId) return res.status(401).send();

    businessService.deleteBusiness(businessId).then((val: number) => {
        if (val > 0) {
            return res.status(200).send(val);
        } else {
            return res.status(404).send(val);
        }
    }, (rej: any) => {
        return res.status(500).send(rej);
    })
}