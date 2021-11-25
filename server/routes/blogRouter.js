const express = require("express");
const blogRouter = express.Router();
const BlogController = require("../controllers/blogController");
const uploadImages = require("../middlewares/uploadImages");
const { upload } = require("../helpers/multer");

blogRouter.post("/", upload.single("imageUrl"), uploadImages, BlogController.createBlog);
blogRouter.get("/", BlogController.getAllBlogs);
blogRouter.get("/:id", BlogController.getBlogById);
blogRouter.put("/:id", upload.single("imageUrl"), uploadImages, BlogController.updateBlog);
blogRouter.delete("/:id", BlogController.deleteBlog);

module.exports = blogRouter;
