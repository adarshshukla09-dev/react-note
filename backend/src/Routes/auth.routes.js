import express from "express";
import { register, Login, logout } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.post("/logout", logout);

export default router;
