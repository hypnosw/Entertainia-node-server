import model from "./model.js";

// obtain all posts in the DB
export const getAllPosts = () => model.find();

// get all posts in DB in descending order, mostly used for Homepage display
export const getAllSortedPosts =  async ()=> {
    try {
        const allPosts =  await model.find();

        console.log(allPosts);
        // sort all posts in descending order
        return allPosts.sort(
            (a, b) => b.numberOfLikes - a.numberOfLikes);
    } catch (error) {
        console.error("Error fetching and sorting posts:", error);
        throw error;
    }
};
// obtain all posts from a certain user
export const getPostsByUserID =  (id) =>  model.find({"author":id});

// find posts based on keywords, mostly used on searching page
// as long as the title contains the keyword
export const getPostsByKeyword =  async (keyword) => {
    const keywordsArray = keyword.split(' ');
    // console.log(keywordsArray);
    const keywords = new RegExp(keywordsArray.join('|'), 'i');
    // console.log(keywords);
    const result =  await model.find({
                                        "title": { $regex:  keywords}
                                    });
    console.log(result);
    return (result);
}



