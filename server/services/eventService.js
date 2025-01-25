// src/services/eventServices.js
import Event from "../models/eventModel.js"; // Import your Event model
import Volunteer from "../models/volunteerModel.js"; // Import your Volunteer model

export const deleteEvent = async (eventId) => {
  return await Event.findByIdAndDelete(eventId);
};

export const getEvents = async (category, limit) => {
  const query = {
    date: { $gte: new Date() },
  };
  if (category) {
    query.category = category;
  }
  return await Event.find(query).limit(Number(limit));
};

export const createEvent = async (eventData, user) => {
  const newEvent = new Event({
    ...eventData,
    createdBy: user._id,
  });
  return await newEvent.save();
};

export const updateEvent = async (eventId, eventData) => {
  return await Event.findByIdAndUpdate(eventId, eventData, { new: true });
};

export async function findEventsWithVolunteersByCreator(creatorId, searchTerm) {
  try {
    let query = { createdBy: creatorId };
    // First find all events created by this NGO
    if (searchTerm && searchTerm.trim() !== "") {
      query.$or = [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { category: { $regex: new RegExp(searchTerm, "i") } },
      ];
    }

    const events = await Event.find(query)
      .populate("createdBy", "name email") // Assuming you still want the creator details
      .lean();

    // Loop over each event and get volunteers
    for (let event of events) {
      const registrations = await Volunteer.find({
        event: event._id,
      }).populate("user", "name email"); // Only fetch necessary fields

      event.volunteers = registrations.map((reg) => reg.user);
    }

    return events;
  } catch (error) {
    throw error;
  }
}
export const registerUserForEvent = async (userId, eventId) => {
  const newVolunteer = new Volunteer({
    user: userId,
    event: eventId,
  });
  await newVolunteer.save();
  return newVolunteer.populate("event");
};

export const getRegisteredEventsForUser = async (userId) => {
  return await Volunteer.find({ user: userId }).populate("event");
};
