import { Request, Response } from 'express';
import { Color, IColor } from '../models/color.model';
import * as colorService from '../services/color.service';


export const getColors = async (req: Request, res: Response) => {
    let colors: IColor[] = await colorService.getColors();

    res.status(200).json(colors);
}
export const getColorsbyModel = async (req: Request, res: Response) => {
    const assetModelId: number | null = req.params.assetModelId ? Number(req.params.assetModelId) : null;
    
    if (assetModelId) {
        colorService.getColorsByModel(assetModelId).then(
            (val: Color[]) => {
                res.status(200).send(val);
            }, (err: any) => {
                res.status(500).send({ message: 'Error en la petición solicitada'});
            }
        )
    }
}