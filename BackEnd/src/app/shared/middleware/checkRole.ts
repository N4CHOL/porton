import { Request, Response, NextFunction } from 'express';
import { User } from '../../user/models/user.model';
import *  as userService from '../../user/services/user.service';

export const checkRole = (feature: string, actions: Array<string>) => {
    // Checker los roles del usuario
    // Checkear que el rol tenga acceso a la Feautre
    return async (req: Request, res: Response, next: NextFunction) => {
        const username = res.locals.jwtPayload.username;
        const user: User | null = await userService.findUserByUsername(username);
        if (user) {
            if (!user.activated) {
            
                return res.status(401).send({message: 'User was banned'});
            }
            const ac: boolean = await userService.userHasAccessToFeature(username, feature, actions);
            if (ac) {
                next();
            } else {
            
                return res.status(403).send({message: 'Invalid Role'});
            }
        } else {
       
            return res.status(401).send({message:'Not a User'});
        }

    }
}

