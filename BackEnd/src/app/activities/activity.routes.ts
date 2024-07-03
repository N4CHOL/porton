import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as activityController from './controllers/activity.controller';

const feature: string = FEATURES.ACTIVITY;

const router: Router = Router();

router.post('/:mpid',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.CREATE
        ])
    ],
    activityController.postActivity);


router.get('/:mpdId',

    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.LIST
        ])
    ],
    activityController.getActivities);

router.put('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.EDIT
        ])
    ],
    activityController.putActivity);

router.delete('/:id',
    [
        checkJwt,
        checkRole(feature, [
            ACTIONS.ALL,
            ACTIONS.DELETE
        ])
    ],
    activityController.deleteActivity);

router.get('/user/:userId',
    [

    ],
    activityController.getActivitiesByProfile);

router.get('/user/tasks/:activityId',
    [

    ],
    activityController.getOneActivityWithTasks);



router.post('/checkTask/:taskId',
    [

    ],
    activityController.checkTask);  

router.put('/suspendActivity/:id',
    [
        
    ],
    activityController.suspendActivity)

router.post('/resumeActivity/:id',
    [
        
    ],
    activityController.resumeActivity)

router.post('/endActivity/:id',
     [

     ],
     activityController.endActivity);

router.post('/startActivity/:id',
     [

     ],
     activityController.startActivity);

router.post('/cancelActivity/:id',
     [

     ],
     activityController.cancelActivity);

export default router;