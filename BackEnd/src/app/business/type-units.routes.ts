import { Router } from 'express';
import { FEATURES, ACTIONS } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as typeUnitController from './controllers/typeUnit.controller';
const router: Router = Router();
const feature: string = FEATURES.TYPE_UNIT;

router.get('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    typeUnitController.getTypeUnits);

export default router;