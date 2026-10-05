import express from "express";
import {
  createTerm,
  getTerms,
  getTermById,
  updateTerm,
  deleteTerm,
} from "../controllers/term.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.post("/", createTerm);
router.get("/", getTerms);
router.get("/:id", getTermById);
router.put("/:id", updateTerm);
router.delete("/:id", deleteTerm);

export default router;