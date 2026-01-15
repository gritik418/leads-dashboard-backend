import { Router } from "express";
import {
  logout,
  userLogin,
  userRegister,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/logout", logout);

export default router;
