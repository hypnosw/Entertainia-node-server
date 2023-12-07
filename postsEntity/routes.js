import * as dao from "./dao.js";
import axios from "axios";
import multer from "multer"; //这个用来处理文件上传
import User from '../userEntity/model.js';

const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;


const storage = multer.memoryStorage(); // 在内存中存储文件
const upload = multer({ storage: storage });

const PostsRoutes = async (app)=>{
    const getPostsByKeyword = async (req, res)=>{
        // console.log('getPostsByKeyword called');
        const {terms} = req.query;
        const response = await dao.getPostsByKeyword(terms);
        res.json(response);
    };

    const getPostByID = async(req, res)=>{
        const {id} = req.query;
        const response = await dao.getPostsByUserID(id);
        res.json(response);
    }

    const getAllPosts = async(req, res)=>{
        res.json(await dao.getAllPosts());
    }
    const getAllSortedPosts = async(req,res)=>{
        res.json(await dao.getAllSortedPosts());
    };
    const getAPIResults = async (req, res)=>{
        try{
            const {terms} = req.query;
            const response = await axios.get(
                `https://www.searchapi.io/api/v1/search?api_key=${API_KEY}&engine=google&q=${terms}`
            );
            // console.log(results.organic_results);
            res.json(response.data.organic_results);
        } catch(error){
            res.sendStatus(401);
        }

    };
    const createPost = async (req, res) => {
        try {
          const { title, body, userId } = req.body;
          const currentDate = new Date();
          const postDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
          const images = req.files.map((file) => ({
            data: file.buffer.toString("base64"),
            contentType: file.mimetype,
          }));
          const post = await dao.createPost({
            title,
            body,
            postDate,
            images,
            author: userId, 
            numberOfLikes:0,
            comment: []
          });

          const newPostId = post._id;
          // await User.findByIdAndUpdate(userId, { $push: { posts: newPostId } });
          const result = await User.findByIdAndUpdate(userId, { $push: { posts: newPostId } });
          console.log(result);
          res.json(post);
        } catch (error) {
          console.error("Error during post creation:", error);
          res.status(500).json({ success: false, message: "Internal server error" });
        }
      };

      app.get('/api/postsbyid', getPostByID);
      app.get('/api/search-api-posts', getAPIResults);
      app.get('/api/search-organics', getPostsByKeyword);
      app.get('/api/posts', getAllPosts);
      app.get('/api/sortedposts', getAllSortedPosts);
      app.post("/api/posts", upload.array("images", 1), createPost);
      // 1 是最大上传文件数
    
    }
    
    export default PostsRoutes;
    