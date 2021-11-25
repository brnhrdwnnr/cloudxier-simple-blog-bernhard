const { Blog, Comment } = require("../models");

class BlogController {
	static async createBlog(req, res, next) {
		try {
			const { title, authorName, content, imageUrl } = req.body;
			console.log(req.body, "REQ BODY")
			const blog = await Blog.create({ 
				title, 
				authorName, 
				content, 
				imageUrl 
			});
			res.status(201).json(blog);
		} catch (error) {
			console.log(error)
			next(error);
		}
	}
	static async getAllBlogs(req, res, next) {
		try {
			const blogs = await Blog.findAll({
				include: [
					{
						model: Comment,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					}
				]
			});
			res.status(200).json(blogs);
		} catch (error) {
			console.log(error)
			next(error);
		}
	}
	static async getBlogById(req, res, next) {
		try {
			const blog = await Blog.findByPk(req.params.id, {
				include: [
					{
						model: Comment,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					}
				]
			});
			if (!blog) {
				res.status(404).json({
					message: "Blog not found",
				});
			}
			res.status(200).json(blog);
		} catch (error) {
			next(error);
		}
	}
	static async updateBlog(req, res, next) {
		try {
			const blog = await Blog.findByPk(req.params.id);
			const { title, authorName, content, imageUrl } = req.body;
			let data
			if (!imageUrl) {
				data = {
					title,
					authorName,
					content,
				};
			} else {
				data = {
					title,
					authorName,
					content,
					imageUrl,
				};
			}
			if (!blog) {
				res.status(404).json({
					message: "Blog not found",
				});
			}
			await blog.update(req.body);
			res.status(200).json(blog);
		} catch (error) {
			next(error);
		}
	}
	static async deleteBlog(req, res, next) {
		try {
			const blog = await Blog.findByPk(req.params.id);
			if (!blog) {
				res.status(404).json({
					message: "Blog not found",
				});
			}
			await blog.destroy();
			res.status(200).json({
				message: "Successfully deleted blog",
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = BlogController;
