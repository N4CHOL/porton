import { Router } from "express";
import { FEATURES, ACTIONS } from "../../environments/constants";
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as unitController from './controllers/unit.controller';

const router: Router = Router();
const feature: string = FEATURES.UNIT;

router.get('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    unitController.getUnits);


router.get('/:unitId',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
    unitController.getUnit);

router.post('/:businessId',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.CREATE
        ])
    ],
    unitController.postUnit);


router.put('/:unitId',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.EDIT
        ])
    ],
    unitController.updateUnit);

export default router;