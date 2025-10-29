import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "http://localhost";

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${HOST}:${PORT}`);
});

