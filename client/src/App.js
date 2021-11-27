import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddPage from "./pages/AddPage";
import UpdatePage from "./pages/UpdatePage";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

function App() {
	const [loading, setLoading] = useState(false);
	const override = css`
		display: block;
		border-color: red;
		margin-top: 20%;
	`;

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<div className="App">
			{loading ? (
				<PropagateLoader css={override} size={40} color={"#3d2514"} loading={loading} />
			) : (
				<Routes>
					<Route path="/edit/:id" element={<UpdatePage />} />
					<Route path="/detail/:id" element={<Detail />} />
					<Route path="/addpage" element={<AddPage />} />
					<Route path="/" element={<Home />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
