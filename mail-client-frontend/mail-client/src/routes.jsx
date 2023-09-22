import React from "react";

import HomeView from "./views/HomeView";
import InboxView from "./views/InboxView";

import {
	MdHome,
	MdOutlineShoppingCart,
	MdBarChart,
	MdPerson,
	MdLock,
} from "react-icons/md";

const routes = [
	{
		name: "Home",
		layout: "/mail",
		path: "home",
		icon: <MdLock className="h-6 w-6" />,
		component: <HomeView></HomeView>,
	},
	{
		name: "Inbox",
		layout: "/mail",
		path: "inbox",
		icon: <MdLock className="h-6 w-6" />,
		component: <InboxView></InboxView>,
	},
];

export default routes;
