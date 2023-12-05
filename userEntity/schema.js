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
      type: Buffer,
      default: Buffer.from("gf1UcxdHTJ2HQ/EGQrO7mQ==", "base64"),
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
