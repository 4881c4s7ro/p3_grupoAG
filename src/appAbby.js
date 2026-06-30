import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import turnosRoutes from './routes/turnos_reservas.routes.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Ruta de turnos
app.use('/api/v1/turnos', turnosRoutes);

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: 'Ruta no encontrada'
    });
});

export default app;