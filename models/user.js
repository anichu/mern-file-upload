const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 2,
	},
	password: {
		type: String,
		required: true,
		minlength: 2,
	},
	images: [
		{
			image: {
				type: Buffer,
			},
		},
	],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
