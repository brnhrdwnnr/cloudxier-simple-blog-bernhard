const FormData = require("form-data");
const axios = require("axios");

const uploadImages = async (req, res, next) => {
	try {
		const file = req.file;
		console.log(file, "FILE")
		if (!file) {
			next();
		} else {
			const parsedFile = file.buffer.toString("base64");
			console.log(parsedFile, "PARSED FILE");
			if (file.size > 255000) {
				throw { name: "FileTooBig" };
			}
			if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/jpg" && file.mimetype !== "image/png") {
				throw { name: "FileTypeNotSupported" };
			}

			const form = new FormData();

			form.append("file", parsedFile);
			form.append("fileName", file.originalname);

			const response = await axios.post("https://upload.imagekit.io/api/v1/files/upload", form, {
				headers: form.getHeaders(),
				auth: { username: process.env.IMAGE_KIT_KEY },
			});
			console.log(response, "RESPONSE")
			if (!response) {
				throw { name: "FileUploadFailed" };
			}
			req.body.imageUrl = response.data.url;
			next();
		}
	} catch (err) {
		next(err);
	}
};

module.exports = uploadImages;
