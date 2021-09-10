import express from "express";

const router = express.Router();

import {
  registerUser,
  loginUser,
  addBalance,
  logoutUser,
} from "../controllers/userControllers.js";

import { isAuthenticatedUser } from "../middlewares/auth.js";

router.get("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticatedUser, logoutUser);

router.post("/addbalance", isAuthenticatedUser, addBalance);

// router.post("/createstock", createStock);

export default router;
