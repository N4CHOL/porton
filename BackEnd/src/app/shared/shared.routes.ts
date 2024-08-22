import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from './middleware/checkJwt';
import { checkRole } from './middleware/checkRole';
import * as sharedController from './controllers/shared.controller'

const router: Router = Router();
const feature: string = FEATURES.SHARED;

router.get('/priorities',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    sharedController.getPriorities);
export default router;