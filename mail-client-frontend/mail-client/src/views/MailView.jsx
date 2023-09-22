import React from "react";
import { Link } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
	IoMdNotificationsOutline,
	IoMdInformationCircleOutline,
} from "react-icons/io";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "../routes";

const MailView = () => {
	const location = useLocation();
	const [open, setOpen] = React.useState(true);
	const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

	React.useEffect(() => {
		window.addEventListener("resize", () =>
			window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
		);
	}, []);
	React.useEffect(() => {
		getActiveRoute(routes);
	}, [location.pathname]);

	const getActiveRoute = (routes) => {
		let activeRoute = "Main Dashboard";
		for (let i = 0; i < routes.length; i++) {
			if (
				window.location.href.indexOf(
					routes[i].layout + "/" + routes[i].path
				) !== -1
			) {
				setCurrentRoute(routes[i].name);
			}
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (
				window.location.href.indexOf(
					routes[i].layout + routes[i].path
				) !== -1
			) {
				return routes[i].secondary;
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === "/admin") {
				return (
					<Route
						path={`/${prop.path}`}
						element={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};

	return (
		<div className="flex h-full w-full">
			{/* Sidebar */}
			<Sidebar open={open} onClose={() => setOpen(false)}></Sidebar>

			<div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
				{/* Main content */}
				<main
					className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
				>
					{/* Navbar */}
					<div className="h-full">
						<Navbar
							onOpenSidenav={() => setOpen(true)}
							secondary={getActiveNavbar(routes)}
						></Navbar>
						<div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
							<Routes>
								{getRoutes(routes)}{" "}
								<Route
									path="/"
									element={
										<Navigate to="/mail" replace></Navigate>
									}
								></Route>
							</Routes>
						</div>
						<div className="p-3">
							<Footer></Footer>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default MailView;
