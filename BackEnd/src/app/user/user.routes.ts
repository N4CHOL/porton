import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as userController from './controllers/user.controller';
const router: Router = Router();
const feature: string = FEATURES.USER;

router.post('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.CREATE
        ])
    ],
    userController.postUser);

router.get('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    userController.getUsers);

router.get('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
    userController.getUser);

router.get('/search/operators', 
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
userController.getOperators);

router.put('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.EDIT
        ])
    ],
    userController.putUser);

export default router;