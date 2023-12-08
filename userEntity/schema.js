import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // don't need default because it's required on signup
      // default: "Unknown User",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      default: "Unknown User",
    },
    profilePicture: {
      type: String,
      default: "data:image/jpeg;base64,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",
    },
    personalBio: {
      type: String,
      default: "Tell us more about you!",
    },
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // type:String,
        ref: "posts",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    followingCount: {
      type: Number,
      default: 0,
    },
    followersCount: {
      type: Number,
      default: 0,
    },

    employeeID: {
      type: String,
    },
    enterpriseName: {
      type: String,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN", "ENTERPRISE"],
      default: "ADMIN",
      required: true,
    },
  },
  { collection: "users" }
);

export default usersSchema;
