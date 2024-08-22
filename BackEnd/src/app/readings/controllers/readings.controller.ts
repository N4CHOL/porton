import { Request, Response } from 'express';
import { ReadingAverages } from '../classes/readings-averages';
import { IIotRequest } from '../interfaces/iot-reading.interface';
import { Reading } from '../models/reading.model';
import * as iotReadingServices from '../services/readings.service';

export const postReading = async (req: Request, res: Response) => {
    const iotReading: IIotRequest | null = req.body;

    if (!iotReading) return res.status(400).send();

    iotReadingServices.saveIIotRequest(iotReading).then((val: Reading[] | null) => {
        if (!val) return res.status(404).send({ message: 'No reading was saved.' });
        return res.status(200).send(val);
    },
        (err: any) => {
            return res.status(400).send({ err, msg: 'Rejected' });
        }).catch((reason: any) => {
            return res.status(500).send({ msg: 'Error' });
        })

}

export const getReadingsByTag = async (req: Request, res: Response) => {
    const tag: string | null = req.params.tag;
    if (!tag) return res.status(403).send();

    iotReadingServices.getReadingsByComponentTag(tag).then((val: Reading[]) => {
        return res.status(200).send(val);
    }, (rej: any) => {
        res.status(500).send(rej);
    })
}

export const getReadingsSummaryByTag = async (req: Request, res: Response) => {
    const tag: string | null = req.params.tag;
    if (!tag) return res.status(403).send();

    iotReadingServices.getReadingsSummaryByComponentTag(tag).then((val: Reading[]) => {
        return res.status(200).send(val);
    }, (rej: any) => {
        res.status(500).send(rej);
    })
}

export const getReadingsAveragesByTag = async (req: Request, res: Response) => {
    const tag: string | null = req.params.tag;
    if (!tag) return res.status(403).send();

    iotReadingServices.getReadingsAveragesByComponentTag(tag).then((val: ReadingAverages[]) => {
        return res.status(200).send(val);
    }, (rej: any) => {
        res.status(500).send(rej);
    })
}