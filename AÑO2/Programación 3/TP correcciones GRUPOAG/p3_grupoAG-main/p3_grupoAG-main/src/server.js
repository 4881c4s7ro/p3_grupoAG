import app from './app.js';
import 'dotenv/config'; // Carga las variables de entorno automáticamente

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo y escuchando en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});