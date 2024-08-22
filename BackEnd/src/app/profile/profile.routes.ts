import { Router } from 'express';
import * as profileController from './controllers/profile.controller'

const router: Router = Router();

router.get(
    '/',
    [

    ],
    profileController.getProfiles
)

export default router;