import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as activityController from './controllers/activity.controller';

const feature: string = FEATURES.SUSPENSION_REASON;

const router: Router = Router();

router.get('/suspensionReasons',
    [

    ],
    activityController.getSuspensionReasons)
export default router;  