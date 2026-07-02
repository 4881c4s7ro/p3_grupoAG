import { Router } from 'express';
import * as controller from '../controllers/especialidades.controller.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.get(
    '/',
    [verificarToken, permitirRoles(2, 3)],
    controller.getAll
);

router.get(
    '/:id',
    [verificarToken, permitirRoles(2, 3)],
    controller.getById
);

router.post(
    '/',
    [verificarToken, permitirRoles(3)],
    controller.create
);

router.put(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.update
);

router.delete(
    '/:id',
    [verificarToken, permitirRoles(3)],
    controller.remove
);

export default router;