import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

// Habilita CORS con configuraciones por defecto
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Tus rutas
app.use("/api", routes);

export default app;
