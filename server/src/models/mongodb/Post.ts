import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  club: { type: String, required: true},
  picture: { type: String, required: true },
  isPublic: { type: Boolean, required: true, default: false},
  created_at: { type: Date, default: Date.now },
});

const PostModel = model("Post", postSchema);

export default PostModel;
