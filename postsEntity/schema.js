import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true},
    author:mongoose.Schema.Types.ObjectId,
    body:{
        type:String,
        required:true,
    },
    images:[
        {type:String,
        required:true}
    ],
    numberOfLikes:{
        type:Number,
        default:0
    },
    comment:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            },
            content:{
                type:String,
                required:true
            }
        }
    ],
    postDate:{
        type:Date,
        required:true
    }

}, {collection:"posts"});
export default postSchema;