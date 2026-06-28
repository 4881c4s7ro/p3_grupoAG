const express = require("express");
const router = express.Router();

const controller = require("../../controllers/medicos.controller");
const { verifyToken, authorizeRoles } = require("../../middlewares/auth.middleware");

router.get("/", verifyToken, controller.listar);

router.get(
    "/especialidad/:id",
    verifyToken,
    controller.listarPorEspecialidad
);

router.post(
    "/especialidades",
    verifyToken,
    authorizeRoles(3),
    controller.asociarEspecialidad
);

router.post(
    "/obras-sociales",
    verifyToken,
    authorizeRoles(3),
    controller.asociarObraSocial
);

module.exports = router;