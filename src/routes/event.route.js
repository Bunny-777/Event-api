import express from "express";
const router = express.Router();
import prisma from '../db'

// Example GET all events
router.get("/", async (req, res) => {
  res.status(200).json({ message: "Event route works!" });
});

router.post("/create", async (req, res) => {
  res.status(200).json({ message: "teri maa ki pooja karu!" });
});

export default router;
