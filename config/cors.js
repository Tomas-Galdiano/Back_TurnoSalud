import cors from "cors";

const corsOptions = {
  origin: ["http:"], // PONER URL DEL FRONT!!
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default cors(corsOptions);