import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { getLeads } from "../controllers/lead.controller.js";

const router = Router();

router.get("/", authenticate, getLeads);

export default router;
