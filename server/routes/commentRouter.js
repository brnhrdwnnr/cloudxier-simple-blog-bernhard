const express = require("express");
const commentRouter = express.Router();
const CommentController = require('../controllers/commentController')

commentRouter.post("/:blogId", CommentController.createComment);
commentRouter.get("/", CommentController.getComments);
commentRouter.delete("/:id", CommentController.deleteComment);


module.exports = commentRouter;
