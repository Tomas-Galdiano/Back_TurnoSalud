const tokenUtils = require('../utils/jwt'); // Importar 

const authMiddleware = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado.' });
        }

        
        const decoded = tokenUtils.obtenerToken(req);

        if (!decoded) {
            return res.status(401).json({ message: 'Token inválido o expirado.' });
        }

        
        req.user = decoded;

        // Continuar con el siguiente middleware o controlador
        next();
    } catch (error) {
        console.error('Error en authMiddleware:', error.message);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = authMiddleware;

// PUEDO AGREGAR UNA LOGICA PARA VERIFICAR POR ROLES QUE TENGA EL FRONT (EJ: ADMIN,USUARIO,INTERNAUTAS)
//antes deberia validar el front el token de supabase con la clave publica
//recordar que supabase ofrece token con roles y generar roles en la bd 
