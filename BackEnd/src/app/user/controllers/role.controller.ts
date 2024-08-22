import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { IRole } from '../models/role.model';
import * as roleService from '../services/role.service';

export const getRoles = async (req: Request, res: Response) => {
    roleService.getRoles().then(
        (roles: IRole[]) => {
            res.status(200).json(roles);
        },
        (err: any) => {
            res.status(500).json(err);
        });
}

export const postRole = async (req: Request, res: Response) => {

    await check('name', 'Can\'t be empty')
        .not()
        .isEmpty()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    }

    roleService.saveRole(req.body).then((role: IRole) => {
        res.status(201).json(role);
    },
        (rej: any) => {
            res.status(500).json(rej);
        })
}