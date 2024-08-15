import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as observationController from './controllers/observation.controller';

const router: Router = Router();
const feature: string = FEATURES.OBSERVATION

router.get('/getAllPaginated/detail',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    observationController.getWorkOrderRequestsPaginated
);

router.get('/detail/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    observationController.getWorkOrderRequest
);

router.get('/getAssets/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    observationController.getAssetsByName
);
router.get('/assetsNonPaginated/getAll',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    observationController.getAssetsNonPaginated
);

router.get('/assetObservations/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    observationController.getObservationsByAsset
);

router.get('/componentObservations/:parentId',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    observationController.getObservationsByComponent
);
 //Se utiliza SEND en lugar de POST para que los operarios puedan realizar observaciones
router.post('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.SEND
        ])
    ],
    observationController.postObservation  
);

router.get('/tag/:tag/fullSearch', 
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    observationController.getAllComponentChildren
);

router.get('/support/compositeParent/:parentTag',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.SEND
        ])
    ],
    observationController.getComponentParent    
);

router.post('/actions/discard/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.SEND
        ])
    ],
    observationController.discardWOR
);

export default router