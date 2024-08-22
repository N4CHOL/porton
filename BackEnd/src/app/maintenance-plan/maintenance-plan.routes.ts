import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as maintenancePlanDetailController from './controllers/maintenance-plan-detail.controller'

const router: Router = Router();
const feature: string = FEATURES.MAINTENANCE_PLAN;

router.post('/detail',
    [

    ],
    maintenancePlanDetailController.postMaintenancePlanDetail
);

router.get('/detail',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    maintenancePlanDetailController.getMaintenancePlanDetails
);

router.get('/calendarWO',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    maintenancePlanDetailController.getActiveMaintenancePlanDetails
);

router.get('/detail/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
    maintenancePlanDetailController.getMaintenancePlanDetail
);

router.get('/assetWorkOrders/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
    maintenancePlanDetailController.getAssetMaintenancePlanDetails
);

router.get('/component/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
    maintenancePlanDetailController.getComponentMaintenancePlanDetails
);

router.put('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.EDIT
        ])
    ],
    maintenancePlanDetailController.putMaintenancePlanDetail);

router.delete('/detail/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.CANCEL
        ])
    ],
    maintenancePlanDetailController.deleteMaintenancePlanDetail);

router.get('/myWO/:userId',
    [
         checkJwt,
         checkRole(feature, [
             ACTIONS.ALL,
             ACTIONS.VIEW_ONE
         ])
    ],
    maintenancePlanDetailController.getMaintenancePlanDetailsByProfile);

    router.get('/myWO/detail/:mpdId',
    [
         checkJwt,
         checkRole(feature, [
             ACTIONS.ALL,
             ACTIONS.VIEW_ONE
         ])
    ],
    maintenancePlanDetailController.getOneMaintenancePlanDetailsWithActivities);  
    
    router.post('/endWO/:mpdId',
     [
        checkJwt,
        checkRole(feature, [
             ACTIONS.ALL,
             ACTIONS.VIEW_ONE
         ])
     ],
     maintenancePlanDetailController.endMaintenancePlanDetail);

     router.post('/cancelWO/:mpdId',
     [
        checkJwt,
        checkRole(feature, [
             ACTIONS.ALL,
             ACTIONS.VIEW_ONE
         ])
     ],
     maintenancePlanDetailController.cancelMaintenancePlanDetail);
export default router;