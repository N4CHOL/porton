import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { IProductionLine, ProductionLine } from '../models/production-line.model';
import * as productionLineService from '../services/production-line.service'

export const getProductionLine = async (req: Request, res: Response) => {
    let productionLineId: number | null = req.params.id ? Number(req.params.id): null;
    if (!productionLineId) {
        return res.status(401).send();
    }
    productionLineService.findProductionLineById(productionLineId).then((productionLine: ProductionLine | null) => {
        if (!productionLine) return res.status(404).send({ message: 'No se encontró la linea de producción'});
 
        return res.status(200).send(productionLine)
    }, (error: any) => {
        return res.status(500).send({ message: error});
    })
}

export const getProductionLineWithAssets = async (req: Request, res: Response) => {
    let productionLineId: number | null = req.params.id ? Number(req.params.id): null;
    if (!productionLineId) {
        return res.status(401).send();
    }
    productionLineService.findProductionLineWithAssets(productionLineId).then((productionLine: ProductionLine | null) => {
        if (!productionLine) return res.status(404).send({ message: 'No se encontró la linea de producción'});
  
        return res.status(200).send(productionLine)
    }, (error: any) => {
        return res.status(500).send({ message: error});
    })
}

export const getProductionLines = (req: Request, res: Response) => {
    const page: number = req.query.page ? Number(req.query.page) : 0;
    const limit: number = req.query.limit ? Number(req.query.limit) : 10;
    
    productionLineService.getProductionLinesPage(page, limit).then(
        (value: any | null) => {
            if (!value) {
                return res.status(404).json('No existe la linea de producción');
            }
            return res.status(200).json(value);
        },
        (err: any) => {
          
            return res.status(500).json(err);
        })
}

export const postProductionLine = async (req: Request, res: Response) => {
    await check('name', 'El nombre no puede estar vacío')
        .not()              //no es..
        .isEmpty()          //vacio
        .run(req);          //corre en Request por cada campo a verificar
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    const productionLine: IProductionLine = req.body;
    productionLineService.saveProductionLine(productionLine).then((val: ProductionLine) => {
        return res.status(201).send(val);    
    }, (error: any) => {
        return res.status(500).send(error);
    })
}

export const updateProductionLine = async (req: Request, res: Response) => {

    try {
        const productionLineId: number | null = req.params.id ? Number(req.params.id) : null;
   
        if (!productionLineId) return res.status(400).send({ message: "No recibi Id de productionLine"});
        productionLineService.updateProductionLine(productionLineId, req.body).then(
            (prodLine: ProductionLine) => {
                return res.status(200).send(prodLine)
            },
            (rej: any) => {
                return res.status(400).send(rej);
            }
        )
    } catch (e) {
        return res.status(500).send(e)
    }
    // let productionLineId: number | null = req.params.id ? Number(req.params.id) : null;
    // let update: IProductionLine | null = req.body

    // if (!productionLineId) return res.status(404).send();
    // if (!update) return res.status(401).send();

    // await check('name', 'El nombre no puede estar vacío')
    //     .not()              //no es..
    //     .isEmpty()          //vacio
    //     .run(req);          //corre en Request

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) return res.status(500).send(errors.array());

    // productionLineService.updateProductionLine(productionLineId, update).then((value: ProductionLine | null) => {
    //     if (!value) return res.status(404).send();

    //     return res.status(200).send(value);
    // }, (rej: any) => {
    //     res.status(500).send(rej);
    // })
}

export const deleteProductionLine = async (req: Request, res: Response) => {
    const productionLineId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!productionLineId) return res.status(401).send();

    productionLineService.deleteProductionLine(productionLineId).then((val: Number | null) => {
        if (val) {
            return res.status(200).send({ rows: val });
        } else {
            return res.status(404).send({ rows: val });
        }
        }, (rej: any) => {
            return res.status(500).send(JSON.parse(rej));
        })
}