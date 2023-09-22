/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MailView from "./views/MailView";

function App() {
	return (
		<Routes>
			<Route path="mail/*" element={<MailView></MailView>}></Route>
			<Route path="admin/*" element={<h1>admin</h1>}></Route>
		</Routes>
	);
}

export default App;
