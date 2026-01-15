import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { getLeadById, getLeads } from "../controllers/lead.controller.js";

const router = Router();

router.get("/", authenticate, getLeads);

router.get("/:leadId", authenticate, getLeadById);

export default router;
