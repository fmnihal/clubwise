import { Schema, model } from "mongoose";

const bookRoomSchema = new Schema({
  description: { type: String, required: true },
  date: { type: String, required: true },
  club: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const BookRoomModel = model("BookRoom", bookRoomSchema);

export default BookRoomModel;
