import multer from 'multer';
import path from 'path';

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Las fotos se guardarán en una carpeta llamada 'uploads' en la raíz del proyecto
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Le asignamos un nombre único usando la fecha actual + la extensión original de la foto
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro de seguridad para aceptar SOLO imágenes
const fileFilter = (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png/;
    const extname = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
    const mimetype = tiposPermitidos.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen (.jpg, .jpeg, .png)'));
    }
};

// Exportamos el middleware configurado con un límite de tamaño de 2MB
export const uploadFoto = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 Megabytes
    fileFilter: fileFilter
}).single('foto'); // El campo en Postman/Frontend se tendrá que llamar 'foto'