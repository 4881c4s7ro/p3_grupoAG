import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/auth.routes.js';
import turnosRoutes from './routes/turnos.routes.js';
import especialidadesRoutes from './routes/especialidades.routes.js';

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
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// RUTAS
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/especialidades', especialidadesRoutes);

app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: 'Ruta no encontrada'
    });
});

export default app;