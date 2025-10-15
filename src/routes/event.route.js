import express from "express";
import {
  createEvent,
  getEventDetails,
  registerForEvent,
  cancelRegistration,
  listUpcomingEvents,
  eventStats
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/create", createEvent);
router.get("/:id", getEventDetails);
router.post("/register", registerForEvent);
router.post("/cancel", cancelRegistration);
router.get("/upcoming/all", listUpcomingEvents);
router.get("/:id/stats", eventStats);

export default router;
