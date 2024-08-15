import { Request, Response } from 'express';
import { IUser, User } from '../../user/models/user.model';
import { check, validationResult } from 'express-validator'
import { ERRORS } from '../../shared/enums/errors.enum'
import { IUserStatus } from '../models/user-status.model';
import *  as userService from '../services/user.service';
import { ErrorResponse } from '../../shared/classes/error-response';

// POST
export const postUser = async (req: Request, res: Response) => {
    await check('username', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('password', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);
    await check('name', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('email', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('roles', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('cargo', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('lastName', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);
    await check('phone', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('codeArea', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);



    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors });
    }

    const user: IUser = req.body;
    userService.saveUser(user).then((val: User) => {
        return res.status(201).send(val);
    }, (rej: any) => {
        if (rej.errors[0].type == 'unique violation') {
            if (rej.errors[0].path == 'username') {
                return res.status(400).send({ message: 'El nombre de usuario ya existe' });
            }
            if (rej.errors[0].path == 'email') {
                return res.status(400).send({ message: 'El email ingresado ya existe' });
            }

        } else {
            return res.status(500).send(rej);
        }
    })
}

// GET
export const getUsers = async (req: Request, res: Response) => {
    userService.getUsers().then((users: User[]) => {
        return res.status(200).send(users);
    }, (rej: any) => {
        return res.status(500).send();
    })
}

export const getUser = async (req: Request, res: Response) => {
    const userId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!userId) return res.status(401).send();
    userService.getUser(userId).then(
        (user: User | null) => {
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json(new ErrorResponse(404, 'NOT_FOUND', 'User not found.'))
            }
        },
        (rej: any) => {
            return res.status(500).json(rej);
        })
}

export const getOperators = async (req: Request, res: Response) => {
    try {
        userService.getOperators().then((users: User[]) => {
            return res.status(200).send(users);
        }, (rej: any) => {
            return res.status(400).send();
        })
    } catch (e) {
        res.status(500).send(e);
    }

}

// PUT
export const putUser = async (req: Request, res: Response) => {
    const id: number | null = req.params.id ? Number(req.params.id) : null;

    if (!id) {
        return res.status(400).json(new ErrorResponse(400, 'BAD_REQUEST'));
    }

    const errors = await checkErrors(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(new ErrorResponse(400, 'BAD_REQUEST', 'A validation error ocurred', errors));
    }

    userService.editUser(id, req.body).then(
        (re: User | null) => {
            if (re) {
                return res.status(200).json(re);
            } else {
                return res.status(404).json(new ErrorResponse(404, 'NOT_FOUND'));
            }
        },
        (rej: any) => {
            return res.status(500).json(rej);
        });

}

const checkErrors = async (req: Request) => {
    await check('username', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('name', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('email', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('roles', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);
    await check('cargo', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('lastName', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);
    await check('phone', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);

    await check('codeArea', ERRORS.notEmpty)
        .not()
        .isEmpty()
        .run(req);



    return validationResult(req);
}