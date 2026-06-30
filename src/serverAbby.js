import app from './appAbby.js';
import 'dotenv/config'; // Carga las variables de entorno automáticamente

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor Abby corriendo y escuchando en http://localhost:${PORT}`);
});