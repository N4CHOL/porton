import { TemplateMPD } from '../models/template-maitenance-plan.model';
import { Request, Response } from 'express';
import * as templateMPDService from '../services/template-maitenance-plan.service';

export const postTemplateMPD = async (req: Request, res: Response) => {

    try {
        templateMPDService.saveTemplateMPD(req.body).then(
            (templateMPD: TemplateMPD) => {
                return res.status(200).send(templateMPD);
            }, (rej: any) => {
                return res.status(400).send(rej);
            })
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const deleteTemplateMPD = async (req: Request, res: Response) => {
    try {
        const tempMPDId: number | null = req.params.id ? Number(req.params.id) : null;
        if (!tempMPDId) return res.status(400).send({ message: 'No recibí ID' });
        templateMPDService.deleteTemplateMPD(tempMPDId).then(
            () => {
                return res.status(200).send({ message: 'Template OT eliminado' });
            }, (rej: any) => {
                return res.status(400).send(rej);
            })
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const putTemplateMPD = async (req: Request, res: Response) => {
    try {
     
        const tempMPDId: number | null = req.params.id ? Number(req.params.id) : null;
        if (!tempMPDId) return res.status(400).send({ message: 'No recibí ID' });
        templateMPDService.editTemplateMPD(tempMPDId, req.body).then(
            (tempMP: TemplateMPD) => {
                return res.status(200).send(tempMP);
            },
            (rej: any) => {
                res.status(400).send(rej);
            }
        )
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const getTemplateMPD = async (req: Request, res: Response) => {
    try {
        const tempMPDId: number | null = req.params.id ? Number(req.params.id) : null;
    
        if (!tempMPDId) return res.status(400).send({ message: 'No recibí ID' });
        templateMPDService.getTemplateMPD(tempMPDId).then(
            (tempMPD: TemplateMPD | null) => {
                if (!TemplateMPD) return res.status(400).send({ message: 'Elemento no encontrado' });
                return res.status(200).send(tempMPD);
            },
            (rej: any) => {
                return res.status(400).send(rej);
            });
    } catch (e) {
   
        return res.status(500).send(e);
    }
}

export const getTemplatesMPD = async (req: Request, res: Response) => {
    try {
        templateMPDService.getTemplateMPDs().then((tempMPDs: TemplateMPD[] | null) => {
            return res.status(200).send(tempMPDs);
        });
    } catch (e) {
      
        return res.status(500).send(e);
    }
}

export const getTemplatesMPDList = async (req: Request, res: Response) => {
    try {
        templateMPDService.getTemplatesMPDList().then((tempMPDs: TemplateMPD[] | null ) =>{
            return res.status(200).send(tempMPDs);
        });
    } catch (e) {
       
        return res.status(500).send(e);
    }
}