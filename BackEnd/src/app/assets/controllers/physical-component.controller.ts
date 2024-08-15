
import { Request, Response } from 'express';
import * as physicalComponentService from '../services/physical-component.service';
import { check, validationResult } from 'express-validator';
import { PhysicalComponent } from '../models/physical-component.model';

// export const getPhysicalComponents = (req: Request, res: Response) => {
//     const page: number = req.query.page ? Number(req.query.page) : 0;
//     const limit: number = req.query.limit ? Number(req.query.limit) : 10;

//     physicalComponentService.getPhysicalComponents(page, limit).then(
//         (pagedPComponent: any) => {
//             console.log(pagedPComponent);
//             return res.status(200).send(pagedPComponent);
//         },
//         (error: any) => {
//             return res.status(500).send(error);
//         }
//     )
// }

export const getAllPhysicalComponents = (req: Request, res: Response) => {
        physicalComponentService.getPhysicalComponents().then((physicalComponents: PhysicalComponent[]) => {
            return res.status(200).send(physicalComponents);
        });
}

export const getPhysicalComponents = (req: Request, res: Response) => {
    const page: number = req.query.page ? Number(req.query.page) : 0;
    const limit: number = req.query.limit ? Number(req.query.limit) : 10;

    physicalComponentService.getPhysicalComponentsPage(page, limit).then(
        (pagedPhysicalComponents: any) => {
     
            return res.status(200).send(pagedPhysicalComponents);
        },
        (error: any) => {
            return res.status(500).send(error);
        }
    )
}

export const getPhysicalComponent = (req: Request, res: Response) => {
    const pComponentId = Number(req.params.id);
    physicalComponentService.getPhysicalComponent(pComponentId).then(
        (value: any | null) => {
            if (!value) {
                return res.status(404).send(`The requested physicalComponent doesn't exist`);
            }
            return res.status(200).send(value);
        },
        (err: any) => {
  
            return res.status(500).send(err);
        }
    )
}

export const postPhysicalComponent = (req: Request, res: Response) => {
    // const errors = await checkErrors(req);

    physicalComponentService.savePhysicalComponent(req.body).then((pComponent: PhysicalComponent | null) => {
        if (pComponent) {
            return res.status(200).send(pComponent);
        } else {
            return res.status(404).send(new Error('Physical Component not found'));
        }
    }, (err: any) => {
        return res.status(500).send(err);
    })
}

export const putPhysicalComponent = (req: Request, res: Response) => {
    const physicalCompId = req.params.id;

    physicalComponentService.editPhysicalComponent(physicalCompId, req.body).then((val: PhysicalComponent | null) => {
        if (!val) {
            return res.status(400).send((`The requested physical component doesn't exist`));
        }
        return res.status(200).send(val);
    }, (err) => {
        return res.status(500).send(err);
    })
}

export const deletePhysicalComponent = (req: Request, res: Response) => {
    const physicalComponentId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!physicalComponentId) return null;

    physicalComponentService.deletePhysicalComponent(physicalComponentId).then ( (val: number | null) => {
        if (!val) {
            return res.status(400).send( {message: 'Physical Component not found'} );
        } else {
            return res.status(200).send( {filaEliminada: val });
        };
    }, (err: any) => {
        return res.status(500).send(err);
    })
}
