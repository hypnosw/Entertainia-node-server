import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    post: {type: mongoose.Schema.Types.ObjectId, ref: "posts" }
  },
  { collection: "likes" }
);

export default schema;