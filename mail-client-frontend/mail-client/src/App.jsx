import React, { useState, useEffect } from "react";
import {
	Routes,
	Route,
	BrowserRouter,
	Navigate,
	useNavigate,
} from "react-router-dom";
import MailView from "./views/MailView";
import NotFound from "./views/NotFound";
import LoginView from "./views/LoginView";
import UserContext from "./contexts/UserContext";
import { appFetchCall } from "./handlers/api";
import CreateAccountView from "./views/CreateAccountView";
import toast, { Toaster } from "react-hot-toast";

function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const history = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			if (localStorage.getItem("tkn")) {
				const meEndpoint = `/api/users/me`;

				try {
					// Make API call to fetch user data
					const userResponse = await appFetchCall(meEndpoint);

					// Update user state with the fetched data
					setUser(userResponse);
				} catch (error) {
					console.error("Error fetching user:", error);
				} finally {
					setLoading(false);
				}
			} else {
				console.log("no token");
				setLoading(false);
			}
		};

		fetchUser();
	}, [history]);

	if (loading) {
		return null;
	}

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Toaster></Toaster>
			<Routes>
				<Route
					path="login"
					element={user ? <Navigate to="/mail" /> : <LoginView />}
				/>
				<Route
					path="create"
					element={
						user ? (
							<Navigate to="/mail"></Navigate>
						) : (
							<CreateAccountView></CreateAccountView>
						)
					}
				></Route>
				<Route
					path="mail/*"
					element={
						user ? <MailView /> : <Navigate to="/login" replace />
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</UserContext.Provider>
	);
}

export default App;
