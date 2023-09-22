import React, { useEffect, useState } from "react";
import routes from "../routes";
import Links from "./Links";
import { HiX } from "react-icons/hi";

const Sidebar = ({ open, onClose }) => {
	const [shouldCloseSidebar, setShouldCloseSidebar] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1200) {
				setShouldCloseSidebar(false);
			} else {
				setShouldCloseSidebar(true);
			}
		};

		// Add an event listener to handle window resize
		window.addEventListener("resize", handleResize);

		// Initial check on component mount
		handleResize();

		// Remove the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleLinkClick = () => {
		if (shouldCloseSidebar && open) {
			onClose();
		}
	};

	return (
		<div
			className={`sm:none duration-500 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
				open ? "translate-x-0" : "-translate-x-96"
			}`}
		>
			<span
				className="absolute top-4 right-4 block cursor-pointer xl:hidden"
				onClick={onClose}
			>
				<HiX />
			</span>

			<div className={`mx-[56px] mt-[50px] flex items-center`}>
				<div className="mt-1 ml-1 h-2.5 text-[26px] font-bold uppercase text-navy-700 dark:text-white">
					OEMail
				</div>
			</div>

			<div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

			<ul className="mb-auto pt-1">
				<Links routes={routes} handleLinkClick={handleLinkClick} />
			</ul>
		</div>
	);
};

export default Sidebar;
