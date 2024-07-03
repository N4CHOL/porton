import { Router } from "express";
import { checkJwt } from "../shared/middleware/checkJwt";
import { checkRole } from "../shared/middleware/checkRole";
import * as physicalComponentController from './controllers/physical-component.controller';


const router: Router = Router();

router.get('/',
    [],
    physicalComponentController.getAllPhysicalComponents
)

router.get('/paginated',
    [],
    physicalComponentController.getPhysicalComponents
);

router.get('/:id',
    [],

    physicalComponentController.getPhysicalComponent
);

router.post('/',
    [

    ],
    physicalComponentController.postPhysicalComponent
);

router.put('/:id',
    [],
    physicalComponentController.putPhysicalComponent
)

router.delete('/:id',
    [],
    physicalComponentController.deletePhysicalComponent
);

export default router;