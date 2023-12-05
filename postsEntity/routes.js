import * as dao from "./dao.js";
import multer from "multer"; //这个用来处理文件上传

const storage = multer.memoryStorage(); // 在内存中存储文件
const upload = multer({ storage: storage });

function PostRoutes(app) {
  const createPost = async (req, res) => {
    try {
      const { title, body } = req.body;
      const postDate = new Date();
      const images = req.files.map((file) => ({
        data: file.buffer.toString("base64"),
        contentType: file.mimetype,
      }));
      

      const post = await dao.createPost({
        title,
        body,
        postDate,
        images,
      });

      res.json(post);
    } catch (error) {
      console.error("Error during post creation:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  app.post("/api/posts", upload.array("images", 5), createPost);
  // 5 是最大上传文件数

}

export default PostRoutes;
