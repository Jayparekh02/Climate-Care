import mongoose from "mongoose";

const eventVolunteerSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registeredAt: { type: Date, default: Date.now },
});

export default mongoose.model("EventVolunteer", eventVolunteerSchema);
