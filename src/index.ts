import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generate";
import authRoutes from "./routes/auth";

const app = express();

const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors());

// Routes configuration
app.use("/auth", authRoutes);
app.use("/generate", generateRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Default route
export default app;
