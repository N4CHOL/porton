import { Router } from "express";
import { checkJwt } from "./middleware/checkJwt";
import { checkRole } from "./middleware/checkRole";
import * as categoryController from "./controllers/category.controller";

const router: Router = Router();

router.get("/paginated", 
    [

    ],
    categoryController.getCategoriesPage);

router.get("/",
    [   

    ],
categoryController.getCategories);

router.get("/:id",
    [

    ],
    categoryController.getCategory);

router.post("/",
    [

    ],
categoryController.postCategory);

router.put("/:id", 
    [

    ],
    categoryController.putCategory);

router.delete("/:id",
    [

    ], 
    categoryController.deleteCategory);

export default router;