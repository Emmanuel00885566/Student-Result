import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { authenticate, authorize } from "./middlewares/auth.middleware.js";
import classRoutes from "./routes/class.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import termRoutes from "./routes/term.routes.js";
import classSubjectRoutes from "./routes/classSubject.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import teacherAssignmentRoutes from "./routes/teacherAssignment.routes.js";
import resultRoutes from "./routes/result.routes.js";
import studentRoutes from "./routes/student.routes.js";


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
app.use("/api/subjects", subjectRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/terms", termRoutes);
app.use("/api/class-subjects", classSubjectRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/teacher-assignments", teacherAssignmentRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/students", studentRoutes);

export default app;