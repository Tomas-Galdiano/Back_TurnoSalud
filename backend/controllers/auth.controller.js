import { obtenerUsuarioPorEmail } from "../db/Usuarios.js";
import tokenUtils from "../utils/jwt.js";

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supaUrl=process.env.UrlGetAll
const key=process.env.ApiKey

const supabase = createClient(supaUrl, key)

export const login = async (req, res) => {
  const { EMAIL, PASSWORD } = req.body;

  try {
    // Validacion de ejemplo . borrar?
    if (EMAIL === "test@test.com" && PASSWORD === "123456") {
      return res.status(200).json({
        success: true,
        token: "simulated_token_123",
        message: "Login exitoso"
      });
    }

    //  Obtengo usuario real desde la BDDDDDD
    const usuario = await obtenerUsuarioPorEmail(EMAIL);

    console.log("Usuario encontrado:", usuario);
     console.log("Password recibido:", PASSWORD);

    if (!usuario || usuario.contraseña !== PASSWORD) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    // Obtener rol desde la BD (viene de "data" que me envia en al funcion obtenerusuarioporemail)
    const role = usuario.rol || 'usuario'; // default "usuario" (osea si no hay rol iria usuario)

    // Generar token con role
    const token = tokenUtils.generarNuevoToken({ id: usuario.id, role });

    //  Devolver token
    return res.status(200).json({
      success: true,
      token,
      id: usuario.id,
      role: usuario.rol,
      message: "Login exitoso",
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const magicLink = async (req, res) => {
  const { EMAIL } = req.body;

  if (!EMAIL) {
    return res.status(400).json({ success: false, message: "Email requerido" });
  }

  try {
    // accion de supa para enviar desde el correo hacia la pagina front 
    const { data, error } = await supabase.auth.signInWithOtp({
      email: EMAIL,
      options: {
        emailRedirectTo: "http://localhost:3000/magic-link", // PONE EL LINK DEL FRONT ASI TE ENVIA AHI EL ENLACE MAGICOO
      },
    });

    if (error) {
      console.error("Error al enviar el enlace maagico:", error.message);
      return res.status(500).json({ success: false, message: "Error al enviar enlace magico" });
    }

    return res.status(200).json({
      success: true,
      message: "Enlace magico enviado correctamente",
      data,
    });

  } catch (err) {
    console.error("Error inesperado:", err);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;
  console.log("Recibiendo solicitud de reset:", { token, newPassword }); // Depuración
  // Simulación: verifica que el token exista y la contraseña sea válida
  if (token && newPassword && newPassword.length >= 6) {
    return res.status(200).json({
      success: true,
      message: "Contraseña restablecida con éxito (simulado)",
    });
  }
  return res.status(400).json({
    success: false,
    message: "Token inválido o contraseña inválida",
  });
};