//import supabase from '../config/supabase.js'; //  cliente  Supabase
import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js'

//variable entonrn
const supaUrl=process.env.UrlGetAll
const key=process.env.ApiKey

const supabase = createClient(supaUrl, key)


export const obtenerUsuarioPorEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('Usuarios')       // nombre  tabla de usuarios
      .select('id, correo, nombre, rol,contraseña') // campos que voy a usaar
      .eq('correo', email)
      .single();              // devuelve  registro

    if (error) {
      console.error("Error al consultar usuario:", error.message);
      return null;
    }

    return data; // { id, email, password, role }
  } catch (err) {
    console.error("error al consultar usuario:", err.message);
    return null;
  }
};