import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { getDashboardAnalytics } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/stats", authenticate, getDashboardAnalytics);

export default router;
