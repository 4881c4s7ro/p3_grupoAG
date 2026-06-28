import { Router } from "express";

import * as controller from "../../controllers/obras_sociales.controller.js";

const router = Router();

router.get("/", controller.listar);

router.post("/", controller.crear);

router.put("/:id", controller.editar);

router.delete("/:id", controller.eliminar);

export default router;