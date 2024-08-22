
import { Request, Response } from 'express';
import * as operagorNotifications from '../../operator-notifications/services/operator-notificatios.service';
import { OperatorNotifications } from '../models/operator-notifications.model';



export const postOperatorNotificatios = async (req: Request, res: Response) => {

    try {
     
        operagorNotifications.saveOperatorNotifications(req.body).then(
            (operatorNotifications: OperatorNotifications) => {
                return res.status(200).send(operatorNotifications);
            }, (rej: any) => {
                return res.status(400).send(rej)
            })

    } catch (e) {
        return res.status(500).send(e); 
        
    }

}


export const getOperatorNotification = async (req: Request, res: Response) => {
    try {
        const operId: number | null = req.params.id ? Number(req.params.id) : null;
      
        if (!operId) return res.status(400).send({ message: 'No recibí Id'});
        operagorNotifications.getOperatorNotification(operId).then(
            (odDetail: OperatorNotifications | null) => {
            
                if(!odDetail) return res.status(404).send({message: 'Elemento no encontrado'});
            return res.status(200).send(odDetail);
        },
        (rej: any) => {
            return res.status(400).send(rej);
        });
    } catch (e) {
     
        return res.status(500).send(e);
    }
}


export const getOperatorNotifications = async (req: Request, res: Response) => {
    try {
        operagorNotifications.getOperatorNotifications().then((operatorNotifications: OperatorNotifications[]) => {
            return res.status(200).send(operatorNotifications);
        });
    } catch (e) {

        return res.status(500).send(e);

        
    }
}

export const getComponentNotifications = async (req: Request, res: Response) => {
    try {
        const compId: number | null = req.params.id ? Number(req.params.id) : null;
  
        if (!compId) return res.status(400).send({ message: 'No recibí Id'});

        operagorNotifications.getComponentNotifications(compId).then((operatorNotifications: OperatorNotifications[]) => {
            return res.status(200).send(operatorNotifications);
        });
    } catch (e) {

        return res.status(500).send(e);
    }
}
