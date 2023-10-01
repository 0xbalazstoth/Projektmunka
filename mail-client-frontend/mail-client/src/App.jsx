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

					// Navigate to "/mail" after successful login
					history.push("/mail");
				} catch (error) {
					console.error("Error fetching user:", error);
				} finally {
					// Set loading to false after the fetch operation is complete
					setLoading(false);
				}
			} else {
				console.log("no token");
				// Set loading to false if there's no token
				setLoading(false);
			}
		};

		fetchUser();
	}, [history]);

	// If still loading, you can return a loading indicator or null
	if (loading) {
		return null; // or return a loading spinner
	}

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Routes>
				<Route
					path="login"
					element={user ? <Navigate to="/mail" /> : <LoginView />}
				/>
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
