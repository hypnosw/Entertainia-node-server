import model from "./model.js";

export const findAllLikes = () => model.find();
export const createUserLikesPost = (userId, postId) =>
  model.create({ user: userId, post: postId });
// export const deleteUserLikesAlbum = (userId, albumId) =>
//   model.deleteOne({ user: userId, albumId: albumId });
// export const findUsersThatLikeAlbum = (albumId) =>
//   model.find({ post: postId }).populate("user");
export const findPostsThatUserLikes = (userId) => model.find({ user: userId });