import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['authorization']?.split(' ')[1];

    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(403).send({message: 'Sapo'});
    }

    const { userId, username, activated } = jwtPayload;
    const newToken = jwt.sign(
        { userId, username, activated },
        config.jwtSecret,
        { expiresIn: '1h' });

    res.setHeader('token', newToken);
    next();
}