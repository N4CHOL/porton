import { MaintenancePlanDetail } from '../models/maintenance-plan-detail.model'
import * as maintenancePlanDetailService from '../services/maintenance-plan-detail.service'
import { Request, Response } from 'express';


export const postMaintenancePlanDetail = async (req: Request, res: Response) => {

    try {
        let worId = req.query.worid?.toString()
     
        maintenancePlanDetailService.saveMaintenancePlanDetail(req.body, worId).then(
            (maintenancePlanDetail: MaintenancePlanDetail) => {
                return res.status(200).send(maintenancePlanDetail);
            }, (rej: any) => {
                return res.status(400).send(rej)
            })

    } catch (e) {
        return res.status(500).send(e);
    }

}

export const deleteMaintenancePlanDetail = async (req: Request, res: Response) => {
    try {
        const mpId: number | null = req.params.id ? Number(req.params.id) : null;
        if (!mpId) return res.status(400).send({ message: 'No recibi id' })
        maintenancePlanDetailService.deleteMaintenancePlanDetail(mpId).then(
            (mainPd: MaintenancePlanDetail) => {
                return res.status(200).send(mainPd);
            }, (rej: any) => {
                return res.status(400).send(rej);
            })
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const putMaintenancePlanDetail = async (req: Request, res: Response) => {

    try {
        const mpId: number | null = req.params.id ? Number(req.params.id) : null;
        if (!mpId) return res.status(400).send({ message: "No recibí Id" });
        maintenancePlanDetailService.editMaintenancePlanDetail(mpId, req.body).then(
            (mpDetail: MaintenancePlanDetail) => {
                return res.status(200).send(mpDetail);
            },
            (rej: any) => {
                return res.status(400).send(rej);
            }
        )
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const getMaintenancePlanDetail = async (req: Request, res: Response) => {
    try {
        const mpId: number | null = req.params.id ? Number(req.params.id) : null;
      
        if (!mpId) return res.status(400).send({ message: 'No recibí Id'});
        maintenancePlanDetailService.getMaintenancePlanDetail(mpId).then(
            (mpDetail: MaintenancePlanDetail | null) => {
            
                if(!mpDetail) return res.status(404).send({message: 'Elemento no encontrado'});
            return res.status(200).send(mpDetail);
        },
        (rej: any) => {
            return res.status(400).send(rej);
        });
    } catch (e) {
     
        return res.status(500).send(e);
    }
}

export const getMaintenancePlanDetails = async (req: Request, res: Response) => {
    try {
        maintenancePlanDetailService.getMaintenancePlanDetails().then((maintenancePlanDetails: MaintenancePlanDetail[]) => {
            return res.status(200).send(maintenancePlanDetails);
        });
    } catch (e) {

        return res.status(500).send(e);
    }
}

export const getActiveMaintenancePlanDetails = async (req: Request, res: Response) => {
    try {
        maintenancePlanDetailService.getActiveMaintenancePlanDetails().then((maintenancePlanDetails: MaintenancePlanDetail[]) => {
            return res.status(200).send(maintenancePlanDetails);
        });
    } catch (e) {
   
        return res.status(500).send(e);
    }
}

export const getMaintenancePlanDetailsByProfile = async (req: Request, res: Response ) => {
  
    try {
            await maintenancePlanDetailService.getMaintenancePlanDetailsByProfile(req.params.userId).then((maintenancePlanDetails: MaintenancePlanDetail[]) => {
            return res.status(200).send(maintenancePlanDetails);
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const getOneMaintenancePlanDetailsWithActivities = async (req: Request, res: Response) => {

    try {
        await maintenancePlanDetailService.getOneMaintenancePlanDetailsWithActivities(req.params.mpdId).then((maintenancePlanDetails: MaintenancePlanDetail | null) => {
        return res.status(200).send(maintenancePlanDetails);
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const getAssetMaintenancePlanDetails = async (req: Request, res: Response) => {

    try {
        await maintenancePlanDetailService.getAssetMaintenancePlanDetails(req.params.id).then((maintenancePlanDetails: MaintenancePlanDetail[] | null) => {
        return res.status(200).send(maintenancePlanDetails);
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const getComponentMaintenancePlanDetails = async (req: Request, res: Response) => {

    try {
        await maintenancePlanDetailService.getComponentMaintenancePlanDetails(req.params.id).then((maintenancePlanDetails: MaintenancePlanDetail[] | null) => {
        return res.status(200).send(maintenancePlanDetails);
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}


export const endMaintenancePlanDetail = async (req: Request, res: Response) => {
    try {
        const mpdId: string | null = req.params.mpdId ? req.params.mpdId : null;
        if (!mpdId) return res.status(400).send({ message: "No recibi Id de Work Order "});
        maintenancePlanDetailService.endMaintenancePlanDetail(mpdId).then(
            (workOrder: MaintenancePlanDetail) => {
                return res.status(200).send(workOrder);
            }, (rej: any) => {
                return res.status(400).send(rej);
            })
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const cancelMaintenancePlanDetail = async (req: Request, res: Response) => {
    try {
        const mpdId: string | null = req.params.mpdId ? req.params.mpdId : null;
        if (!mpdId) return res.status(400).send({ message: "No recibi Id de Work Order "});
        maintenancePlanDetailService.cancelMaintenancePlanDetail(mpdId).then(
            (workOrder: MaintenancePlanDetail) => {
                return res.status(200).send(workOrder);
            }, (rej: any) => {
                return res.status(400).send(rej);
            })
    } catch (e) {
        return res.status(500).send(e);
    }
}