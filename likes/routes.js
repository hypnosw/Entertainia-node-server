import * as dao from "./dao.js";

function LikesRoutes(app) {
  const findAllLikes = async (req, res) => {};
  const createUserLikesPost = async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const likes = await dao.createUserLikesPost(userId, postId);
    res.json(likes);
  };

  const findPostsThatUserLikes = async (req, res) => {
    const userId = req.params.userId;
    const likes = await dao.findPostsThatUserLikes(userId);
    res.json(likes);
  };
  app.get("/api/likes", findAllLikes);
  app.post("/api/users/:userId/likes/:postId", createUserLikesPost);
  app.get("/api/users/:userId/likes", findPostsThatUserLikes);
}

export default LikesRoutes;