const { Blog, Comment } = require("../models");

class CommentController {
	static async createComment(req, res, next) {
		try {
			const { blogId } = req.params;
			const { comment } = req.body;
			const foundBlog = await Blog.findOne({
				where: {
					id: blogId,
				},
				include: Comment,
			});
			if (!foundBlog) {
				throw { name: "BlogNotFound" };
			}
			const newComment = await Comment.create({
				comment,
				BlogId: blogId,
			});
			res.status(201).json(newComment);
		} catch (error) {
			next(error);
		}
	}
	static async getComments(req, res, next) {
		try {
			const comments = await Comment.findAll();
			res.status(200).json(comments);
		} catch (error) {
			next(error);
		}
	}
	static async deleteComment(req, res, next) {
		try {
			const { id } = req.params;
			const comment = await Comment.findByPk(id);
            if (!comment) {
                throw { name: "CommentNotFound" };
            } else {
                await comment.destroy();
                res.status(200).json({ message: `Comment has been deleted` });
            }
		} catch (error) {
            console.log(error)
			next(error);
		}
	}
}

module.exports = CommentController;
