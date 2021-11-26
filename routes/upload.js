const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");
const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|JPG)$/)) {
			return cb(new Error("Please upload an image"));
		}
		cb(undefined, true);
	},
});

router.post("/user/upload/:id", upload.single("images"), async (req, res) => {
	const { id } = req.params;
	try {
		const buffer = await sharp(req.file.buffer)
			.resize({
				width: 250,
				height: 250,
			})
			.png()
			.toBuffer();
		const user = await User.findById(id);
		user.images = user.images.concat({ image: buffer });
		await user.save();
		res.json({
			user,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
});

router.get("/user/:id/images", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.images) {
			throw new Error();
		}
		res.set("Content-Type", "image/png");
		res.send(user);
	} catch (e) {
		res.status(404).send();
	}
});
module.exports = router;
