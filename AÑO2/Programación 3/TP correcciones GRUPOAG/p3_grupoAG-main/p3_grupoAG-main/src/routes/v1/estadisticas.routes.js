import { Router } from "express";

import * as controller from "../../controllers/estadisticas.controller.js";

const router = Router();

router.get("/", controller.obtenerEstadisticas);

router.get("/pdf", controller.generarPDF);

export default router;