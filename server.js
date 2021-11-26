const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
require("./db/mongoose");

const userRouter = require("./routes/user");
const fileRouter = require("./routes/upload");

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 	})
// );
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(fileRouter);

app.listen(port, () => {
	console.log(`mern-file-upload app listening at http://localhost:${port}`);
});
