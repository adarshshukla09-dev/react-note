import express from "express";
import {
  register,
  Login,
  logout,
  getUser,
} from "../Controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.post("/logout", logout);
router.get("/me", protect, getUser);

export default router;
