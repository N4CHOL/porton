import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as OperatorNotificatiosController from '../operator-notifications/controllers/operator-notifications.controller'


const router: Router = Router();
const feature: string = FEATURES.OPERATOR_NOTIFICATIONS;

router.post('/',
    [

    ],
    OperatorNotificatiosController.postOperatorNotificatios
);

router.get('/',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    OperatorNotificatiosController.getOperatorNotifications
);


router.get('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
    OperatorNotificatiosController.getOperatorNotification
);

router.get('/component/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.VIEW_ONE
        ])
    ],
    OperatorNotificatiosController.getComponentNotifications
);


export default router;