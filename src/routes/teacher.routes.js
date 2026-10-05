import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  deleteTeacher,
} from "../controllers/teacher.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.post("/", createTeacher);
router.get("/", getTeachers);
router.get("/:id", getTeacherById);
router.delete("/:id", deleteTeacher);

export default router;