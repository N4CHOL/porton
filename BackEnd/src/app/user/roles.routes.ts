import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as roleController from './controllers/role.controller';

const router: Router = Router()
const feature: string = FEATURES.ROLE;

router.post('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.CREATE
        ])
    ],
    roleController.postRole);

router.get('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    roleController.getRoles);

export default router;