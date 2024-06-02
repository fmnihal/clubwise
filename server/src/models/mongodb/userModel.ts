import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false},
  created_at: { type: Date, default: Date.now },
});

const UserModel = model("User", userSchema);

export default UserModel;
