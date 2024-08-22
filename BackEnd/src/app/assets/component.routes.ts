import { Router } from "express";
import { checkJwt } from "../shared/middleware/checkJwt";
import { checkRole } from "../shared/middleware/checkRole";
import * as componentController from './controllers/component.controller';

const router: Router = Router();

router.get('/:id', [
    // checkJwt,
    // checkRole([])
], componentController.getComponentById);

router.get('/tag/:assetId/search',
[

], componentController.getComponentsByString);

router.get('/tag/:tag', [

], componentController.getComponentByTag);

router.get('/tag/:tag/children', [

], componentController.getComponentChildrenByTag);

router.get('/tag/:tag/fullSearch', [

], componentController.getAllComponentChildren);

router.post('/:parentComponentTag', [

], componentController.saveComponent)

router.put('/tag/:tag',[

],componentController.editComponent)

router.delete('/:id',[],componentController.deleteComponent);


export default router;
