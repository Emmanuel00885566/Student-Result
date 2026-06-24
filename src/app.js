import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { authenticate, authorize } from "./middlewares/auth.middleware.js";
import classRoutes from "./routes/class.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);

app.get("/api/test-protected", authenticate, authorize("admin"), (req, res) => {
  res.status(200).json({ message: "You are an authenticated admin", user: req.user });
});
app.use("/api/classes", classRoutes);


export default app;
