/* eslint-disable react/prop-types */
import { ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
	const [expanded, setExpanded] = useState(true);
	const [activeItem, setActiveItem] = useState(null);

	const handleItemClick = (item) => {
		setActiveItem(item);
	};

	// Add a useEffect to update the 'expanded' state based on window width
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 475) {
				setExpanded(false);
			} else {
				setExpanded(true);
			}
		};

		handleResize(); // Initial check
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<nav className="min-h-full flex-col bg-white border-b border-r shadow-sm">
			<div className="p-4 pb-2 flex justify-between items-center">
				<button
					onClick={() => setExpanded((curr) => !curr)}
					className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
				>
					{expanded ? <ChevronFirst /> : <ChevronLast />}
				</button>
			</div>

			<SidebarContext.Provider
				value={{ expanded, activeItem, handleItemClick }}
			>
				<ul className="flex-1 px-3">{children}</ul>
			</SidebarContext.Provider>
		</nav>
	);
}

export function SidebarItem({ icon, text, alert }) {
	const { expanded, activeItem, handleItemClick } =
		useContext(SidebarContext);

	const isActive = activeItem === text;

	return (
		<li
			className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
			isActive
				? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
				: "hover:bg-indigo-50 text-gray-600"
		}
    `}
			onClick={() => handleItemClick(text)}
		>
			{icon}
			<span
				className={`overflow-hidden transition-all ${
					expanded ? "w-52 ml-3" : "w-0"
				}`}
			>
				{text}
			</span>
			{alert && (
				<div
					className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
						expanded ? "" : "top-2"
					}`}
				/>
			)}

			{!expanded && (
				<div
					className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          opacity-0 translate-x-3 transition-all
          group-hover:opacity-100 group-hover:translate-x-0
      `}
				>
					{text}
				</div>
			)}
		</li>
	);
}
