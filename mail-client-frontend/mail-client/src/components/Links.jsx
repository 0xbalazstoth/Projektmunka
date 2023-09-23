import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsDash } from "react-icons/bs";

const Links = (props) => {
	let location = useLocation();

	const { routes, handleLinkClick } = props;

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		return location.pathname === routeName;
	};

	const createLinks = (routes) => {
		return routes.map((route, index) => {
			if (route.layout === "/mail") {
				const linkTo = route.layout + "/" + route.path;

				return (
					<Link
						key={index}
						to={linkTo}
						onClick={handleLinkClick}
						className={`relative mb-3 flex hover:cursor-pointer ${
							activeRoute(linkTo) ? "active-link" : ""
						}`}
					>
						<li
							className="my-[3px] flex cursor-pointer items-center px-8"
							key={index}
						>
							<span
								className={`${
									activeRoute(linkTo)
										? "font-bold text-[#0e2234] dark:text-white"
										: "font-medium text-gray-600"
								}`}
							>
								{route.icon ? route.icon : <BsDash />}{" "}
							</span>
							<p
								className={`leading-1 ml-4 flex ${
									activeRoute(linkTo)
										? "font-bold text-navy-700 dark:text-white"
										: "font-medium text-gray-600"
								}`}
							>
								{route.name}
							</p>
						</li>
						{activeRoute(linkTo) ? (
							<div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-[#0e2234] dark:bg-[#0e2234]" />
						) : null}
					</Link>
				);
			}

			return null;
		});
	};

	// BRAND
	return createLinks(routes);
};

export default Links;
