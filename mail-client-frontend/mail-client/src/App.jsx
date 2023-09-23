/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MailView from "./views/MailView";
import NotFound from "./views/NotFound";

function App() {
	return (
		<Routes>
			<Route path="mail/*" element={<MailView></MailView>}></Route>
			<Route path="*" element={<NotFound></NotFound>}></Route>
		</Routes>
	);
}

export default App;
