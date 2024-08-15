import { Request, Response } from 'express';
import { DaysOfWeek } from '../classes/daysOfWeek.model';
import * as daysOfWeekService from '../services/daysOfWeek.service'


export const getDaysOfWeek = async (req: Request, res: Response) => {
    try {
        await daysOfWeekService.getDaysOfWeek().then((daysOfWeek: DaysOfWeek[]) => {
            return res.status(200).send(daysOfWeek);
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}