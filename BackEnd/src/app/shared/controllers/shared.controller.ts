
import { Request, Response } from 'express';
import { Priority } from '../classes/priority.model';
import * as priorityService from '../services/priority.service';


export const getPriorities = async (req: Request, res: Response) => {
    try {
        await priorityService.getPriorities().then((priorities: Priority[]) => {
            return res.status(200).send(priorities);
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}
