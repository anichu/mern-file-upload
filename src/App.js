import { AppBar } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./AppBar";
import FileInput from "./FileInput";
import Form from "./Form";

function App() {
	return (
		<BrowserRouter>
			<div className="body">
				<ResponsiveAppBar />
				<Routes>
					<Route path="/" exact element={<FileInput />} />
					<Route path="/signup" exact element={<Form />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
