const express = require("express");
const router = new express.Router();
const User = require("../models/user");
router.post("/user", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.json({
			message: user,
		});
	} catch (er) {
		res.status(400).json({ message: er.message });
	}
});

module.exports = router;
