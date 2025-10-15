import express from "express";
const router = express.Router();

// Example GET all users
router.get("/", async (req, res) => {
  res.status(200).json({ message: "User route works!" });
});

export default router;
