import express from "express";
import { enterResult, getResultsForClassSubject } from "../controllers/result.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate, authorize("teacher"));

router.post("/", enterResult);
router.get("/", getResultsForClassSubject);

export default router;
