import adminsSchema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("admins", adminsSchema);
export default model;
