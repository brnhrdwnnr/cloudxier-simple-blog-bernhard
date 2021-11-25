const express = require("express");
const router = express.Router();
const blogRouter = require("./blogRouter");
const commentRouter = require("./commentRouter");
const errorHandler = require('../middlewares/errorHandler');

router.use("/blogs", blogRouter);
router.use("/comments", commentRouter);

router.use(errorHandler)

module.exports = router;
