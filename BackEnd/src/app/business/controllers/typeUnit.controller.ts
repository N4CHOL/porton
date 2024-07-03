import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { TypeUnit } from '../models/typeUnit.model';

import * as typeUnitService from '../services/typeUnit.service';

export const getTypeUnits = async (req: Request, res: Response) => {
    let typeUnits: TypeUnit[] = await typeUnitService.getTypeUnits();
    return res.status(200).send(typeUnits);
}
