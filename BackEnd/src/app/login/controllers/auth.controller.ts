import { Request, Response } from 'express';
import * as userService from '../../user/services/user.service';
import config from '../../../config/config';
import { User } from '../../user/models/user.model';
import * as jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).send();
    }
    let userFound: User;
    userService.findUserByUsername(username, 'all').then((user: User | null) => {
        if (user) {
            if (user.comparePassword(password)) {
                const token = jwt.sign({
                    userId: user.userId,
                    username: user.username,
                    activated: user.activated
                },
                    config.jwtSecret,
                    { expiresIn: '24h' }
                );
                let userWToken: any = user.toJSON();
                delete userWToken.password;
                userWToken.token = token;
                res.status(200).send(userWToken);
            } else {
                return res.status(401).send({ message: 'Password mismatch' });
            }
        } else {
            return res.status(401).send({ message: 'User not found' });
        }
    }, (error: any) => {
        return res.status(500).send(error);
    })
}