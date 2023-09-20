/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ViewContent = ({ title, children }) => {
	return (
		<div>
			<header className="dark:bg-gray-750 shadow">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-400">
						{title}
					</h1>
				</div>
			</header>
			<div>{children}</div>
		</div>
	);
};

export default ViewContent;
