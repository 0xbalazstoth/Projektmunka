import React from "react";
import HomeView from "./views/HomeView";
import InboxView from "./views/InboxView";
import {
	BsSend,
	BsInbox,
	BsHouse,
	BsTrash,
	BsStar,
	BsSendPlus,
} from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { LuMails } from "react-icons/lu";
import SentView from "./views/SentView";
import TrashView from "./views/TrashView";
import StarredView from "./views/StarredView";
import SpamView from "./views/SpamView";
import AllView from "./views/AllView";
import SendNewMessageView from "./views/SendNewMessageView";
import FadeInWrapper from "./components/FadeInWrapper";

const routes = [
	{
		name: "Home",
		layout: "/mail",
		path: "",
		icon: <BsHouse className="h-6 w-6" />,
		component: <HomeView></HomeView>,
	},
	{
		name: "Send new message",
		layout: "/mail",
		path: "send",
		icon: <BsSendPlus className="h-6 w-6"></BsSendPlus>,
		component: <SendNewMessageView></SendNewMessageView>,
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
	{
		name: "Spam",
		layout: "/mail",
		path: "spam",
		icon: <RiErrorWarningLine className="h-6 w-6" />,
		component: <SpamView></SpamView>,
	},
];

export default routes;
