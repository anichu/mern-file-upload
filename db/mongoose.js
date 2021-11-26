const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://anis:anis@devconnector.z7qho.mongodb.net/mern-file-upload?retryWrites=true&w=majority",
		{}
	)
	.then((res) => console.log("Connected to DB"))
	.catch((e) => console.log(e));
