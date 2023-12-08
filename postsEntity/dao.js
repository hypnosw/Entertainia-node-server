import model from "./model.js";
import User from "../userEntity/model.js";
// obtain all posts in the DB
export const getAllPosts = () => model.find();

// get all posts in DB in descending order, mostly used for Homepage display
export const getAllSortedPosts = async () => {
  try {
    const allPosts = await model.find();

    console.log(allPosts);
    // sort all posts in descending order
    return allPosts.sort((a, b) => b.numberOfLikes - a.numberOfLikes);
  } catch (error) {
    console.error("Error fetching and sorting posts:", error);
    throw error;
  }
};
// obtain all posts from a certain user
export const getPostsByUserID = async (id) => {
  const response = await model.find({ author: id });
  // console.log("model.find:" + response);
  return response;
};

// find posts based on keywords, mostly used on searching page
// as long as the title contains the keyword
export const getPostsByKeyword = async (keyword) => {
  const keywordsArray = keyword.split(" ");
  // console.log(keywordsArray);
  const keywords = new RegExp(keywordsArray.join("|"), "i");
  // console.log(keywords);
  const result = await model.find({
    title: { $regex: keywords },
  });
  console.log(result);
  return result;
};

export const createUser = (user) => model.create(user);

//create post-Kay
// export const createPost = (post) => model.create(post);
export const createPost = async (post) => {
  try {
    const newPost = await model.create(post);
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const likePost = async (postId, userId) => {
  try {
    // 更新帖子的 numberOfLikes
    const updatedPost = await model.findByIdAndUpdate(
      postId,
      { $inc: { numberOfLikes: 1 } },
      { new: true }
    );

    // 将帖子 ID 添加到用户的 likedPosts 数组中
    await User.findByIdAndUpdate(userId, { $addToSet: { likedPosts: postId } });

    return updatedPost;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

export const getPostsWithLimit = async (startIndex, limit) => {
  const result = await model
    .find({})
    .sort({ numberOfLikes: -1, postDate: -1 })
    .skip(startIndex)
    .limit(limit);

  return result;
};
