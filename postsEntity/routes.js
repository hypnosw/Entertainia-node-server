import * as dao from "./dao.js";

const PostsRoutes = async (app)=>{
    const getPostsByKeyword = async (req, res)=>{
        // console.log('getPostsByKeyword called');
        const {terms} = req.query;
        const response = await dao.getPostsByKeyword(terms);
        res.json(response);
    };

    const getAllPosts = async(req, res)=>{
        res.json(await dao.getAllPosts());
    }
    const getAllSortedPosts = async(req,res)=>{
        res.json(await dao.getAllSortedPosts());
    }
    app.get('/api/search', getPostsByKeyword);
    app.get('/api/posts', getAllPosts);
    app.get('/api/sortedposts', getAllSortedPosts);
};

export default PostsRoutes;
