import express from "express";
import morgan from "morgan";
import corsConfig from "./config/cors.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares globales
app.use(morgan("dev"));
app.use(express.json());
app.use(corsConfig);

// Rutas
app.use("/auth", authRoutes);

export default app;
