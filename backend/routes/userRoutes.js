import express from "express";
const router = express.Router();

router.get("/", () => console.log("first Route"));

export default router;
