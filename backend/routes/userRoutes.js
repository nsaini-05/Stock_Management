import express from "express";
const router = express.Router();

import { registerUser } from "../controllers/userControllers.js";

router.get("/register", registerUser);

export default router;
