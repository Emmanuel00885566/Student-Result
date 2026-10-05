import express from "express";
import {
  assignTeacher,
  getAssignmentsForTeacher,
  getAssignmentsForClass,
  removeAssignment,
} from "../controllers/teacherAssignment.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.post("/", assignTeacher);
router.get("/teacher/:teacherId", getAssignmentsForTeacher);
router.get("/class/:classId", getAssignmentsForClass);
router.delete("/:id", removeAssignment);

export default router;