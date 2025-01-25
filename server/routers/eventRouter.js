// src/routes/eventRouter.js
import express from "express";
import {
  deleteEvent,
  getEvents,
  createEvent,
  updateEvent,
  getMyEventsWithVolunteers,
  volunteerForEvent,
  getRegisteredEvents,
} from "../controllers/eventController.js"; // Import your event controllers
import {
  authenticateToken,
  checkUserType,
} from "../middlewares/authMiddleware.js"; // Assuming you have authentication middleware

const router = express.Router();

router.get("/", authenticateToken, getEvents);
router.post("/", authenticateToken, checkUserType("ngo"), createEvent);
router.delete(
  "/:eventId",
  authenticateToken,
  checkUserType("ngo"),
  deleteEvent
);
router.put("/:eventId", authenticateToken, checkUserType("ngo"), updateEvent);
router.get(
  "/my-events",
  authenticateToken,
  checkUserType("ngo"),
  getMyEventsWithVolunteers
);
router.post(
  "/volunteer/:eventId",
  authenticateToken,
  checkUserType("general"),
  volunteerForEvent
);
router.get("/registered-events", authenticateToken, getRegisteredEvents);

export default router;
