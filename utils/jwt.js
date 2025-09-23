import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt = require('jsonwebtoken');
require('dotenv').config();

class tokenUtils {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET; 
    }

    // Generar un nuevo token
    generarNuevoToken(usuario) {
        const userId = usuario.id || Date.now(); 

        const nuevoToken = jwt.sign(
            { userId }, 
            this.JWT_SECRET, 
            { expiresIn: '10m' } 
        );

        return nuevoToken;
    }

    // Obtener el token desde el header de la solicitud
    obtenerToken(req) {
        try {
            
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(' ')[1]; // Formato: "Bearer <token>"

            // Verificar si el token es válido
            if (!token || token.length < 20) {
                console.error("NO SE PROPORCIONO UN TOKEN VAAALIDO.");
                return null;
            }

            
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return decoded;
        } catch (error) {
            console.error("ERROR AL PROCESAR EL TOKEEEEEN:", error.message);
            return null;
        }
    }

    
    refreshToken(req) {
        const decoded = this.obtenerToken(req);
        if (!decoded) {
            return null;
        }

        // Generar un nuevo token con los mismos datos
        return this.generarNuevoToken({ id: decoded.userId });
    }
}

// Exportar una instancia de la clase
module.exports = new tokenUtils();
