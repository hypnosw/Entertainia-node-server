import * as dao from "./dao.js";

function LikesRoutes(app) {
  const findAllLikes = async (req, res) => {};
  const createUserLikesPost = async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const likes = await dao.createUserLikesPost(userId, postId);
    res.json(likes);
  };
//   const deleteUserLikesAlbum = async (req, res) => {};
//   const findUsersThatLikeAlbum = async (req, res) => {
//     const postId = req.params.postId;

//     const likes = await dao.findUsersThatLikeAlbum(postId);
//     res.json(likes);
//   };
  const findPostsThatUserLikes = async (req, res) => {
    const userId = req.params.userId;
    const likes = await dao.findAlbumsThatUserLikes(userId);
    res.json(likes);
  };
  app.get("/api/likes", findAllLikes);
  app.post("/api/users/:userId/likes/:postId", createUserLikesPost);
//   app.delete("/api/users/:userId/likes/:postId", deleteUserLikesAlbum);
//   app.get("/api/likes/:postId/users", findUsersThatLikeAlbum);
  app.get("/api/users/:userId/likes", findPostsThatUserLikes);
}

export default LikesRoutes;