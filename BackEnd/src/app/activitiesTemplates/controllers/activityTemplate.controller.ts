import { Request, Response } from 'express';
import * as activityService from '../services/activityTemplate.service';
import { ActivityTemplate, IActivityTemplate } from '../models/activityTemplate.model';


// DEJAR AMBOS GETS DECLARADOS (paginado y completo)
//Paginado
export const getActivitiesTemplatePaged = (req: Request, res: Response) => {
    const page: number = req.query.page ? Number(req.query.page) : 0;
    const limit: number = req.query.limit ? Number(req.query.limit) : 10;

    activityService.getActivitiesPage(page, limit).then(
        (pagedAssets: any) => {
        
            return res.status(200).send(pagedAssets);
        },
        (error: any) => {
            return res.status(500).send(error);
        })
}

//Completo
export const getActivitiesTemplate = async (req: Request, res: Response) => {
    await activityService.getActivitiesTemplate().then((activitiesTemplate: ActivityTemplate[]) => {
        return res.status(200).send(activitiesTemplate);
    });
}

export const getActivitiesTemplateByWO = async (req: Request, res: Response) => {
    await activityService.getActivitiesTemplateByWO().then((activitiesTemplate: ActivityTemplate[]) => {
        return res.status(200).send(activitiesTemplate);
    })
}


export const getActivityTemplate = async (req: Request, res: Response) => {
    let activityId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!activityId) {
        return res.status(401).send();
    }
    activityService.getActivityTemplate(activityId).then((activityTemplate: ActivityTemplate | null) => {
        if (!activityTemplate) return res.status(404).send({ message: 'No se encontró el template de actividad solicitado' });
        return res.status(200).send(activityTemplate);
    }, (err: any) => {
      
        return res.status(500).send({ message: err });
    });
}

export const postActivityTemplate = async (req: Request, res: Response) => {
  
    const newActivityTmpl: IActivityTemplate | null = req.body;

    if (!newActivityTmpl) return res.status(400).send();

    activityService.saveActivityTemplate(newActivityTmpl).then(
        (val: ActivityTemplate | null) => {
            if (!val) return res.status(400).send({ message: 'Error en la solicitud' });
            return res.status(200).send(newActivityTmpl);
        },
        (err: any) => {
            return res.status(500).send(err);
        }
    )
}

export const editActivityTemplate = async (req: Request, res: Response) => {
    const activTmplId: string = req.params.id;
  

    activityService.editActivityTemplate(activTmplId, req.body).then((val: ActivityTemplate | null) => {
        if (!val) {
            return res.status(404).send(`The requested activity template doesn't exist`)
        }
     
        return res.status(200).send(val);
    }, (err: any) => {
     
        return res.status(500).send(err);
    });
}

export const deleteActivityTemplate = async (req: Request, res: Response) => {
    const activityTmplId: number | null = req.params.id ? Number(req.params.id) : null;

    if (!activityTmplId) return null;

    activityService.deleteActivityTemplate(activityTmplId).then((val: number | null) => {
        if (!val) {
            return res.status(400).send({ message: 'Activity Template not found' });
        } else {
            return res.status(200).send({ filasBorradas: val });
        };
    }, (err: any) => {
        return res.status(500).send(err);
    });
}

