import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "../controllers/userControllers.js";

router.get("/register", registerUser);
router.post("/login", loginUser);

export default router;
