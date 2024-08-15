import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as providerController from './controllers/provider.controller';

const router: Router = Router();
const feature: string = FEATURES.PROVIDER

router.get('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    providerController.getProviders);

router.get('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
    providerController.getProvider);

router.post('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.CREATE
        ])
    ],
    providerController.postProvider);

router.put('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.EDIT
        ])
    ],
    providerController.updateProvider);

router.delete('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.DELETE
        ])
    ],
    providerController.deleteProvider);

export default router;