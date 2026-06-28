import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import especialidadesRoutes from './routes/especialidades.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/especialidades', especialidadesRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'API funcionando'
    });
});

export default app;