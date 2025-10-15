import express from "express";
import userRouter from "./user.route.js";   // ✅ include .js
import eventRouter from "./event.route.js"; // ✅ include .js

const router = express.Router();

// Mount routes
router.use("/users", userRouter);
router.use("/events", eventRouter);

export default router;
