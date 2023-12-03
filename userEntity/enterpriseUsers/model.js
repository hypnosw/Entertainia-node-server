import enterpriseUsersSchema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("enterpriseUsers", enterpriseUsersSchema);
export default model;
