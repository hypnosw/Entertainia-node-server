import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    default: "Unknown User",
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  enterpriseName: {
    type: String,
  },

  nickname: {
    type: String,
    default: "Unknown User",
  },
  profilePicture: {
    type: "BinData",
    default: "gf1UcxdHTJ2HQ/EGQrO7mQ==",
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
  role: {
    type: String,
    enum: ["ENTERPRISE"],
    default: "ENTERPRISE",
    required: true,
  },
});

export default schema;
