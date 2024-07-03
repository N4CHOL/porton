import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

import { MachineType, IMachineType } from '../models/machine-type.model';
import * as machineTypeService from '../services/machine-type.service';

export const getMachineTypes = async (req: Request, res: Response) => {
    let machineTypes: IMachineType[] = await machineTypeService.getMachineTypes();

    res.status(200).json(machineTypes);
}


export const getMachineType = async (req: Request, res: Response) => {
    let machineTypeId = req.params.id ? Number(req.params.id) : null;

    if (!machineTypeId) return res.status(400).send({ message: 'El tipo de máquina no existe' });

    machineTypeService.getMachineType(machineTypeId).then((val: MachineType | null) => {
        if (!val) return res.status(404).send({ message: 'El tipo de máquina no existe' });
        return res.status(200).send(val);
    }, (err: any) => {
        return res.status(500).send(err);
    })
}


export const postMachineType = async (req: Request, res: Response) => {

    // await check('name', 'No puede ser vacío')
    //     .not()
    //     .isEmpty()
    //     .run(req)

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     res.status(400).json(errors);
    // }

    const machineType: IMachineType = req.body;

    machineTypeService.saveMachineType(machineType).then((val: MachineType) => {
        return res.status(200).send(val);
    }, (rej: any) => {
        return res.status(500).send({ message: 'El tipo de máquina no ha sido guardado' });
    });
}

export const updateMachineType = async (req: Request, res: Response) => {
    let machineTypeId: number | null = req.params.id ? Number(req.params.id) : null;
    let update: IMachineType = req.body;

    if (!(machineTypeId && update)) return res.status(400).send({message:'Error en los parametros recibidos.'});

    machineTypeService.updateMachineType(machineTypeId, update)
        .then((val: [number, MachineType[]]) => {
            if (!val[0]) return res.status(404).send();
            return res.status(200).send(val[1][0]);
        }, (err: any) => {
            return res.status(500).send(err);
        });

}

export const deleteMachinetype = async (req: Request, res: Response) => {
    const machineTypeId: number | null = req.params.id ? Number(req.params.id) : null;

    if (!machineTypeId) return res.status(400).send();
    machineTypeService.deleteMachineType(machineTypeId).then(() => {
        return res.status(200).send({message: 'Eliminado con exito.'});
    }, (rej: any) => {
        return res.status(500).send(rej);
    });
}