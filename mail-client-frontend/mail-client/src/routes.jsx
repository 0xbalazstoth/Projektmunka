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

import { HiInbox } from "react-icons/hi";

import { BsSend, BsInbox, BsHouse, BsTrash, BsStar } from "react-icons/bs";
import SentView from "./views/SentView";
import TrashView from "./views/TrashView";
import StarredView from "./views/StarredView";

const routes = [
	{
		name: "Home",
		layout: "/mail",
		path: "home",
		icon: <BsHouse className="h-6 w-6" />,
		component: <HomeView></HomeView>,
	},
	{
		name: "Inbox",
		layout: "/mail",
		path: "inbox",
		icon: <BsInbox className="h-6 w-6" />,
		component: <InboxView></InboxView>,
	},
	{
		name: "Sent",
		layout: "/mail",
		path: "sent",
		icon: <BsSend className="h-6 w-6" />,
		component: <SentView></SentView>,
	},
	{
		name: "Trash",
		layout: "/mail",
		path: "trash",
		icon: <BsTrash className="h-6 w-6" />,
		component: <TrashView></TrashView>,
	},
	{
		name: "Starred",
		layout: "/mail",
		path: "starred",
		icon: <BsStar className="h-6 w-6" />,
		component: <StarredView></StarredView>,
	},
];

export default routes;
