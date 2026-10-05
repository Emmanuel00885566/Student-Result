import express from "express";
import {
  assignSubjectToClass,
  getSubjectsForClass,
  removeSubjectFromClass,
} from "../controllers/classSubject.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.post("/", assignSubjectToClass);
router.get("/:classId", getSubjectsForClass);
router.delete("/:classId/:subjectId", removeSubjectFromClass);

export default router;