export const login = (req, res) => {
  const { EMAIL, PASSWORD } = req.body;
  if (EMAIL === "test@test.com" && PASSWORD === "123456") {
    return res.status(200).json({
      success: true,
      token: "simulated_token_123",
      message: "Login exitoso"
    });
  }
  return res.status(401).json({ success: false, message: "Credenciales inválidas" });
};

export const magicLink = (req, res) => {
  const { EMAIL } = req.body;
  if (EMAIL) {
    return res.status(200).json({
      success: true,
      message: "Enlace mágico enviado (simulado)"
    });
  }
  return res.status(400).json({ success: false, message: "Email requerido" });
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