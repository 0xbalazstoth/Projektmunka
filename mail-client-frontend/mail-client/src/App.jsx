/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import Sidebar, { SidebarItem } from "./components/SidebarWithContentSeparator";
import { LayoutDashboard } from "lucide-react";
import Main from "./components/Main";

function App() {
	return (
		// <main className="App layout">
		// 	{/* <Sidebar>
		// 		<SidebarItem
		// 			icon={<LayoutDashboard size={20}></LayoutDashboard>}
		// 			text={"Dashboard"}
		// 			alert
		// 		></SidebarItem>
		// 		<SidebarItem
		// 			icon={<LayoutDashboard size={20}></LayoutDashboard>}
		// 			text={"Inbox"}
		// 		></SidebarItem>
		// 		<SidebarItem
		// 			icon={<LayoutDashboard size={20}></LayoutDashboard>}
		// 			text={"Spam"}
		// 		></SidebarItem>
		// 		<hr className="my-3"></hr>
		// 		<SidebarItem
		// 			icon={<LayoutDashboard size={20}></LayoutDashboard>}
		// 			text={"Settings"}
		// 		></SidebarItem>
		// 		<SidebarItem
		// 			icon={<LayoutDashboard size={20}></LayoutDashboard>}
		// 			text={"Help"}
		// 		></SidebarItem>
		// 	</Sidebar> */}
		// 	<Main>
		// 		<div>content</div>
		// 		<footer>footer</footer>
		// 	</Main>
		// </main>
		<Main>
			<div>content</div>
			<footer>footer</footer>
		</Main>
	);
}

export default App;
