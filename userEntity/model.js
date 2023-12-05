import usersSchema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("users", usersSchema);
export default model;
