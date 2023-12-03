import model from "./model.js";

// obtain all posts in the DB
export const getAllPosts = async () => await model.find();

// get all posts in DB in descending order, mostly used for Homepage display
export const getAllSortedPosts = async ()=> {
    try {
        const allPosts = await model.find();
        // sort all posts in descending order
        return allPosts.sort(
            (a, b) => b.numberOfLikes - a.numberOfLikes);
    } catch (error) {
        console.error("Error fetching and sorting posts:", error);
        throw error;
    }
};
// obtain all posts from a certain user
export const getPostsByUserID = async (id) => await model.find({"author":id});

// find posts based on keywords, mostly used on searching page
// as long as the title contains the keyword
export const getPostsByKeyword = async (keyword) => {
    const keywordsArray = keyword.split(' ');
    return (await model.find({
                                 "title": { $regex: new RegExp(keywordsArray.join('|'), 'i') }
                             }));
}



