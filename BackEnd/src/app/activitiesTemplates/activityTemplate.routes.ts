import { Router } from 'express';
import { ACTIONS, FEATURES } from '../../environments/constants';
import { checkJwt } from '../shared/middleware/checkJwt';
import { checkRole } from '../shared/middleware/checkRole';
import * as activityTemplateController from './controllers/activityTemplate.controller';

const feature = FEATURES.ACTIVITY_TEMPLATE;
const router: Router = Router();
//PAGINADO
router.get('/paged',
  [
    checkJwt,
    checkRole(feature, [
      ACTIONS.ALL,
      ACTIONS.LIST
    ]),
  ],
  activityTemplateController.getActivitiesTemplatePaged)

//SIN PAGINAR
router.get('/',
  [
    checkJwt,
    checkRole(feature, [
      ACTIONS.ALL,
      ACTIONS.LIST
    ]),
  ],
  activityTemplateController.getActivitiesTemplate)

// SIN PAGINAR - POR ORDEN DE TRABAJO
router.get('/wo',
  [
    // checkJwt,
    // checkRole(feature, [
    //   ACTIONS.ALL,
    //   ACTIONS.LIST
    // ])
  ],
  activityTemplateController.getActivitiesTemplateByWO)

//INDIVIDUAL
router.get('/:id',
  [
    checkJwt,
    checkRole(feature, [
      ACTIONS.ALL,
      ACTIONS.VIEW_ONE
    ]),
  ],
  activityTemplateController.getActivityTemplate);

router.post('/',
  [
    checkJwt,
    checkRole(feature, [
      ACTIONS.ALL,
      ACTIONS.CREATE
    ]),
  ],
  activityTemplateController.postActivityTemplate);

router.put('/:id',
  [
    checkJwt,
    checkRole(feature, [
      ACTIONS.ALL,
      ACTIONS.EDIT
    ]),
  ],
  activityTemplateController.editActivityTemplate);

router.delete('/:id',
  [
    checkJwt,
    checkRole(feature, [
      ACTIONS.ALL,
      ACTIONS.DELETE
    ]),
  ],
  activityTemplateController.deleteActivityTemplate);


export default router;