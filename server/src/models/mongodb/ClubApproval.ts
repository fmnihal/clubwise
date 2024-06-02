import { Schema, model } from "mongoose";

const clubApprovalSchema = new Schema({
  fullName: { type: String, required: true },
  studentId: { type: String, required: true },
  department: { type: String, required: true },
  programme: { type: String, required: true },
  batch: { type: String, required: true },
  preferredWorkingTeam: { type: String },
  comment: { type: String },
  previousExperience: { type: String },
  contact: { type: String, required: true },
  club: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
  created_at: { type: Date, default: Date.now },
});

const ClubApprovalModel = model("ClubApproval", clubApprovalSchema);

export default ClubApprovalModel;
