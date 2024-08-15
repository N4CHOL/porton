import { Router } from "express";
import * as templateMPDController from "./controllers/template-maitenance-plan.controller";

const router: Router = Router();

router.get("/", [], templateMPDController.getTemplatesMPD);

router.get("/list", [], templateMPDController.getTemplatesMPDList);

router.get("/:id", [], templateMPDController.getTemplateMPD);

router.post("/", [], templateMPDController.postTemplateMPD);

router.put("/:id", [], templateMPDController.putTemplateMPD);

router.delete("/:id", [], templateMPDController.deleteTemplateMPD);

export default router;
