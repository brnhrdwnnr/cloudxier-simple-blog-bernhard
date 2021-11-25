const errorHandler = (err, req, res, next) => {
	let code = 500;
	let msg = "Internal server error";

	if (err.name === "SequelizeValidationError") {
		code = 400;
		msg = err.errors[0].message;
	} else if (err.name === "SequelizeUniqueConstraintError") {
		code = 400;
		msg = err.errors[0].message;
	} else if (err.name === "BlogNotFound") {
		code = 404;
		msg = "Blog Not Found";
	} else if (err.name === "CommentNotFound") {
		code = 404;
		msg = "Comment Not Found";
	} else if (err.name === "BadRequest") {
		code = 400;
		msg = "Bad Request";
	} else if (err.name === "FileTooBig") {
		code = 400;
		msg = "File Size Exceeded";
	} else if (err.name === "FileTypeNotSupported") {
		code = 400;
		msg = "File Type is Not Supported";
	} else if (err.name === "FileUploadFailed") {
		code = 400;
		msg = "File Upload is Failed";
	}
	res.status(code).json({ message: msg });
};

module.exports = errorHandler;
