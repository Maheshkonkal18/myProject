import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    date: Date,
    contactInfo: String,
    createdByName: String,
    createdByUsn: String
  },
  { timestamps: true }
);

export default mongoose.model("FoundItem", foundItemSchema);
