import * as dao from "./dao.js";
import axios from "axios";
const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;


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
            res.send('Failed to connect to API');
        }

    };

    app.get('/api/search-api-posts', getAPIResults);
    app.get('/api/search-organics', getPostsByKeyword);
    app.get('/api/posts', getAllPosts);
    app.get('/api/sortedposts', getAllSortedPosts);
};

export default PostsRoutes;
