import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

import { purchaseStock, sellStock } from "../controllers/stockControllers.js";
router.post("/purchase/:id", isAuthenticatedUser, purchaseStock);
router.post("/sell/:id", isAuthenticatedUser, sellStock);

export default router;
