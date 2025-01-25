import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  resourceLink: { type: String, required: true },
  resourceType: { type: String, enum: ["article", "video"], required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
