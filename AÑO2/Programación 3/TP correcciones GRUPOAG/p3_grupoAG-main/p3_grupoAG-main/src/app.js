import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import authRoutes from "./routes/v1/auth.routes.js";
import turnosRoutes from "./routes/v1/turnos.routes.js";
import especialidadesRoutes from "./routes/v1/especialidades.routes.js";
import medicosRoutes from "./routes/v1/medicos.routes.js";
import obrasSocialesRoutes from "./routes/v1/obras_sociales.routes.js";
import estadisticasRoutes from "./routes/v1/estadisticas.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// CONFIGURACIÓN SWAGGER
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Turnos',
            version: '1.0.0',
            description: 'Documentación de la API'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/v1/*.js']
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// RUTAS
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/especialidades', especialidadesRoutes);
app.use("/api/v1/medicos", medicosRoutes);
app.use("/api/v1/obras_sociales", obrasSocialesRoutes);
app.use("/api/v1/estadisticas", estadisticasRoutes);

app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: 'Ruta no encontrada'
    });
});

export default app;