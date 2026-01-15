import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema<Lead>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    source: {
      type: String,
      enum: ["Website", "Referral", "Ads", "Social"],
      default: "Website",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Converted", "Lost"],
      default: "New",
    },
    stage: {
      type: String,
      enum: ["Lead", "Qualified", "Proposal"],
      default: "Lead",
    },
  },
  { timestamps: true }
);

const Lead: mongoose.Model<Lead> =
  mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export default Lead;
