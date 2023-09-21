/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";

function App() {
	const user = {
		name: "Tom Cook",
		email: "tom@example.com",
		imageUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	};
	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Login", href: "/login" },
		{ name: "Register", href: "/register" },
	];

	const userNavigation = [
		{ name: "Your Profile", href: "#" },
		{ name: "Settings", href: "#" },
		{ name: "Sign out", href: "#" },
	];

	const mailNavigation = [
		{ name: "Inbox", href: "#" },
		{ name: "Spam", href: "#" },
		{ name: "Sent", href: "#" },
		{ name: "Starred", href: "#" },
	];

	return (
		<Main
			navigation={navigation}
			userNavigation={userNavigation}
			mailNavigation={mailNavigation}
			user={user}
		></Main>
	);
}

export default App;
