import React, { useRef } from "react";
import { useState } from "react";

const FileInput = () => {
	const [file, setFile] = useState("");
	const inputRef = useRef();
	console.log(file);
	const submitHandler = () => {};
	return (
		<div className="input-box">
			<input
				type="file"
				ref={inputRef}
				onChange={(e) => setFile(e.target.files[0])}
			/>
			<div className="button-box">
				<button onClick={() => inputRef.current.click()}>take a image</button>
				<button onClick={submitHandler}>submit</button>
			</div>
		</div>
	);
};

export default FileInput;
