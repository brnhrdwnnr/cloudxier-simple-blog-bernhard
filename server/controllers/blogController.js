const { Blog, Comment } = require("../models");

class BlogController {
	static async createBlog(req, res, next) {
		try {
			const { title, authorName, content, imageUrl } = req.body;
			console.log(req.body, "REQ BODY");
			const blog = await Blog.create({
				title,
				authorName,
				content,
				imageUrl,
			});
			res.status(201).json(blog);
		} catch (error) {
			console.log(error);
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
					},
				],
			});
			res.status(200).json(blogs);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
	static async getBlogById(req, res, next) {
		try {
			const { id } = req.params;
			const blog = await Blog.findByPk(id, {
				include: [
					{
						model: Comment,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
			});
			if (!blog) {
				throw { name: "BlogNotFound" };
			}
			res.status(200).json(blog);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
	static async updateBlog(req, res, next) {
		try {
			const { id } = req.params;
			const { title, authorName, content, imageUrl } = req.body;

			let data;
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

			const result = await Blog.update(data, {
				where: { id },
				returning: true,
			});
			if (!result[0]) {
				throw { name: "BlogNotFound" };
			} else {
				if (!result[1][0]) {
					throw { name: "BadRequest" };
				} else {
					res.status(200).json(result[1][0]);
				}
			}
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
	static async deleteBlog(req, res, next) {
		try {
			const { id } = req.params;
			const blog = await Blog.findByPk(id);
			if (!blog) {
				throw { name: "BlogNotFound" };
			}
			await blog.destroy();
			res.status(200).json({
				message: "Successfully deleted blog",
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

module.exports = BlogController;
