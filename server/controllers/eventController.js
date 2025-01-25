import * as EventService from "../services/eventService.js";

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    await EventService.deleteEvent(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { category, limit } = req.query;
    const events = await EventService.getEvents(category, limit);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    console.log(req.user);
    const event = await EventService.createEvent(req.body, req.user);
    res
      .status(201)
      .json({ message: "Event created  successfully", data: event });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = await EventService.updateEvent(eventId, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(400).json({ message: error.message });
  }
};

export const getMyEventsWithVolunteers = async (req, res) => {
  const userId = req.user._id; // Make sure your authentication middleware adds user info to req.user
  const { searchTerm } = req.query;
  try {
    const events = await EventService.findEventsWithVolunteersByCreator(
      userId,
      searchTerm
    );
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const volunteerForEvent = async (req, res) => {
  const userId = req.user._id; // Assuming the user's ID is attached to the request object
  const { eventId } = req.params; // Extract eventId from the route parameter

  try {
    const volunteer = await EventService.registerUserForEvent(userId, eventId);
    res.status(201).json({
      message: "Volunteer registration successful",
      data: volunteer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export async function getRegisteredEvents(req, res) {
  try {
    const userId = req.user._id; // Assume userID is extracted from JWT token
    const events = await EventService.getRegisteredEventsForUser(userId);
    res.json(events.map((registration) => registration.event));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
