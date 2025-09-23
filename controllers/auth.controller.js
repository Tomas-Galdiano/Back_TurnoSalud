import supabase from "../config/supabase.js";

export const loginWithPassword = async (req, res) => {
  const { email, password } = req.body;

  // Validar
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Correo electrónico inválido." });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({
      message: "Login exitoso",
      session: data.session,
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const sendMagicLink = async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "ACA IRIA LA URL DEL DASHBOARD",
    },
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Magic link enviado al correo" });
};
