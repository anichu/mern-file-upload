import React, { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert, Button, Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	alert: {
		width: 500,
		fontSize: 30,
		paddingTop: 10,
		margin: "auto",
		marginBottom: 20,
	},
});

const FileInput = () => {
	const classes = useStyles();
	const [file, setFile] = useState("");
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState("");
	const [success, setSuccess] = useState(false);
	// const [loading, setLoading] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [image, setImage] = useState([]);

	const inputRef = useRef();
	console.log(file);
	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:4000/user/61a0ebe4d26606a64f4681c8/images",
			responseType: "stream",
		})
			.then((res) => {
				// console.log(res);
				setImage([...res.data.images]);
				console.log(res.data.images);
			})
			.catch((e) => console.log(e));
	}, []);

	const submitHandler = async () => {
		const formData = new FormData();
		formData.append("images", file, file.name);
		setOpen((pre) => !pre);
		axios
			.post(
				"http://localhost:4000/user/upload/61a0ebe4d26606a64f4681c8",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((res) => {
				setOpen((pre) => !pre);
				setError(false);
				setSuccess((pre) => !pre);
			})
			.catch((err) => {
				if (err.response.data.includes("File too large")) {
					setErrorText("File too large");
					setOpen(false);
					setError((pre) => !pre);
					// console.log("File too large");
				} else if (err.response.data.includes("Please upload an image")) {
					setErrorText("Please upload an image");
					setOpen(false);
					setError((pre) => !pre);

					// console.log("Please upload an image");
				} else {
					setErrorText("Something going to wrong,try again");
					setOpen(false);
					setError((pre) => !pre);

					// console.log(err.response.data);
				}
			});
	};
	return (
		<>
			<div className="input-box">
				{error && errorText && (
					<Alert
						severity="error"
						variant="filled"
						onClose={() => {
							setError((pre) => !pre);
						}}
						className={classes.alert}
					>
						{errorText}
					</Alert>
				)}
				{success && (
					<Alert
						variant="filled"
						severity="success"
						onClose={() => {
							setError((pre) => !pre);
							setSuccess((pre) => {
								if (pre === true) {
									return false;
								}
							});
						}}
						className={classes.alert}
					>
						image uploaded
					</Alert>
				)}

				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={open}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				<input
					type="file"
					ref={inputRef}
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<div className="button-box">
					<button onClick={() => inputRef.current.click()} value="upl">
						upload a image
					</button>
					<button onClick={submitHandler}>submit</button>
				</div>
			</div>

			<div>
				{image.map((im) => (
					<img
						src={`http://localhost:4000/data:image/png;base64,${im.image.data}}`}
						alt=""
					/>
				))}
				<p>{image.length}</p>
			</div>
		</>
	);
};

export default FileInput;
