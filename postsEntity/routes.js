import * as dao from "./dao.js";
import axios from "axios";
import multer from "multer";
import User from "../userEntity/model.js";
import Post from "../postsEntity/model.js";

const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PostsRoutes = async (app) => {
  const getPostsByKeyword = async (req, res) => {
    const { terms } = req.query;
    const response = await dao.getPostsByKeyword(terms);
    res.json(response);
  };

  const getPostByID = async (req, res) => {
    const { id } = req.query;
    const response = await dao.getPostsByUserID(id);
    res.json(response);
  };

  const getAllPosts = async (req, res) => {
    res.json(await dao.getAllPosts());
  };

  const getAllSortedPosts = async (req, res) => {
    res.json(await dao.getAllSortedPosts());
  };

  const getAPIResults = async (req, res) => {
    try {
      const { terms } = req.query;
      const response = await axios.get(
        `https://www.searchapi.io/api/v1/search?api_key=${API_KEY}&engine=google&q=${terms}`
      );
      res.json(response.data.organic_results);
    } catch (error) {
      res.sendStatus(401);
    }
  };

  const getPostByPostId = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Post.findById(id);
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(403);
    }
  };

  const createPost = async (req, res) => {
    try {
      const { title, body, userId } = req.body;
      const postDate = new Date();

      const images = req.files.map((file) => ({
        data: file.buffer.toString("base64"),
        contentType: file.mimetype,
      }));

      // 创建帖子
      const post = await dao.createPost({
        title,
        body,
        postDate,
        images,
        author: userId,
        numberOfLikes: 0,
        comment: [],
      });

      // 将新帖子的 ID 添加到用户的 posts 数组中
      const newPostId = post._id;
      const result = await User.findByIdAndUpdate(userId, {
        $push: { posts: newPostId },
      });

      console.log(result);
      res.json(post);
    } catch (error) {
      console.error("Error during post creation:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  const likePostRoute = async (req, res) => {
    try {
      const { postIdToLike, userId } = req.body;
      console.log(
        "Received like request for postId:",
        postIdToLike,
        "from userId:",
        userId
      );
      const user = await User.findById(userId);

      if (user.likedPosts.includes(postIdToLike)) {
        console.log("!!User has already liked this post.");
        return res
          .status(409)
          .json({ message: "You have already liked this post." });
      }
      const updatedPost = await dao.likePost(postIdToLike, userId);

      const newUser = await User.findById(userId);
      req.session["currentUser"] = newUser;
      console.log("Post liked successfully. Updated post:", updatedPost);
      res.json(updatedPost);
    } catch (error) {
      console.error("Error liking post:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  const getPostsWithLimit = async (req, res) => {
    let startIndex = req.query.start;
    let limit = req.query.limit;
    res.json(await dao.getPostsWithLimit(startIndex, limit));
  };

  const createCommentForPost = async (req, res) => {
    try {
      const { content, userId, postId, userNickname } = req.body;
      const currentDate = new Date();
      const commentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      const result = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comment: {
              userId: userId,
              userNickname: userNickname,
              content: content,
              commentDate: commentDate,
            },
          },
        },
        { new: true }
      );
      // Send the response back to the client
      res.json(result);
    } catch (error) {
      console.error("Error during create comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  app.get("/api/postsbyid", getPostByID);
  app.get("/api/search-api-posts", getAPIResults);
  app.get("/api/search-organics", getPostsByKeyword);
  app.get("/api/posts", getAllPosts);
  app.get("/api/sortedposts", getAllSortedPosts);
  app.get("/api/sorted-posts-with-limit", getPostsWithLimit);
  app.post("/api/posts", upload.array("images", 1), createPost);
  app.post("/api/comment", createCommentForPost);
  app.get("/api/posts/:id", getPostByPostId);
  app.post("/api/posts/like", likePostRoute);
};

export default PostsRoutes;
